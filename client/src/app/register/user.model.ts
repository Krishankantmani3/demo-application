

export class UserDetails{
    fullname: string;
    username: string;
    email : string;
    role: number;
    password: string; 
    confirmPassword: string;
    gender: string;

    constructor(userDetails?: UserDetails){
        this.fullname = userDetails && userDetails.fullname ? userDetails.fullname : "";
        this.username = userDetails && userDetails.username ? userDetails.username : "";
        this.email = userDetails && userDetails.email ? userDetails.email : "";
        this.role = userDetails && userDetails.role ? userDetails.role: 0;
        this.password = userDetails && userDetails.password ? userDetails.password : "";
        this.confirmPassword = userDetails && userDetails.confirmPassword ? userDetails.confirmPassword : "";
        this.gender = userDetails && userDetails.gender ? userDetails.gender : "";
    }

    validateUserDetails(){

    }

    validatePassword(){
        if(this.password === this.confirmPassword){
            return true;
        }
        else{
            return false; 
        }
    }

    
}