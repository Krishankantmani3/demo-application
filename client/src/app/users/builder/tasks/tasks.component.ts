import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TasksService } from "./tasks.service";

@Component({
    selector: 'task',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

    builderTasks = [];
    isLoaded = false;

    constructor(private tasksService: TasksService, private router: Router) {

    }

    ngOnInit() {
        this.fetchAllTasks();
    }

    fetchAllTasks() {
        this.isLoaded = true;
        this.tasksService.getAllTasksCreatedByBuilder()
            .then((tasks: []) => {
                console.log("tasks",tasks);
                this.builderTasks = tasks;
                this.isLoaded = true;
            })
            .catch((err) => {
                alert("Error in server side");
                this.isLoaded = true;
            });
    }

    // pushNewTask(task){
    //     this.architectTasks.push(task);
    // }


}