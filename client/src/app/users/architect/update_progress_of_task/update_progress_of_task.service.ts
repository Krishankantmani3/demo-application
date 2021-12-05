import { Injectable } from "@angular/core";
import { API_URL } from "../../../shared/constant/api";
import { HttpService } from "../../../shared/service/http.service";

@Injectable()
export class UpdateProgressOfTaskService{
    
    constructor(private httpService: HttpService){ }

    getTask(taskId){
        let url = `${API_URL.ARCHITECT_TASK}/${taskId}`;

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