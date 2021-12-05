// declare var require: any;
import { Injectable } from "@angular/core";
import { HttpService } from "../shared/service/http.service";
import { API_URL } from '../shared/constant/api';
import { Router } from "@angular/router";
// let config = require('../../config/config.json');

@Injectable()
export class LoginService {

    constructor(private httpService: HttpService, private router: Router) {
    }

    public testReq(url?) {
        url = API_URL.TEST;
        this.httpService.makeHttpGetRequest(url).subscribe({
            next: (res) => {
                console.log("res", res.body);
            }, error: (err) => {
                console.log("err", err);
            }
        });
    }

    login(user) {
        return new Promise((resolve, reject) => {
            let url = API_URL.LOGIN;
            return this.httpService.makeHttpPostRequest(url, user).subscribe((res)=>{
                if(res.status == 200){
                    return  resolve(res);
                }

                return reject({error: "something went wrong"});
            });
        });
    }
}