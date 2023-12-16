import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { access } from 'fs';

interface StaffState {
    id: number;
    staff_name: string;
    citizen_identification: string;
    address: string;
    number_phone: string;
    email: string;
    landlord_id: number;
    password: string;
    gender: number;
    birthday: string;
}

const initialState: StaffState = {
    id: 0,
    staff_name: '',
    citizen_identification: '',
    address: '',
    number_phone: '',
    email: '',
    landlord_id: 0,
    password: '',
    gender: 0,
    birthday: '',
};

const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        startEditStaff: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        },
        cancelEditStaff: (state) => {
            state.id = 0;
        },
    },
});

const staffReducer = staffSlice.reducer;
export const { cancelEditStaff, startEditStaff } = staffSlice.actions;
export default staffReducer;
