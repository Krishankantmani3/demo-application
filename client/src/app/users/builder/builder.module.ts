import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BuilderComponent } from "./builder.component";

const routes: Routes = [
    {
        path:'',
         pathMatch: 'full',
        component: BuilderComponent
    }
]


@NgModule({
    declarations: [BuilderComponent],
    exports: [BuilderComponent],
    imports:[RouterModule.forChild(routes)]
})
export class BuilderModule{

}