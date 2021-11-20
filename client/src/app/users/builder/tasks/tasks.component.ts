import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TASK_PROGRESS_MAP } from "../../../shared/constant/constant";
import { BuilderService } from "../builder.service";
import { TasksService } from "./tasks.service";

@Component({
    selector: 'task',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

    builderTasks = [];
    isLoaded = false;
    TASK_PROGRESS = TASK_PROGRESS_MAP;

    constructor(private tasksService: TasksService, private router: Router, private builderService: BuilderService) {

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

    updateAssignee(index, username){
        let taskId = this.builderTasks[index]._id;
        let userId = this.builderService.architectList.find( architect => architect.username == username )._id;

        if (userId != this.builderTasks[index].assignedTo) {
            this.tasksService.updateAssignee(taskId, userId).then((res) => {
                this.builderTasks[index].assignedTo = userId;
                this.builderTasks[index].progress = 1;
            })
            .catch((err) => {
                console.log(err);
            });
        }


    }

    // pushNewTask(task){
    //     this.architectTasks.push(task);
    // }


}