
export class UserResponseDTO {
    username: string;
    email: string;
    fullname: string;
    role: [number];

    constructor(user: any) {
        this.username = user.username;
        this.email = user.email;
        this.fullname = user.fullname;
        this.role = user.role;
    }
}