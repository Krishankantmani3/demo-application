import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { AppState } from "src/app/app.service";
const routes: Routes = [
    {
        path:'',
        pathMatch: 'full',
        component: AdminComponent
    }
]



@NgModule({
    declarations: [
        AdminComponent
    ],
    exports: [AdminComponent],
    imports: [RouterModule.forChild(routes)],
    providers: [AppState]
}
)
export class AdminModule{

}