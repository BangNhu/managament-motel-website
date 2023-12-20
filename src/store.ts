import { configureStore } from '@reduxjs/toolkit';
import motelReducer from './slices/motel.slice';
import { motelApi } from './services/motel.services';
import { setupListeners } from '@reduxjs/toolkit/query';
import staffReducer from './slices/staff.slice';
import { staffApi } from './services/staff.services';
import { blockMotelApi } from './services/block-motel.services';
// ...

export const store = configureStore({
    reducer: {
        motel: motelReducer,
        staff: staffReducer,
        [motelApi.reducerPath]: motelApi.reducer, //thêm reducer được tạo từ api slice
        [staffApi.reducerPath]: staffApi.reducer,
        [blockMotelApi.reducerPath]: blockMotelApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            motelApi.middleware,
            staffApi.middleware,
            blockMotelApi.middleware
        ),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
