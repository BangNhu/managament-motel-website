export interface Tenant {
    id: number;
    tenant_name: string;
    birthday: string;
    citizen_identification: string;
    address: string;
    phone_number: string;
    email: string;
    password: string;
    gender: number;
    is_temporary_residence: boolean;
    motel_id: number;
    // motel_name: string;
}
