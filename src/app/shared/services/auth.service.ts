import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { constants } from "src/environments/constants";
import { environment } from "src/environments/environment";
import { DefaultAuthUser, LoginViewModel } from "../models/user";

@Injectable()
export class AuthService{

    //#region Vars
    loggedIn = true;
    // Se creara por defecto un usuario que permita la comunicación con el API
    public user_default : DefaultAuthUser;
    private url : string; 
    //#endregion

    /**
     * Dependency injection
     */
    constructor(private http : HttpClient, private router : Router) {
        this.url = environment.URLWebService + "/api/account/"; 
        this.InitDefaulUser();
        this.activeToken();
    }


    InitDefaulUser(){
        this.user_default = {
            token : "",
            expiration : undefined,
            userName : "",
            rol : "",
            firstName : "",
            lastName : ""
        };
    }

    LogOut(){
        this.loggedIn = false;
        this.InitDefaulUser();
        this.RemoveLocalStorage();
        this.router.navigate(['/expire-token']);
    }

    activeToken(){
        if(undefined != localStorage.getItem(constants.token) ){
            this.user_default.expiration = new Date(JSON.parse(localStorage.getItem(constants.expiration)));
            if(this.user_default.expiration < new Date()){
                this.LogOut();
            }
            this.user_default.token = localStorage.getItem(constants.token);
            this.user_default.rol = localStorage.getItem(constants.rol);
            this.user_default.firstName =localStorage.getItem(constants.firstname);
            this.user_default.lastName = localStorage.getItem(constants.lastname); 
            this.user_default.userName = localStorage.getItem(constants.username); 
            this.loggedIn = true; 
        }
    }

    //#region LocalStorage
    RemoveLocalStorage(){
        localStorage.removeItem(constants.token);   
        localStorage.removeItem(constants.username);
        localStorage.removeItem(constants.firstname);
        localStorage.removeItem(constants.lastname);
        localStorage.removeItem(constants.expiration);
        localStorage.removeItem(constants.rol);        
    }

    SetLocalStorage(user : DefaultAuthUser){
        localStorage.setItem(constants.token, user.token);   
        localStorage.setItem(constants.username, user.userName);
        localStorage.setItem(constants.firstname, user.firstName);
        localStorage.setItem(constants.lastname, user.lastName);
        localStorage.setItem(constants.expiration, JSON.stringify(user.expiration));
        localStorage.setItem(constants.rol, user.rol);        
    }

    

    //#endregion

    get isLoggedIn() {
      if(localStorage.getItem(constants.token) == undefined || localStorage.getItem(constants.token) == "" || new Date(JSON.parse(localStorage.getItem(constants.expiration))) < new Date())
        {
            if(this.loggedIn == true)
                this.LogOut();
            this.loggedIn = false;   
        }
      
    return this.loggedIn;
  }

  //#region  POST's
  public LogIn(model : LoginViewModel): Observable<DefaultAuthUser>{
    return this.http.post(this.url + "CreateToken",model,{
        headers : new HttpHeaders().set('Content-Type','application/json') 
    })
    .pipe(map((response : DefaultAuthUser) => {
        if(response != null){
            this.SetLocalStorage(response);
            this.activeToken();
            this.loggedIn = true;
            this.router.navigate(['/']);
        }
        return response;
    }));
}
  //#endregion
}

@Injectable()
export class AuthGuardService implements CanActivate{
    constructor(private router: Router, private authService: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {

        const isLoggedIn = this.authService.isLoggedIn;
        const routesWithOutAuth = (
            route.routeConfig.path === 'expire-token' 
            //n routes without authentication, example login
        );

        if (isLoggedIn && routesWithOutAuth) {
            this.router.navigate(['/home']);
            return false;
        }

        if (!isLoggedIn && !routesWithOutAuth){
            this.router.navigate(['/expire-token']);
        }

        return isLoggedIn || routesWithOutAuth;
    }
}