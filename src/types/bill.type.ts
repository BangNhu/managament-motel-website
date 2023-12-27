export interface Bill {
    id: number;
    bedsit_id: number;
    create_day: string;
    pay_day: string;
    total_price_service: number;
    electronic_money: number;
    water_money: number;
    old_debt: number;
    total: number;
    status: number;
    costs_incurred: number;
    note: string;
    bedsit_name?: string;
}
export interface GetBill {
    [x: string]: any;
    id: number;
    bedsit_id: number;
    pay_day: string;
    total: number;
    status: number;
    note: string;
    //Lấy từ các bảng khác ra thôi
    price_electricity: number;
    price_water: number;
    price: number;
    index_electric_new: number;
    index_water_new: number;
    index_electric_old: number;
    index_water_old: number;
    amount_electric: number;
    amount_water: number;
}
export interface BillResultArray {
    result: GetBill[];
}

export interface BillResult {
    result: GetBill;
}
