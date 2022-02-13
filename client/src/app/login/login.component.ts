import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { USER_ROLE } from "../shared/constant/user.role";
import { AuthService } from "../shared/service/auth.service";
import { LoginService } from "./login.service";

enum role {
    ARCHITECT = 3,
    BUILDER = 2
};

@Component({
    selector: "login",
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    selectedRole: number = role.ARCHITECT;
    userDetails;
    userForm: any;
    isFormDirty: boolean;
    isSubmitted: boolean;
    isLogging = false;

    constructor(private loginService: LoginService, private router: Router, private authService: AuthService) {
        this.createFormGroup();
    }

    createFormGroup() {
        this.userForm = new FormGroup({
            // languageId: new FormControl('', Validators.required),
            username: new FormControl('',Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(12)])),
            password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)]))
        });
        this.userForm.valueChanges.subscribe(data => {
            if (this.userForm.dirty) {
                this.isFormDirty = true;
            }
        });
    }

    setRole(role) {
        this.selectedRole = role;
    }

    submit() {
        this.isSubmitted = true;
        this.isLogging = true;
        console.log("validity", this.userForm.controls.password.errors);
        if(this.userForm.valid){
            this.userDetails = {
                username: this.userForm.value.username,
                password: this.userForm.value.password,
                role: this.selectedRole
            };

            this.loginService.login(this.userDetails).then((res: any)=>{
                this.isLogging = false;
                if(this.authService.redirectUrl){
                    this.router.navigateByUrl(this.authService.redirectUrl);
                    this.authService.redirectUrl = null;
                }
                else{
                    this.redirectUserToDashboard(res.body);
                }
            });
        }
        else{
            this.isLogging = false;
        }
    }

    redirectUserToDashboard(userData: any) {
        console.log("userData in login", userData);

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

    routeToRegisterPage(){
        this.router.navigate(['/register']);
    }
}
