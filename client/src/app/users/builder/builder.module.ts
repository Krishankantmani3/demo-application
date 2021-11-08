import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NavModule } from "../../nav/nav.module";
import { BuilderComponent } from "./builder.component";
import { TempComponent } from "./temp/temp.component";

const routes: Routes = [
    {
        path:'',
        // pathMatch: 'full',
        component: BuilderComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./dash/dash.module').then(m => m.DashModule),
                // canActivate: [AuthGuard]
            },
            { path: '', redirectTo: 'dashboard' },
            {
                path: 'sales', component: TempComponent
            },
            {
                path: 'tasks',
                loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule),
                // canActivate: [AuthGuard]
            },
            {
                path: 'new-task',
                loadChildren: () => import('./new-task/new-task.module').then(m => m.NewTaskModule)
            }
        ]
    }
]


@NgModule({
    declarations: [BuilderComponent],
    exports: [BuilderComponent],
    imports:[
        RouterModule.forChild(routes),
        NavModule
    ]
})
export class BuilderModule{

}