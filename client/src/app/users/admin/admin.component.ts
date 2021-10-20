import { Component } from "@angular/core";
import { AppState } from "../../app.service";

@Component({
    selector:"admin",
    templateUrl:'./admin.component.html'
})
export class AdminComponent{
   constructor(private appState: AppState){
    console.log("admin route", appState.value++);
    // console.log("appState", appState.get('userData'));
   }
}