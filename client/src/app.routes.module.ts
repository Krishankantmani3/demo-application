import { Routes } from "@angular/router";
import { AuthGuard } from "./app/shared/service/auth-guard.service";

 export const routes: Routes = [
    {
        path: 'admin',
        loadChildren: () => import('./app/users/admin/admin.module').then(m => m.AdminModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'builder',
        loadChildren: () => import('./app/users/builder/builder.module').then(m => m.BuilderModule)
    },
    {
        path: 'architect',
        loadChildren: ()=> import('./app/users/architect/architect.module').then(m => m.ArchitectModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'register',
        loadChildren: ()=> import('./app/register/register.module').then(m => m.RegisterModule)
    },
    {
        path: 'login',
        loadChildren: ()=> import('./app/login/login.module').then(m => m.LoginModule)
    }
];


