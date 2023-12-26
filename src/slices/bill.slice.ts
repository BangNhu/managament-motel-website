import { PayloadAction, createSlice } from '@reduxjs/toolkit';
interface BillState {
    id: number;
}

const initialState: BillState = {
    id: 0,
};

const billSlice = createSlice({
    name: 'bill',
    initialState,
    reducers: {
        startEditBill: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        },
        cancelEditBill: (state) => {
            state.id = 0;
        },
    },
});

const billReducer = billSlice.reducer;
export const { cancelEditBill, startEditBill } = billSlice.actions;
export default billReducer;
