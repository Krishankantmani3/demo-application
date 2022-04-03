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
    showMailModal = false;
    modalTitle: string;
    headerContent: string;
    bodyContent: string;

    constructor(private manageUserService: ManageUserService, private router: Router) { }

    ngOnInit() { }

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

    showModalForMailInput(){
        this.modalTitle = `Mail to ${this.userDetail.email}`;
        this.showMailModal = true;
    }

    mailToUser(formData){
        this.showMailModal = false;
        this.isLoaded = false;

        if(formData){
            let data = {
                sendTo: this.userDetail.email,
                subject: formData.headerContent,
                body: formData.bodyContent
            };

            this.manageUserService.mailToUser(data).then((res)=>{
                this.isLoaded = true;
            }).catch((err)=>{
                this.isLoaded = true;
            });
        }
        else{
            this.isLoaded = true;
        }
    }
}