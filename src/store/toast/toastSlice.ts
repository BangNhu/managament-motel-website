const SERVER_DOMAIN = process.env.NEXT_PUBLIC_SERVER_ERP_DOMAIN;
import { createSlice } from '@reduxjs/toolkit';

interface Toast {
    ID?: string;
    toastText: string;
    toastState: 'waring' | 'erorr' | 'success' | 'normal';
    image?: string;
}

interface ToastsProps {
    toasts: Toast[];
}

let initialState: ToastsProps = {
    toasts: [],
};

const toast = createSlice({
    name: 'toasts',
    initialState,
    reducers: {
        openToastImage(state, action) {
            const { id, text, image } = action.payload;
            let toastIds: any[] = [];
            state.toasts.forEach((item) => {
                if (item.ID) {
                    toastIds = [...toastIds, item.ID];
                }
            });

            if (toastIds.indexOf(id) === -1) {
                state.toasts = [
                    ...state.toasts,
                    {
                        ID: id,
                        toastText: text,
                        toastState: 'normal',
                        image: SERVER_DOMAIN + image,
                    },
                ];
            }
        },
        openToastIcon(state, action) {
            const { text, toastState } = action.payload;

            state.toasts = [...state.toasts, { toastText: text, toastState: toastState }];
        },
        closeToast(state) {
            state.toasts.shift();
        },
        closeToastTarget(state: ToastsProps, action) {
            state.toasts = state.toasts.filter(
                (value: Toast, key: number) => key !== action.payload.key
            );
        },
    },
});

const { reducer, actions } = toast;

export const { openToastImage, openToastIcon, closeToast, closeToastTarget } = actions;

export default reducer;
