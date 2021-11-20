import { Injectable } from "@angular/core";
import { HttpService } from "../../../shared/service/http.service";

@Injectable()
export class UpdateProgressOfTaskService{
    
    constructor(private httpService: HttpService){

    }

    getTask(taskId){
        let url = `https://api.com/api/architect/task/${taskId}`;

        return new Promise((resolve, reject)=>{
            this.httpService.makeHttpGetRequest(url).subscribe({
                next: (res)=>{
                    return resolve(res.body);
                },
                error: (err)=>{
                    return reject(err);
                }
            });
        });
    }

}