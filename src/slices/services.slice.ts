import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { access } from 'fs';

interface ServicesState {
    id: number;
}

const initialState: ServicesState = {
    id: 0,
};

const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        startEditServices: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        },
        cancelEditServices: (state) => {
            state.id = 0;
        },
    },
});

const servicesReducer = servicesSlice.reducer;
export const { cancelEditServices, startEditServices } = servicesSlice.actions;
export default servicesReducer;
