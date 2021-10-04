import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ArchitectComponent } from "./architect.component";

const routes: Routes = [
    {
        path:'',
         pathMatch: 'full',
        component: ArchitectComponent
    }
]

@NgModule({
    declarations: [ArchitectComponent],
    exports: [ArchitectComponent],
    imports: [RouterModule.forChild(routes)]
})
export class ArchitectModule{}