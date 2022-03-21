import { Injectable } from "@angular/core";
import { API_URL } from "../../../shared/constant/api";
import { HttpService } from "../../../shared/service/http.service";

@Injectable()
export class EducatorsListService {

    constructor(private httpService: HttpService) {

    }

    getEducatorsList() {
        return new Promise((resolve, reject) => {
            let url = API_URL.EDUCATORS;
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
}