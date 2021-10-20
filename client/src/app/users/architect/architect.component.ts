import { Component } from "@angular/core";
import { AppState } from "../../app.service";

@Component({
    selector:'architect',
    templateUrl: './architect.component.html'
})
export class ArchitectComponent{

    constructor(private appState: AppState){
        console.log("admin route", appState.value++);
    }

}