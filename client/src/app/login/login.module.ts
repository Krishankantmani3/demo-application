import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { HttpService } from "../shared/service/http.service";
import { LoginComponent } from "./login.component";
import { LoginService } from "./login.service";

const routes:Routes = [
    {
    path:'',
    pathMatch: 'full',
    component: LoginComponent
    }
];


@NgModule({
    imports:[
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        LoginService,
        HttpService],
    exports:[LoginComponent],
    declarations:[LoginComponent]
})
export class LoginModule{
}
