import { configureStore } from '@reduxjs/toolkit';
import motelReducer from './slices/motel.slice';
import { motelApi } from './services/motel.services';
import { setupListeners } from '@reduxjs/toolkit/query';
// ...

export const store = configureStore({
    reducer: {
        motel: motelReducer,
        [motelApi.reducerPath]: motelApi.reducer, //thêm reducer được tạo từ api slice
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(motelApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
