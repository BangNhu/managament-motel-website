import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { access } from 'fs';

interface ElectricWaterState {
    id: number;
    bedsit_id: number;
}

const initialState: ElectricWaterState = {
    id: 0,
    bedsit_id: 0,
};

const electricWaterSlice = createSlice({
    name: 'electricWater',
    initialState,
    reducers: {
        startEditElectricWater: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        },
        cancelEditElectricWater: (state) => {
            state.id = 0;
        },
    },
});

const electricWaterReducer = electricWaterSlice.reducer;
export const { cancelEditElectricWater, startEditElectricWater } = electricWaterSlice.actions;
export default electricWaterReducer;
