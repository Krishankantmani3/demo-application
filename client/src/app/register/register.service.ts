// declare var require: any;
import { Injectable } from "@angular/core";
import { HttpService } from "../shared/service/http.service";
import { API_URL } from '../shared/constant/api';
// let config = require('../../config/config.json');



@Injectable()
export class RegisterService{

    constructor(private httpService: HttpService){

    }

    public testReq(url?){
        // url = config.SERVER_URL["ENV"].URL + "/api/test";
        url = "http://172.18.0.3:9000" + API_URL.test;
        this.httpService.makeHttpGetRequest(url).subscribe((res)=>{
            console.log(res);
        });
    }

    public register(data){
        let url = "http://172.18.0.3:9000" + API_URL.register;

        this.httpService.makeHttpPostRequest(url, data).subscribe((res)=>{
            console.log(res);          
        });
    }
    
}