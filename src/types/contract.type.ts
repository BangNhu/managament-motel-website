export interface Contract {
    id: number;
    bedsit_id: number;
    start_day: string;
    end_day: string;
    tenant_represent_id: number;

    deposits: number;
    content: string;
    staff_id: number;
    landlord_id: number;
}
