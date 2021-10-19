import { HttpService } from "./http.service";
import { API_URL } from "../constant/api";
import { AppState } from "src/app/app.service";


export class AuthService{
    
    redirectUrl: String;
    
    constructor(private httpService: HttpService, private appState: AppState){

    }
        

    authenticate(){
        return this.httpService.makeHttpGetRequest( API_URL.auth);
    }

}