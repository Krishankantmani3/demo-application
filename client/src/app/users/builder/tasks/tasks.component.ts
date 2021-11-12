import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TasksService } from "./tasks.service";

@Component({
    selector: 'task',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

    architectTasks = [];
    isLoaded = false;

    constructor(private tasksService: TasksService, private router: Router) {

    }

    ngOnInit() {
        this.fetchAllTasks();
    }

    fetchAllTasks() {
        this.isLoaded = true;
        this.architectTasks = [{
            title: "256 building construction",
            description: "NA",
            status: "assigned", // assigned or unassigned
            progress: "pending", // pending, working, completed
            createdBy: "Falana dhimaka",
            assignedBy: "Vivek malhotra",
            assignedTo: "ab kumar"
        },{
            title: " construction",
            description: "NA",
            status: "assigned", // assigned or unassigned
            progress: "working", // pending, working, completed
            createdBy: "hmmmmmm",
            assignedBy: "krishankant",
            assignedTo: "me"
        },
        {
            title: " construction",
            description: "NA",
            status: "assigned", // assigned or unassigned
            progress: "completed", // pending, working, completed
            createdBy: "hmmmmmm",
            assignedBy: "krishankant",
            assignedTo: "me"
        }];
        // this.tasksService.getAllTasks()
        //     .then((tasks: []) => {
        //         this.architectTasks = tasks;
        //         this.isLoaded = true;
        //     })
        //     .catch((err) => {
        //         alert("Error in server side");
        //         this.isLoaded = true;
        //     });
    }

    // pushNewTask(task){
    //     this.architectTasks.push(task);
    // }


}