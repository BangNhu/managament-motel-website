export interface LoginPayload {
    Email: string;
    password: string;
}

export interface RegisterPayload {
    Name: string;
    Phone?: string;
    Email: string;
    Password: string;
}

export interface ChangePassByAdmin {
    UserId: string;
    NewPassword: string;
}
