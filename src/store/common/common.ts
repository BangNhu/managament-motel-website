import { CommonSliceInterface } from '@/models/index';
import { createSlice } from '@reduxjs/toolkit';

let initialState: CommonSliceInterface = {
    isLoadingGlobal: false,
};
const common = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setLoadingGlobal(state, action) {
            const { isLoadingGlobal } = action.payload;
            state.isLoadingGlobal = isLoadingGlobal;
        },
    },
});

const { reducer, actions } = common;

export const { setLoadingGlobal } = actions;

export default reducer;
