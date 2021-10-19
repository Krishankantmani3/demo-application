import { Routes } from "@angular/router";
import { USER_ROLE } from "./app/shared/constant/user.role";
import { AuthGuard } from "./app/shared/guards/auth-guard.service";

 export const routes: Routes = [
    {
        path: 'admin',
        loadChildren: () => import('./app/users/admin/admin.module').then(m => m.AdminModule),
        canActivate: [AuthGuard],
        data: {
            roles: [USER_ROLE.ADMIN]
        }
    },
    {
        path: 'builder',
        loadChildren: () => import('./app/users/builder/builder.module').then(m => m.BuilderModule),
        canActivate: [AuthGuard],
        data: {
            role: [USER_ROLE.BUILDER]
        }
    },
    {
        path: 'architect',
        loadChildren: ()=> import('./app/users/architect/architect.module').then(m => m.ArchitectModule),
        canActivate: [AuthGuard],
        data: {
            role: [USER_ROLE.ARCHITECT]
        }
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


