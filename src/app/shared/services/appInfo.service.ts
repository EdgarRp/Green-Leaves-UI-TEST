import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable()
export class AppInfoService{

    /**
     *Dependency Injection
     */
    constructor(private http: HttpClient) { }

    public get title(){
        return 'GreenLeaves'
    }

    public ApiVersion(): Observable<string>{
        return this.http.get(environment.URLWebService + "/api/AppInfo/getVersion",{
            responseType : 'text',
            headers : new HttpHeaders().set('Content-Type','text/plain; charset=utf-8')
        }).pipe(map((response : string) => {
            return response
        }))
    }

    public get UIVersion(){
        return environment.version;
    }
}