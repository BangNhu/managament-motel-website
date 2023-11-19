import { configureStore } from '@reduxjs/toolkit';
import toastSlice from './toast/toastSlice';
import commonSiles from './common/common';

const rootReducer = {
    common: commonSiles,
    toast: toastSlice,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
