import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../shared/guards/auth-guard.service";
import { NavModule } from "../../nav/nav.module";
import { ArchitectComponent } from "./architect.component";
import { TempComponent } from "./temp/temp.component";

const routes: Routes = [
    {
        path: '', component: ArchitectComponent,
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
                path: 'task/update/:taskId',
                loadChildren: () => import('./update_progress_of_task/update_progress_of_task.module').then( m => m.UpdateProgressOfTaskModule)
            }
        ]
    }
]

@NgModule({
    declarations: [
        ArchitectComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NavModule
    ]
})
export class ArchitectModule { }