import { BlockMotel } from '@/types/block-motel.type';
import { Motel } from '@/types/motel.type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface BlockMotelsResponse {
    result: BlockMotel[];
}
let token: string | null;

// Check if window is defined (browser environment)
if (typeof window !== 'undefined') {
    token = window.localStorage.getItem('token');
}

export const blockMotelApi = createApi({
    tagTypes: ['BlockMotels'], //Nhưng kiểu tag cho phép dùng
    reducerPath: 'blockMotelApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    endpoints: (build) => ({
        getBlockMotels: build.query<BlockMotelsResponse, void>({
            query: () => ({
                url: '/block-motel/list',
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
            providesTags(result) {
                if (result) {
                    const final = [
                        ...result?.result.map(({ id }) => ({ type: 'BlockMotels' as const, id })),
                        { type: 'BlockMotels' as const, id: 'LIST' },
                    ];
                    return final;
                }
                const final = [{ type: 'BlockMotels' as const, id: 'LIST' }];
                return final;
            },
        }),

        getBlockMotelsByLandLord: build.query<BlockMotelsResponse, number>({
            query: (id) => ({
                url: `/block-motel/list-by-landlord/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
        }),
        getBlockMotelsByStaff: build.query<BlockMotelsResponse, number>({
            query: (id) => ({
                url: `/block-motel/list-by-landlord/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
        }),

        addBlockMotels: build.mutation<Motel, Omit<Motel, 'id' | 'staff_name'>>({
            query: (body) => ({
                url: '/block-motel/add',
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body,
            }),
            //những thứ match tag với invalidatesTags sẽ chạy lại (getBlockMotels)
            invalidatesTags: (result, erorr, body) => [{ type: 'BlockMotels', id: 'LIST' }],
        }),
        getBlockMotel: build.query<BlockMotelsResponse, number>({
            query: (id) => ({
                url: `/block-motel/detail/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
        }),

        updateBlockMotels: build.mutation<Motel, { id: number; body: Motel }>({
            query: (data) => ({
                url: '/block-motel/update',
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                method: 'PUT',
                body: data.body,
            }),
            //những thứ match tag với invalidatesTags sẽ chạy lại (getBlockMotels)
            invalidatesTags: (result, erorr, data) => [{ type: 'BlockMotels', id: data.id }],
        }),
        deleteBlockMotel: build.mutation<{}, number>({
            query: (id) => ({
                url: `/block-motel/delete/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
            }),
            invalidatesTags: (result, erorr, id) => [{ type: 'BlockMotels', id }],
        }),
    }),
});

export const {
    useGetBlockMotelsByLandLordQuery,
    useGetBlockMotelsQuery,
    useAddBlockMotelsMutation,
    useGetBlockMotelQuery,
    useUpdateBlockMotelsMutation,
    useDeleteBlockMotelMutation,
    useGetBlockMotelsByStaffQuery,
} = blockMotelApi;
