import { Injectable } from "@angular/core";
import { API_URL } from "../../shared/constant/api";
import { HttpService } from "../../shared/service/http.service";


@Injectable()
export class BuilderService{
    architectList = [];

    constructor(private httpService: HttpService){
        this.getListOfArchitect();
    }

    getListOfArchitect(){
        let url = API_URL.ARCHITECTS;
        this.httpService.makeHttpGetRequest(url).subscribe({
            next: (res: any)=>{
                this.architectList = res.body.data; 
            },
            error: (err)=>{
                console.log("server error");
            }
        });
    }
}