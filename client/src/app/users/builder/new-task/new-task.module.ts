import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../../shared/guards/auth-guard.service";
import { NewTaskComponent } from "./new-task.component";
import { NewTaskService } from "./new-task.service";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: NewTaskComponent,
        // canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ],
    providers: [NewTaskService],
    declarations: [NewTaskComponent]
})
export class NewTaskModule{

}