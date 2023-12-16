import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { access } from 'fs';

interface MotelState {
    id: number;
    motel_name: string;
    address: string;
    record_day: number;
    pay_day: number;
    staff_id: number;
    landlord_id: number;
}

const initialState: MotelState = {
    id: 0,
    motel_name: '',
    address: '',
    record_day: 0,
    pay_day: 0,
    staff_id: 0,
    landlord_id: 0,
};

const motelSlice = createSlice({
    name: 'motel',
    initialState,
    reducers: {
        startEditMotel: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        },
        cancelEditMotel: (state) => {
            state.id = 0;
        },
    },
});

const motelReducer = motelSlice.reducer;
export const { cancelEditMotel, startEditMotel } = motelSlice.actions;
export default motelReducer;
