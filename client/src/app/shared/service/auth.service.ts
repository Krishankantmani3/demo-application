import { HttpService } from "./http.service";
import { API_URL } from "../constant/api";
import { AppState } from "../../app.service";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthService{
    
    redirectUrl: String;
    
    constructor(private httpService: HttpService, private appState: AppState){
    }
    
    authenticate(){
        return this.httpService.makeHttpGetRequest( "https://api.com"+API_URL.auth);
    }

}