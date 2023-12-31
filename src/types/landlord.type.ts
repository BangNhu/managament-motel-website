export interface Landlord {
    id: number;
    landlord_name: string;
    password: string;
    number_phone: string;
    email: string;
    birthday: string;
    gender: number;
    account_type: number;
    expiration_date: string;
    is_verified: boolean;
    email_token?: string;
    reset_token?: string;
}
