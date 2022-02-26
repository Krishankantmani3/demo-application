import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { VerticalModalComponent } from "./vertical-modal.component";

@NgModule({
    imports: [
        FormsModule,
        CommonModule
    ],
    declarations: [
        VerticalModalComponent
    ],
    exports: [
        VerticalModalComponent
    ]
})
export class VerticalModalModule { }