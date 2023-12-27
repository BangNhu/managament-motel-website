import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { access } from 'fs';

interface ReceiptExpenseState {
    id: number;
}

const initialState: ReceiptExpenseState = {
    id: 0,
};

const receiptExpenseSlice = createSlice({
    name: 'tenant',
    initialState,
    reducers: {
        startEditReceiptExpense: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        },
        cancelEditReceiptExpense: (state) => {
            state.id = 0;
        },
    },
});

const receiptExpenseReducer = receiptExpenseSlice.reducer;
export const { cancelEditReceiptExpense, startEditReceiptExpense } = receiptExpenseSlice.actions;
export default receiptExpenseReducer;
