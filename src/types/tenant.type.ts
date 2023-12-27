export interface Tenant {
    id: number;
    tenant_name: string;
    birthday: string;
    citizen_identification: string;
    address: string;
    number_phone: string;
    email: string;
    password: string;
    gender: number;
    is_temporary_residence: boolean;
    motel_id: number;
    motel_name: string;
    // motel_name: string;
}
export interface TenantsResult {
    result: Tenant;
}
