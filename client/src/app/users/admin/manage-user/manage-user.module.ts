import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ManageUserComponent } from "./manage-user.component";
import { ManageUserService } from "./manage-user.service";
import { FormsModule } from "@angular/forms";
import { VerticalModalModule } from "../../../shared/modules/modals/vertical-modal.module";

const routes: Routes = [
    { path: '', component: ManageUserComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        MatProgressBarModule,
        FormsModule,
        VerticalModalModule
    ],
    declarations: [
        ManageUserComponent
    ],
    providers: [
        ManageUserService
    ]
})
export class ManageUserModule {

}
