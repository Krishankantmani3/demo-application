import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { HttpService } from "../shared/service/http.service";
import { RegisterComponent } from "./register.component";
import { RegisterService } from "./register.service";
import { MatProgressBarModule } from '@angular/material/progress-bar';

const routes:Routes = [
    {
    path:'',
    pathMatch: 'full',
    component: RegisterComponent
    }
];


@NgModule({
    imports:[
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatProgressBarModule
    ],
    providers: [
        RegisterService,
        HttpService],
    exports:[RegisterComponent],
    declarations:[RegisterComponent]
})
export class RegisterModule{

}
