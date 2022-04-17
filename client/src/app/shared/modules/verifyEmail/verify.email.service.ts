import { HttpService } from "../../service/http.service";
import { API_URL } from "../../constant/api";
import { Injectable } from "@angular/core";
import { AuthService } from "../../service/auth.service";

@Injectable()
export class VerifyEmailService {

    constructor(private httpService: HttpService, private authService: AuthService) {

    }

    sendEmailVerificationToken(){
        return new Promise((resolve, reject)=>{
            let apiUrl = '/api/email-verification-token';
            localStorage.setItem("verifyEmail", "true");
            this.httpService.makeHttpGetRequest(apiUrl).subscribe({
                next: (res)=>{
                    if(res.status == 200){
                        return resolve("succeeded");
                    }
                    else{
                        return reject("failed");
                    }
                },
                error: (err)=>{
                    console.log("err", err);
                    alert("Error occured");
                }
            });
        });
    }

    checkEmailverifiedOrNot(){
        return new Promise((resolve, reject) => {
            return this.httpService.makeHttpGetRequest(API_URL.AUTH).subscribe({
                next: (res)=>{
                    if(res.status == 200)
                        return resolve(res.body);
                },
                error: (err)=>{
                    return reject(false);
                }
            });
        });
    }

}