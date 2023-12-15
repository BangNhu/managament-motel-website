import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { access } from 'fs';

interface MotelState {
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
    email_token: string;
    reset_token: string;
}

const initialState: MotelState = {
    id: 0,
    landlord_name: '',
    password: '',
    number_phone: '',
    email: '',
    birthday: '',
    gender: 0,
    account_type: 0,
    expiration_date: '',
    is_verified: false,
    email_token: '',
    reset_token: '',
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
