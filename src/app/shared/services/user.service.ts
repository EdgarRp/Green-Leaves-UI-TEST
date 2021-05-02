import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from "../models/user";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { constants } from "src/environments/constants";
import { AuthService } from "./auth.service";
import { map } from 'rxjs/operators';

@Injectable()
export class UserService{

    //#region vars
    private url : string; 
    //#endregion

    /**
     * Dependency injection
     */
    constructor(private http : HttpClient, private auth : AuthService) {
        this.url = environment.URLWebService + "/api/user";
    }

    //#region POST's
    public SendMail (model: User): Observable<boolean>{
        return this.http.post(this.url + constants.sendmail, model, {
            responseType : 'json',
            headers : new HttpHeaders().set("Authorization", "Bearer " + this.auth.user_default.token)
        }).pipe(map((response : boolean) => {
            return response;
        }))
    }
    //#endregion
}