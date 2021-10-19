import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY,  Observable, throwError } from 'rxjs';


@Injectable()
export class HttpService{

    requestOptionJson = {
        headers: new HttpHeaders(),
        body:'',
        responseType: 'json' as 'json',
        observe:'response' as 'response',
        withCredentials: true
    };

    constructor(private http: HttpClient){

    }

   public makeHttpGetRequest(url, options?){
        return this.intercept(this.http.get(url, this.requestOptionJson));
    }

    public makeHttpPostRequest(url, body, options?){
        return this.http.post(url, body, this.requestOptionJson);
        // return this.intercept(this.http.post(url, body, this.requestOptionJson));
    }

    private intercept(observable: Observable<HttpResponse<any>>) {
        
        return observable.pipe(catchError((err, source) => {
            if (err.status === 401 ) {
                this.logOutUser().then((res) => {
                    //user logged out from system.
                })
                .catch((err) => {
                    console.error(err);
                });
                return EMPTY;
            } else {
                return throwError(()=> new Error(err));
            }
        }));
    }

    logOutUser(){
        return new Promise((resolve, reject)=>{

        });
    }

}