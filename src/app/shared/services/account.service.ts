import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { City } from "../models/city";
import { DefaultAuthUser, LoginViewModel, User } from "../models/user";
import { AuthService } from "./auth.service";

@Injectable()
export class AccountService {
    //#region vars
    private url : string; 
    //#endregion

    /**
     *
     */
    constructor(private http : HttpClient, private auth : AuthService, private router : Router) {
        this.url = environment.URLWebService + "/api/account/";  
    }

    //#region POST's
    public SendMail (model : User) : Observable<boolean> {
        return this.http.post(this.url + "Send",model,{
            responseType : 'json',
            headers : new HttpHeaders().set("Authorization", "Bearer " + this.auth.user_default.token)
        }).pipe(map((response : boolean) => {
            return response;
        }))
    }
    //#endregion

    //#region  GET's
    public GetCities():Observable<Array<City>>{
        return this.http.get(this.url + "GetCities",{
            responseType : 'json',
            headers : new HttpHeaders().set("Authorization", "Bearer " + this.auth.user_default.token)
        }).pipe(map((response: Array<City>) => {
            return response;
        }))
    }
    //#endregion
}