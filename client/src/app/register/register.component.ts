import { Component } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { RegisterService } from "./register.service";
import { Router } from "@angular/router";
import { USER_ROLE } from "../shared/constant/user.role";

enum role {
    ARCHITECT = 3,
    BUILDER = 2
};

@Component({
    selector: "register",
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    selectedRole: number = USER_ROLE.EDUCATOR;
    userDetails;
    userForm: any;
    isFormDirty: boolean;
    isSubmitted: boolean;
    isRegistering = false;

    constructor(private registerService: RegisterService, private router: Router) {
        this.createFormGroup();
    }

    createFormGroup() {
        this.userForm = new FormGroup({
            fullname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(30)])),
            username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(12)]) ),
            email: new FormControl('', Validators.compose([Validators.required, Validators.email, Validators.maxLength(25)])),
            password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])),
            confirmPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])),
            gender: new FormControl('', Validators.required)
        });
        // this.userForm.valueChanges.subscribe(data => {
        //     console.log(data);

        //     if (this.userForm.dirty) {
        //         this.isFormDirty = true;
        //     }
        // });
    }

    setRole(role) {
        this.selectedRole = role;
    }

    submitGender(myForm: NgForm) {
        console.log(myForm.value);
    }

    submit() {
        this.isSubmitted = true;
        this.isRegistering = true;
        if(this.userForm.valid){
            this.userDetails = {
                fullname: this.userForm.value.fullname, 
                username: this.userForm.value.username,
                email: this.userForm.value.email,
                password: this.userForm.value.password,
                confirmPassword: this.userForm.value.confirmPassword,
                gender: this.userForm.value.gender,
                role: [this.selectedRole]
            };

            this.registerService.register({user: this.userDetails}).then((res: any)=>{
                this.isRegistering = false;
                this.redirectUserToDashboard(res.body);
            });
        }
    }

    redirectUserToDashboard(userData: any) {
        console.log("role",userData.role);
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

    routeToLoginPage(){
        this.router.navigate(['/login']);
    }
}
