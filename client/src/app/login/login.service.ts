// declare var require: any;
import { Injectable } from "@angular/core";
import { HttpService } from "../shared/service/http.service";
import { API_URL } from '../shared/constant/api';
import { Router } from "@angular/router";
// let config = require('../../config/config.json');



@Injectable()
export class LoginService{

    constructor(private httpService: HttpService, private router: Router){
    }

    public testReq(url?){
        // url = config.SERVER_URL["ENV"].URL + "/api/test";
        url = "http://172.18.0.3:9000" + API_URL.test;
        this.httpService.makeHttpGetRequest(url).subscribe((res)=>{
            console.log(res);
        });
    }

    public login(data){
        let url = "http://172.18.0.3:9000" + API_URL.login;

        this.httpService.makeHttpPostRequest(url, data).subscribe((res: any)=>{
            console.log(res.body);
            
            if(res.body.status == "loggedIn"){
                console.log("Yes");
                
                this.router.navigateByUrl('/architect');
            }          
        });
    }
    
}