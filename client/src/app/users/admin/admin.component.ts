import { Component } from "@angular/core";
import { AppState } from "src/app/app.service";


@Component({
    selector:"admin",
    templateUrl:'./admin.component.html'
})
export class AdminComponent{
   constructor(private appState: AppState){

   }
}