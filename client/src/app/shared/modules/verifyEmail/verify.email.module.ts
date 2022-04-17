import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { verifyEmailComponent } from "./verify.email.component";
import { VerifyEmailService } from "./verify.email.service";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: verifyEmailComponent
    }
];

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        verifyEmailComponent
    ],
    exports: [
        verifyEmailComponent
    ],
    providers: [VerifyEmailService]
})
export class VerticalModalModule { }
