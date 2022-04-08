import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of, throwError } from "rxjs";
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

    isUserAuthenticated(route: ActivatedRouteSnapshot, url: string): Observable<boolean> | boolean {
        try {
            if (!this.appState.get('isUserAuthenticated')) {
                return this.authService.authenticate().pipe(map((res) => {
                    console.log("authentcated", res.body);
                    this.authService.redirectUrl = null;
                    this.appState.set('isUserAuthenticated', 1);
                    this.appState.set('userData', res.body);
                    return this.isUserAuthorized(route, url);
                }), catchError((error) => {
                    console.log("error in req");
                    this.authService.redirectUrl = url;
                    this.appState.set('isUserAuthenticated', 0);
                    this.router.navigate(['/login']);
                    return of(false);
                }));
            }
            else {
                this.authService.redirectUrl = null;
                return this.isUserAuthorized(route, url);
            }
        }
        catch (err) {
            console.log('isUserAuthenticated', err);
            return false;
        }
    }

    isUserAuthorized(route: ActivatedRouteSnapshot, url) {
        let routeData = route.data;

        if(url == '/verify-email'){
            return true;
        }

        if(!this.appState.get('userData').isUserActivated){
            this.redirectUserToUserDeactivatedPage();
            return false;
        }

        if(!this.appState.get('userData').isEmailVerified){
            this.redirectUserToVerifyEmailPage();
            return false;
        }

        for (let role of this.appState.get('userData').role) {
            if (routeData.role.indexOf(role) >= 0) {
                return true;
            }
        }

        this.redirectUserToDashboard(this.appState.state.userData);
        return false;
    }

    redirectUserToDashboard(userData: any) {
        if (userData.role) {
            if (userData.role.indexOf(USER_ROLE.ADMIN) >= 0) {
                this.router.navigate(['/admin']);
            } else if (userData.role.indexOf(USER_ROLE.EDUCATOR) >= 0) {
                this.router.navigate(['/architect']);
            } else if (userData.role.indexOf(USER_ROLE.STUDENT) >= 0) {
                this.router.navigate(['/builder']);
            }
        }
    }

    redirectUserToVerifyEmailPage(){
        this.router.navigate(['/verify-email']);
    }

    redirectUserToUserDeactivatedPage(){
        this.router.navigate(['/account-deactivated']);
    }
}