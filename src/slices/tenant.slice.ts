import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { access } from 'fs';

interface TenantState {
    id: number;
}

const initialState: TenantState = {
    id: 0,
};

const tenantSlice = createSlice({
    name: 'tenant',
    initialState,
    reducers: {
        startEditTenant: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        },
        cancelEditTenant: (state) => {
            state.id = 0;
        },
    },
});

const tenantReducer = tenantSlice.reducer;
export const { cancelEditTenant, startEditTenant } = tenantSlice.actions;
export default tenantReducer;
