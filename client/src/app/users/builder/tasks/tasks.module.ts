import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TasksComponent } from "./tasks.component";
import { TasksService } from "./tasks.service";

const routes: Routes = [
    { path: '', component: TasksComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule
    ],
    declarations: [
        TasksComponent
    ],
    providers: [
        TasksService
    ]
})
export class TasksModule {

}
