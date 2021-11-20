import { Injectable } from "@angular/core";
import { HttpService } from "../../../shared/service/http.service";

@Injectable()
export class NewTaskService {

    constructor(private httpService: HttpService) {

    }

    createNewTask(task) {
        let url = 'https://api.com/api/builder/task';

        return new Promise((resolve, reject) => {
            this.httpService.makeHttpPostRequest(url, task).subscribe({
                next: (res: any) => {
                    return resolve(res.body.data);
                },
                error: (res) => {
                    return reject("server error");
                }
            });
        });
    }

    getListOfArchitect(){
        let url = 'https://api.com/api/builder/architects'
        return new Promise((resolve, reject)=>{
            this.httpService.makeHttpGetRequest(url).subscribe({
                next: (res: any)=>{
                    return resolve(res.body.data);
                },
                error: (err)=>{
                    reject(err);
                }
            });
        });
    }

}