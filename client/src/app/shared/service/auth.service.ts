import { HttpService } from "./http.service";
import { API_URL } from "../constant/api";
import { AppState } from "../../app.service";
import { Injectable } from "@angular/core";
import { filter } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class AuthService {

    redirectUrl: String;

    constructor(private httpService: HttpService, private appState: AppState) {
    }

    authenticate() {
        return this.httpService.makeHttpGetRequest("https://api.com" + API_URL.auth).pipe(filter(res => res.status == 200));
    }

}