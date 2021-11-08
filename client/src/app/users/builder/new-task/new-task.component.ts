import { Component } from "@angular/core";

@Component({
    selector: 'new-task',
    templateUrl: './new-task.component.html'
})
export class NewTaskComponent{

    constructor(){
        console.log("new Task works");
    }
}