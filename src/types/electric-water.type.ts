export interface ElectricWater {
    id: number;
    record_day: string;
    index_electricity: number;
    index_water: number;
    bedsit_id: number;
    index_electric_old: number;
    index_water_old: number;
    amount_electric: number;
    amount_water: number;
    error: string;
}
export interface ElectricWaterResult {
    result: ElectricWater;
}
