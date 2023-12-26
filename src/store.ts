import { configureStore } from '@reduxjs/toolkit';
import motelReducer from './slices/motel.slice';
import { motelApi } from './services/motel.services';
import { setupListeners } from '@reduxjs/toolkit/query';
import staffReducer from './slices/staff.slice';
import { staffApi } from './services/staff.services';
import { blockMotelApi } from './services/block-motel.services';
import { bedsitApi } from './services/bedsit.services';
import { contractApi } from './services/contract.services';
import blockMotelReducer from './slices/block-motel.slice';
import bedsitReducer from './slices/bedsit.slice';
import contractReducer from './slices/contract.slice';
import tenantReducer from './slices/tenant.slice';
import { tenantApi } from './services/tenant.services';
import servicesReducer from './slices/services.slice';
import { servicesApi } from './services/services.services';
import electricWaterReducer from './slices/electric-water.slice';
import { electricWaterApi } from './services/electric-water.services';
import billReducer from './slices/bill.slice';
import { billApi } from './services/bill.services';
// ...

export const store = configureStore({
    reducer: {
        motel: motelReducer,
        staff: staffReducer,
        blockMotel: blockMotelReducer,
        bedsit: bedsitReducer,
        contract: contractReducer,
        tenant: tenantReducer,
        services: servicesReducer,
        electricWater: electricWaterReducer,
        bill: billReducer,
        [motelApi.reducerPath]: motelApi.reducer, //thêm reducer được tạo từ api slice
        [staffApi.reducerPath]: staffApi.reducer,
        [blockMotelApi.reducerPath]: blockMotelApi.reducer,
        [bedsitApi.reducerPath]: bedsitApi.reducer,
        [contractApi.reducerPath]: contractApi.reducer,
        [tenantApi.reducerPath]: tenantApi.reducer,
        [servicesApi.reducerPath]: servicesApi.reducer,
        [electricWaterApi.reducerPath]: electricWaterApi.reducer,
        [billApi.reducerPath]: billApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            motelApi.middleware,
            staffApi.middleware,
            blockMotelApi.middleware,
            bedsitApi.middleware,
            contractApi.middleware,
            tenantApi.middleware,
            servicesApi.middleware,
            electricWaterApi.middleware,
            billApi.middleware
        ),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
