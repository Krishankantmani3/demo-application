import { Injectable } from "@angular/core";
import { API_URL } from "../../../shared/constant/api";
import { HttpService } from "../../../shared/service/http.service";


@Injectable()
export class TasksService {

    architectList = [];
    constructor(private httpService: HttpService) {
        this.getListOfArchitect();
    }

    getAllTasksCreatedByBuilder() {
        return new Promise((resolve, reject) => {
            let url = 'https:/api.com' + API_URL.builder_tasks;
            this.httpService.makeHttpGetRequest(url).subscribe({
                next: (res) => {
                    console.log("result", res.body);
                    if (res.status == 204) {
                        return resolve([]);
                    }
                    else {
                        return resolve(res.body);
                    }
                },
                error: (err) => {
                    console.log("TasksService", "getAllTasks", err);
                    return reject(err);
                }
            });
        });
    }

    getListOfArchitect(){
        let url = 'https://api.com/api/builder/architects'
        this.httpService.makeHttpGetRequest(url).subscribe({
            next: (res: any)=>{
                this.architectList = res.body.data; 
            },
            error: (err)=>{
                console.log("server error");
            }
        });
    }

    updateAssignee(taskId, assignee){
        let url = `https://api.com/api/builder/task/assignee/${taskId}/${assignee}`;
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