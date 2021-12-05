import { Injectable } from "@angular/core";
import { API_URL } from "../../../shared/constant/api";
import { HttpService } from "../../../shared/service/http.service";

@Injectable()
export class NewTaskService {

    constructor(private httpService: HttpService) { }

    createNewTask(task) {
        let url = API_URL.BUILDER_TASK;

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
}