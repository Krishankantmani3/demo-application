import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ManageUserService } from "./manage-user.service";

@Component({
    selector: 'manage-user',
    templateUrl: './manage-user.component.html'
})
export class ManageUserComponent implements OnInit {

    userDetail = null;
    isLoaded = true;
    isFormSubmitted: boolean = false;
    username = "";
    constructor(private manageUserService: ManageUserService, private router: Router) { }

    ngOnInit() {

    }

    getUserDetail() {
        this.isFormSubmitted = true;
        console.log("this.username", this.username);
        if(!this.username){
            alert("form empty");
            return;
        }

        this.manageUserService.getUserDetail(this.username)
            .then((userData: any) => {
                this.isLoaded = true;
                if (userData) {
                    this.userDetail = userData;
                }
                else{
                    this.userDetail = null;
                }
            })
            .catch((err) => {
                this.isLoaded = true;
            });
    }

    makeEmailVerified(){
        this.manageUserService.makeEmailVerified(this.userDetail._id).then((res)=>{
            this.userDetail.isEmailVerified = true;
        });
    }

    activateUserAccount(){
        this.manageUserService.activateUserByAdmin(this.userDetail._id).then((res)=>{
            this.userDetail.isUserActivated = true;
        });
    }

    deactivateUserAccount(){
        this.manageUserService.deActivateUserByAdmin(this.userDetail._id).then((res)=>{
            this.userDetail.isUserActivated = false;
        });
    }
}