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
        url = API_URL.TEST;
        this.httpService.makeHttpGetRequest(url).subscribe((res)=>{
            console.log(res);
        });
    }

    public register(data){
        return new Promise((resolve, reject)=>{
            let url = API_URL.REGISTER;
            this.httpService.makeHttpPostRequest(url, data).subscribe((res)=>{
                if(res.status == 200){
                    return resolve(res);
                }
                          
                return reject(res);
            });
        });
    }
    
}