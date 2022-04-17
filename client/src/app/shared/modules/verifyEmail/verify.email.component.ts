import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppState } from "../../../app.service";
import { USER_ROLE } from "../../constant/user.role";
import { VerifyEmailService } from "./verify.email.service";

@Component({
    selector: 'verify-email',
    templateUrl: './verify.email.component.html'
})
export class verifyEmailComponent implements OnInit, OnDestroy {
    verifyEmail: boolean = true;
    showMessageToConfirm: boolean;
    timeToLeaveForEmail = 600;
    timeInterval = 5 * 1000;
    intervalIdForEmailVerification: any;
    remainingTime: any;

    constructor(private appState: AppState, private verifyEmailService: VerifyEmailService, private router: Router) {
        this.checkIsEmailVerified();
        this.checkStatusSessStorage();
    }

    ngOnInit() {

    }

    checkIsEmailVerified() {
        let user = this.appState.get('userData');
        if (user && user.isEmailVerified) {
            this.redirectUserToDashboard(user);
        }
    }

    checkStatusSessStorage() {
        let dateEntryForEmailSent = sessionStorage.getItem("emailVerification");
        if (dateEntryForEmailSent) {
            this.verifyEmail = false;
            this.showMessageToConfirm = true;
            let timeLeft = this.timeToLeaveForEmail - ((new Date().getTime() - JSON.parse(dateEntryForEmailSent)) / 1000);
            if (timeLeft > 0) {
                this.keepCheckingEmailVerification();
                this.countDownTimer(timeLeft);
            }
            else {
                sessionStorage.removeItem('emailVerification');
                this.verifyEmail = true;
                this.showMessageToConfirm = false;
            }
        }
    }

    countDownTimer = (timer: any) => {
        timer = Math.floor(timer);
        this.remainingTime = this.secToHHMMSS(timer);
        if (timer >= 0) {
            timer--;
            setTimeout(() => {
                this.countDownTimer(timer);
            }, 1000);
        }
    }

    keepCheckingEmailVerification() {
        this.intervalIdForEmailVerification = setInterval(() => {
            let timeLeft;
            let dateEntryForEmailSent = sessionStorage.getItem("emailVerification");
            if (dateEntryForEmailSent) {
                timeLeft = this.timeToLeaveForEmail - ((new Date().getTime() - JSON.parse(dateEntryForEmailSent)) / 1000);
                timeLeft = Math.ceil(timeLeft);
            }
            if (timeLeft <= 0 && this.intervalIdForEmailVerification) {
                clearInterval(this.intervalIdForEmailVerification);
                this.verifyEmail = true;
                this.showMessageToConfirm = false;
                return;
            }

            this.verifyEmailService.checkEmailverifiedOrNot().then((user: any) => {
                if (user && user.isEmailVerified) {
                    this.appState.set('userData', user);
                    if (timeLeft <= 0 && this.intervalIdForEmailVerification) {
                        clearInterval(this.intervalIdForEmailVerification);
                    }
                    sessionStorage.removeItem('emailVerification');
                    this.redirectUserToDashboard(user);
                }
            });

        }, this.timeInterval);
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

    sendEmailVerificationToken() {
        this.verifyEmailService.sendEmailVerificationToken().then((res) => {
            this.verifyEmail = false;
            this.showMessageToConfirm = true;
            let currTime = new Date().getTime();
            sessionStorage.setItem("emailVerification", JSON.stringify(currTime));
            this.keepCheckingEmailVerification();
            this.countDownTimer(this.timeToLeaveForEmail);
        }).catch((err) => {
            this.showMessageToConfirm = false;
        });
    }

    secToHHMMSS(sec_num){
        let hours: any = Math.floor(sec_num / 3600);
        let minutes: any = Math.floor((sec_num - (hours * 3600)) / 60);
        let seconds: any = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return hours+':'+minutes+':'+seconds;
    }

    ngOnDestroy() {
        if (this.intervalIdForEmailVerification) {
            clearInterval(this.intervalIdForEmailVerification);
            return;
        }
    }
}
