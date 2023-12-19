import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { access } from 'fs';

interface MotelState {
    id: number;
}

const initialState: MotelState = {
    id: 0,
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
