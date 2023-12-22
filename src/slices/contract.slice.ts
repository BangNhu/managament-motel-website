import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { access } from 'fs';

interface ContractState {
    id: number;
}

const initialState: ContractState = {
    id: 0,
};

const contractSlice = createSlice({
    name: 'contract',
    initialState,
    reducers: {
        startEditContract: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        },
        cancelEditContract: (state) => {
            state.id = 0;
        },
    },
});

const contractReducer = contractSlice.reducer;
export const { cancelEditContract, startEditContract } = contractSlice.actions;
export default contractReducer;
