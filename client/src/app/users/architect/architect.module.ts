import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NavModule } from "../../nav/nav.module";
import { ArchitectComponent } from "./architect.component";
import { TempComponent } from "./temp/temp.component";

const routes: Routes = [
    {
        path: '', component: ArchitectComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./dash/dash.module').then(m => m.DashModule)
            },
            { path: '', redirectTo: 'dashboard' },
            {
                path: 'sales', component: TempComponent
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