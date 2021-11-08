import { Injectable } from "@angular/core";
import { API_URL } from "../../../shared/constant/api";
import { HttpService } from "../../../shared/service/http.service";


@Injectable()
export class TasksService {

    constructor(private httpService: HttpService) {

    }

    getAllTasks() {
        return new Promise((resolve, reject) => {
            let url = 'https:/api.com' + API_URL.builder_tasks;
            this.httpService.makeHttpGetRequest(url).subscribe({
                next: (res) => {
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

}