import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UpdateProgressOfTaskComponent } from "./update_progress_of_task.component";
import { UpdateProgressOfTaskService } from "./update_progress_of_task.service";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: UpdateProgressOfTaskComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [UpdateProgressOfTaskComponent],
    providers: [UpdateProgressOfTaskService]
})
export class UpdateProgressOfTaskModule{

}