import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormModalComponent } from "./form-modal.component";
import { VerticalModalComponent } from "./vertical-modal.component";

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        VerticalModalComponent,
        FormModalComponent
    ],
    exports: [
        VerticalModalComponent,
        FormModalComponent
    ]
})
export class VerticalModalModule { }