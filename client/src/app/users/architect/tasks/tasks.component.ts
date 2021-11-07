import { Component, OnInit } from "@angular/core";
import { TasksService } from "./tasks.service";

@Component({
    selector: 'task',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

    architectTasks = [];
    isLoaded = false;

    constructor(private tasksService: TasksService) {

    }

    ngOnInit() {
        this.fetchAllTasks();
    }

    fetchAllTasks() {
        this.isLoaded = true;
        // this.architectTasks = [{
        //     title: "256 building construction",
        //     description: "NA",
        //     status: "assigned", // assigned or unassigned
        //     progress: "pending", // pending, working, completed
        //     createdBy: "Falana dhimaka",
        //     assignedBy: "Vivek malhotra",
        //     assignedTo: "ab kumar"
        // }];
        this.tasksService.getAllTasks()
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