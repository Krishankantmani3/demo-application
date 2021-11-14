import { Component, OnInit } from "@angular/core";
import { TASK_PROGRESS } from "../../../shared/constant/constant";
import { TasksService } from "./tasks.service";

@Component({
    selector: 'task',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

    architectTasks = [];
    isLoaded = false;
    TASK_PROGRESS = TASK_PROGRESS;

    constructor(private tasksService: TasksService) {
    }

    ngOnInit() {
        this.fetchAllTasks();
    }

    fetchAllTasks() {
        this.isLoaded = true;
        this.tasksService.getAllTasksAssignedToArchitect()
            .then((tasks: []) => {
                this.architectTasks = tasks;
                this.isLoaded = true;
            })
            .catch((err) => {
                alert("Error in server side");
                this.isLoaded = true;
            });
    }

}