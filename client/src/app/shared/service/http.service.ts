import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class HttpService{

    requestOptionJson = {
        headers: new HttpHeaders(),
        body:'',
        responseType: 'json' as 'json',
        observe:'response' as 'response',
        withCredentials: true,
    };

    constructor(private http: HttpClient){

    }

   public makeHttpGetRequest(url, options?){
        return this.http.get(url, this.requestOptionJson);
    }

    public makeHttpPostRequest(url, body, options?){
        
        return this.http.post(url, body, this.requestOptionJson);
    }



}