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

    architectTasks = [];
    isLoaded = false;
    TASK_PROGRESS = TASK_PROGRESS_MAP;
    taskFormArr;

    constructor(private tasksService: TasksService, private router: Router) {
        this.createFormArray();
    }

    createFormArray(){
        this.taskFormArr = new FormArray([]);
        this.architectTasks.forEach((val, i)=>{
            this.taskFormArr.push(new FormControl(''));
        });

        this.taskFormArr.valueChanges.subscribe((data)=>{
        });
    }

    ngOnInit() {
        this.fetchAllTasks();
    }

    routeToUpdateTask(taskId){
        this.router.navigate([`/architect/task/update/${taskId}`]);
    }

    fetchAllTasks() {
        this.tasksService.getAllTasksAssignedToArchitect()
            .then((tasks: []) => {
                this.architectTasks = tasks;
                // this.isLoaded = true;
                setTimeout(()=> {
                    this.isLoaded = true;
                },6000);
            })
            .catch((err) => {
                alert("Error in server side");
                this.isLoaded = true;
            });
    }

    updateProgress(index, progress) {
        let taskProgress = TASK_PROGRESS_MAP_REV.get(progress);
        let taskId = this.architectTasks[index]._id;
        if (progress != this.architectTasks[index].progress) {
            this.tasksService.updateProgressOfTask(taskId, taskProgress).then((res) => {
                this.architectTasks[index].progress = taskProgress;
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }

}