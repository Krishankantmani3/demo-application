import { Routes } from "@angular/router";
import { UserAccountDeactivated } from "./shared/components/accountDeactivated/verifyEmail/account.deactivated.component";
import { NotFoundComponent } from "./shared/components/notFound/notfound.component";
import { verifyEmailComponent } from "./shared/modules/verifyEmail/verify.email.component";
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
            role: [USER_ROLE.STUDENT]
        }
    },
    {
        path: 'architect',
        loadChildren: ()=> import('./users/architect/architect.module').then(m => m.ArchitectModule),
        canActivate: [AuthGuard],
        data: {
            role: [USER_ROLE.EDUCATOR]
        }
    },
    {
        path: 'register',
        loadChildren: ()=> import('./register/register.module').then(m => m.RegisterModule)
    },
    {
        path: 'login',
        loadChildren: ()=> import('./login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'verify-email',
        loadChildren: ()=> import('./shared/modules/verifyEmail/verify.email.module').then(m => m.VerticalModalModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'account-deactivated',
        component: UserAccountDeactivated
    },
    {
         path: '404',
         component: NotFoundComponent
    },
    { path: '**', redirectTo: '/404' }
];


