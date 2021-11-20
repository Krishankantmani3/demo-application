import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UpdateProgressOfTaskService } from "./update_progress_of_task.service";


@Component({
    selector: 'update-task',
    templateUrl: './update_progress_of_task.component.html'
})
export class UpdateProgressOfTaskComponent implements OnInit, OnDestroy {

    taskId;
    subscribedParams: any;
    task;

    constructor(private router: Router, private route: ActivatedRoute, private updateProgressOfTaskService: UpdateProgressOfTaskService){
    }


    ngOnInit(){
        this.loadData();
    }

    loadData(){
        this.subscribedParams = this.route.params.subscribe((params: any) => {
            this.taskId = params['taskId'];
            console.log(this.taskId);
        });

        this.getTask();
    }

    getTask(){
        this.updateProgressOfTaskService.getTask(this.taskId).then((result)=>{
            this.task = result;
            console.log(this.task)
        }).catch((err)=>{
            console.log(err);
        });
    }

    ngOnDestroy(){
        if (this.subscribedParams) {
            this.subscribedParams.unsubscribe();
        }
    }
}

