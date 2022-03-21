import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { EducatorsListComponent } from "./educatorsList.component";
import { EducatorsListService } from "./educatorsList.service";

const routes: Routes = [
    { path: '', component: EducatorsListComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        MatProgressBarModule
    ],
    declarations: [
        EducatorsListComponent
    ],
    providers: [
        EducatorsListService
    ]
})
export class EducatorsListModule {

}
