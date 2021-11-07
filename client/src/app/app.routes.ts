import { Routes } from "@angular/router";
import { USER_ROLE } from "./shared/constant/user.role";
import { AuthGuard } from "./shared/guards/auth-guard.service";

 export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'admin',
        loadChildren: () => import('./users/admin/admin.module').then(m => m.AdminModule),
        canActivate: [AuthGuard],
        data: {
            role: [USER_ROLE.ADMIN]
        }
    },
    {
        path: 'builder',
        loadChildren: () => import('./users/builder/builder.module').then(m => m.BuilderModule),
        canActivate: [AuthGuard],
        data: {
            role: [USER_ROLE.BUILDER]
        }
    },
    {
        path: 'architect',
        loadChildren: ()=> import('./users/architect/architect.module').then(m => m.ArchitectModule),
        canActivate: [AuthGuard],
        data: {
            role: [USER_ROLE.ARCHITECT]
        }
    },
    {
        path: 'register',
        loadChildren: ()=> import('./register/register.module').then(m => m.RegisterModule)
    },
    {
        path: 'login',
        loadChildren: ()=> import('./login/login.module').then(m => m.LoginModule)
    }
];


