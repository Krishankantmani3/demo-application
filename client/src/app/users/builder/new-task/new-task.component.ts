import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BuilderService } from "../builder.service";
import { NewTaskService } from "./new-task.service";

@Component({
    selector: 'new-task',
    templateUrl: './new-task.component.html'
})
export class NewTaskComponent {
    taskForm: any;
    isFormDirty: boolean;
    isSubmitted: boolean;
    isSubmitting = false;
    newTask: { title: any; description: any; assignedTo: any; status: String, progress: String };

    constructor(private newTaskService: NewTaskService, private router: Router, public builderService: BuilderService) {
        this.createFormGroup();
        // let task = {
        //     title: ,
        //     description: {type: String, required: true},
        //     status: {type: String}, // assigned or unassigned
        //     progress: {type: String}, // pending, working, completed
        //     createdBy: {type: Schema.Types.ObjectId, required: true, ref: 'Users'},
        //     assignedTo: {type: Schema.Types.ObjectId, ref: 'Users'}
        // }
    }

    createFormGroup() {
        this.taskForm = new FormGroup({
            title: new FormControl('', Validators.required),
            description: new FormControl(''),
            assignedTo: new FormControl('none')
        });

        this.taskForm.valueChanges.subscribe(data => {
            if (this.taskForm.dirty) {
                this.isFormDirty = true;
            }
        });
    }

    addNewTask() {
        this.isSubmitted = true;
        this.isSubmitting = true;

        if (this.taskForm.valid) {
            this.newTask = {
                title: this.taskForm.value.title,
                description: this.taskForm.value.description,
                assignedTo: this.taskForm.value.assignedTo,
                status: this.taskForm.value.assignedTo == 'none' ? "assigned" : "unassigned",
                progress: "pending"
            };

            console.log("new Task", this.newTask);

            this.newTaskService.createNewTask(this.newTask).then((result: any)=>{
                console.log(result);
                this.isSubmitting = false;
                this.router.navigate(['/builder/tasks']);
            });
        }
    }
}


