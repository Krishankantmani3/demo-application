import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule } from "@angular/router";
import { NavComponent } from "./nav.component";


@NgModule({
    declarations: [
        NavComponent
    ],
    exports: [NavComponent],
    imports: [
        CommonModule,
        MatSidenavModule,
        RouterModule,
        MatToolbarModule,
        MatListModule
    ]
})
export class NavModule { }