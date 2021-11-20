import { Injectable } from "@angular/core";
import { API_URL } from "../../../shared/constant/api";
import { HttpService } from "../../../shared/service/http.service";


@Injectable()
export class TasksService {

    constructor(private httpService: HttpService) {

    }

    getAllTasksAssignedToArchitect() {
        return new Promise((resolve, reject) => {
            let url = 'https:/api.com' + API_URL.architect_tasks;
            this.httpService.makeHttpGetRequest(url).subscribe({
                next: (res) => {
                    console.log("result", res.body, res.status);
                    if (res.status == 204) {
                        resolve([]);
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

    updateTask(taskId, progress){
        let url = `https://api.com/api/architect/task/progress/${taskId}/${progress}`;
        return new Promise((resolve, reject)=>{
            this.httpService.makeHttpPutRequest(url).subscribe({
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