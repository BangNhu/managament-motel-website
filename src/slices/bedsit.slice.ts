import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { access } from 'fs';

interface BedsitState {
    id: number;
}

const initialState: BedsitState = {
    id: 0,
};

const bedsitSlice = createSlice({
    name: 'bedsit',
    initialState,
    reducers: {
        startEditBedsit: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        },
        cancelEditBedsit: (state) => {
            state.id = 0;
        },
    },
});

const bedsitReducer = bedsitSlice.reducer;
export const { cancelEditBedsit, startEditBedsit } = bedsitSlice.actions;
export default bedsitReducer;
