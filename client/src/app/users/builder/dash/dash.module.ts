import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatMenuModule } from "@angular/material/menu";
import { RouterModule, Routes } from "@angular/router";
import { DashComponent } from "./dash.component";
import { ChartsModule } from 'ng2-charts';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

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
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatGridListModule,
        MatMenuModule,
        ChartsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule
    ]
})
export class DashModule { }