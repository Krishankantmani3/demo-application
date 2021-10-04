import { Component } from "@angular/core";
import { UserDetails } from "./user.model";
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { RegisterService } from "./register.service";

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
    selectedRole: number = role.ARCHITECT;
    userDetails;
    userForm: any;
    isFormDirty: boolean;
    isSubmitted: boolean;

    constructor(private registerService: RegisterService) {
        this.createFormGroup();
    }

    createFormGroup() {
        this.userForm = new FormGroup({
            // languageId: new FormControl('', Validators.required),
            fullname: new FormControl('', Validators.required),
            username: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            // role: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
            confirmPassword: new FormControl('', Validators.required),
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
        
        if(this.userForm.valid){
            this.userDetails = {
                fullname: this.userForm.value.fullname, 
                username: this.userForm.value.username,
                email: this.userForm.value.email,
                password: this.userForm.value.password,
                confirmPassword: this.userForm.value.confirmPassword,
                gender: this.userForm.value.gender,
                role: this.selectedRole
            };

            this.registerService.register({user: this.userDetails});
        }
    }
}
