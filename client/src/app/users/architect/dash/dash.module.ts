import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatGridListModule } from "@angular/material/grid-list";
import { RouterModule, Routes } from "@angular/router";
import { DashComponent } from "./dash.component";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: DashComponent
    }
]

@NgModule({
    declarations: [
        DashComponent
    ],
    exports: [RouterModule],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatGridListModule,


    ]
})
export class DashModule { }