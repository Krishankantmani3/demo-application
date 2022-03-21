import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NavModule } from "../../../app/nav/nav.module";
import { AdminComponent } from "./admin.component";

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./dash/dash.module').then(m => m.DashModule),
                // canActivate: [AuthGuard]
            },
            {
                path: 'educators',
                pathMatch: 'full',
                loadChildren: () => import('./educatorsList/educatorsList.module').then(m => m.EducatorsListModule)
            },
            {
                path: 'manage-user',
                pathMatch: 'full',
                loadChildren: () => import('./manage-user/manage-user.module').then(m => m.ManageUserModule)
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
export class AdminModule {

}