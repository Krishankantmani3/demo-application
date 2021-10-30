import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { AppState } from "../../app.service";
import { USER_ROLE } from "../constant/user.role";
import { AuthService } from "../service/auth.service";


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private router: Router, private authService: AuthService, private appState: AppState) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        let url: string = state.url;
        return this.isUserAuthenticated(route, url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.canActivate(route, state);
    }

    isUserAuthenticated(route: ActivatedRouteSnapshot, url: string): boolean | Observable<boolean> {
        try {
            if (!this.appState.get('isUserAuthenticated')) {
                this.authService.authenticate().subscribe({
                    next: (res) => {
                        console.log("status1",res.status);
                        this.authService.redirectUrl = null;
                        this.appState.set('isUserAuthenticated', 1);
                        this.appState.set('userData', res.body);
                        return this.isUserAuthorized(route);
                    },
                    error: (err) => {
                        console.log("status2", err.status);
                        this.authService.redirectUrl = url;
                        this.appState.set('isUserAuthenticated', 0);
                        this.router.navigate(['/login']);
                        return false;
                    }
                });
            }
            else {
                this.authService.redirectUrl = null;
                return this.isUserAuthorized(route);
            }
        }
        catch (err) {
            console.log('isUserAuthenticated', err);
            return false;
        }
    }

    isUserAuthorized(route: ActivatedRouteSnapshot): boolean | Observable<boolean> {
        let routeData = route.data;
        console.log("routeData", routeData);
        console.log("userData", [this.appState.get('userData').role]);

        for (let role of [this.appState.get('userData').role]) {
            if (routeData.role.indexOf(role) < 0) {
                console.warn('Unauthorized Access');
                this.redirectUserToDashboard(this.appState.state.userData);
                return false;
            }
        }

        return true;
    }

    redirectUserToDashboard(userData: any) {
        if (userData.role) {
            if (userData.role.indexOf(USER_ROLE.ADMIN) >= 0) {
                this.router.navigate(['/admin']);
            } else if (userData.role.indexOf(USER_ROLE.ARCHITECT) >= 0) {
                this.router.navigate(['/architect']);
            } else if (userData.role.indexOf(USER_ROLE.BUILDER) >= 0) {
                this.router.navigate(['/builder']);
            }
        }
    }
}