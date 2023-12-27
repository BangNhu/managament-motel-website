import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { access } from 'fs';

interface TemporaryResidenceState {
    id: number;
}

const initialState: TemporaryResidenceState = {
    id: 0,
};

const temporaryResidenceSlice = createSlice({
    name: 'temporaryResidence',
    initialState,
    reducers: {
        startEditTemporaryResidence: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        },
        cancelEditTemporaryResidence: (state) => {
            state.id = 0;
        },
    },
});

const temporaryResidenceReducer = temporaryResidenceSlice.reducer;
export const { cancelEditTemporaryResidence, startEditTemporaryResidence } =
    temporaryResidenceSlice.actions;
export default temporaryResidenceReducer;
