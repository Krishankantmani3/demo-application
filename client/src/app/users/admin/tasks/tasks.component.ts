import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { TASK_PROGRESS_MAP, TASK_PROGRESS_MAP_REV } from "../../../shared/constant/constant";
import { TasksService } from "./tasks.service";

@Component({
    selector: 'task',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

    allTasks = [];
    isLoaded = false;
    TASK_PROGRESS = TASK_PROGRESS_MAP;
    taskFormArr;

    constructor(private tasksService: TasksService, private router: Router) {
        this.createFormArray();
    }

    createFormArray(){
        this.taskFormArr = new FormArray([]);
        this.allTasks.forEach((val, i)=>{
            this.taskFormArr.push(new FormControl(''));
        });

        this.taskFormArr.valueChanges.subscribe((data)=>{
        });
    }

    ngOnInit() {
        this.fetchAllTasks();
    }

    fetchAllTasks() {
        this.tasksService.getAllTasks()
            .then((tasks: []) => {
                this.allTasks = tasks;
                this.isLoaded = true;
            })
            .catch((err) => {
                alert("Error in server side");
                this.isLoaded = true;
            });
    }
}