import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NavModule } from "../../../app/nav/nav.module";
import { AdminComponent } from "./admin.component";

const routes: Routes = [
    {
        path:'',
        component: AdminComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./dash/dash.module').then(m => m.DashModule),
                // canActivate: [AuthGuard]
            },
            {
                path: 'tasks',
                pathMatch: 'full',
                loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule)
            }
        ]
    }
]



@NgModule({
    declarations: [
        AdminComponent
    ],
    exports: [AdminComponent],
    imports: [
        RouterModule.forChild(routes),
        NavModule
    ]
})
export class AdminModule{

}