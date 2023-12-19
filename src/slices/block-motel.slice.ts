import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { access } from 'fs';

interface BlockMotelState {
    id: number;
}

const initialState: BlockMotelState = {
    id: 0,
};

const blockMotelSlice = createSlice({
    name: 'blockMotel',
    initialState,
    reducers: {
        startEditBlockMotel: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        },
        cancelEditBlockMotel: (state) => {
            state.id = 0;
        },
    },
});

const blockMotelReducer = blockMotelSlice.reducer;
export const { cancelEditBlockMotel, startEditBlockMotel } = blockMotelSlice.actions;
export default blockMotelReducer;
