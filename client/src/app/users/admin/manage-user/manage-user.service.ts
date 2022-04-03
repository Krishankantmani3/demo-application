import { Injectable } from "@angular/core";
import { API_URL } from "../../../shared/constant/api";
import { HttpService } from "../../../shared/service/http.service";

@Injectable()
export class ManageUserService {

    constructor(private httpService: HttpService) {

    }

    getUserDetail(username: string) {
        return new Promise((resolve, reject) => {
            let url = API_URL.USER + '/' + username;
            this.httpService.makeHttpGetRequest(url).subscribe({
                next: (res) => {
                    console.log("result", res.body, res.status);
                    if (res.status == 204) {
                        resolve(false);
                    }
                    else {
                        resolve(res.body);
                    }
                },
                error: (err) => {
                    console.log("TasksService", "getAllTasks", err);
                    reject(err);
                }
            });
        });
    }

    makeEmailVerified(userId){
        return new Promise((resolve, reject) => {
            let url = API_URL.VERIFY_EMAIL_MANUALLY + '/' + userId;
            this.httpService.makeHttpPatchRequest(url).subscribe({
                next: (res) => {
                    console.log("result", res.body, res.status);
                    if (res.status == 204) {
                        resolve(true);
                    }
                    else {
                        reject(true);
                    }
                },
                error: (err) => {
                    console.log("TasksService", "getAllTasks", err);
                    reject(err);
                }
            });
        });
    }

    activateUserByAdmin(userId){
        return new Promise((resolve, reject) => {
            let url = API_URL.ACTIVATE_USER_MANUALLY + '/' + userId;
            this.httpService.makeHttpPatchRequest(url).subscribe({
                next: (res) => {
                    console.log("result", res.body, res.status);
                    if (res.status == 204) {
                        resolve(true);
                    }
                    else {
                        reject(true);
                    }
                },
                error: (err) => {
                    reject(err);
                }
            });
        });
    }

    deActivateUserByAdmin(userId){
        return new Promise((resolve, reject) => {
            let url = API_URL.DEACTIVATE_USER_MANUALLY + '/' + userId;
            this.httpService.makeHttpPatchRequest(url).subscribe({
                next: (res) => {
                    console.log("result", res.body, res.status);
                    if (res.status == 204) {
                        resolve(true);
                    }
                    else {
                        reject(true);
                    }
                },
                error: (err) => {
                    reject(err);
                }
            });
        });
    }

    mailToUser(data){
        return new Promise((resolve, reject) => {
            let url = API_URL.MAIL_TO_USER;
            this.httpService.makeHttpPostRequest(url, data).subscribe({
                next: (res) => {
                    if (res.status == 204) {
                        resolve(true);
                    }
                    else {
                        reject(true);
                    }
                },
                error: (err) => {
                    reject(err);
                }
            });
        });
    }
}