import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { API_URL } from "../constant/api";
import { HttpService } from "./http.service";




@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private httpService: HttpService){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        let url: string = state.url;
        return this.isUserAuthenticated(route, url);
    }

    isUserAuthenticated(route: ActivatedRouteSnapshot, url: string): boolean | Observable<boolean> {
        let api_url = 'http://172.18.0.3:9000' + API_URL.auth + '/3';
        try{
            console.log("start");
            
            this.httpService.makeHttpGetRequest(api_url).subscribe((res: any)=>{
                console.log(res.body);
                
                if(res.body.authorized === true){
                    return true; 
                }
                else{
                    return false; 
                }
            });
        }
        catch(err){
            console.log(err);
            
            return false; 
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.canActivate(route, state);
    }
}