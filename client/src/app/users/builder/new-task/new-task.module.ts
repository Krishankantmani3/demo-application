import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../../shared/guards/auth-guard.service";
import { NewTaskComponent } from "./new-task.component";

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
        RouterModule.forChild(routes)
    ],
    providers: [],
    declarations: [NewTaskComponent]
})
export class NewTaskModule{

}