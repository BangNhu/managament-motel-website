import { Bedsit } from '@/types/bedsit.type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface BedsitsResponse {
    result: Bedsit[];
}
let token: string | null;

// Check if window is defined (browser environment)
if (typeof window !== 'undefined') {
    token = window.localStorage.getItem('token');
}

export const bedsitApi = createApi({
    tagTypes: ['Bedsits'], //Nhưng kiểu tag cho phép dùng
    reducerPath: 'bedsitApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    endpoints: (build) => ({
        getBedsits: build.query<BedsitsResponse, void>({
            query: () => ({
                url: '/bedsit/list',
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
            providesTags(result) {
                if (result) {
                    const final = [
                        ...result?.result.map(({ id }) => ({ type: 'Bedsits' as const, id })),
                        { type: 'Bedsits' as const, id: 'LIST' },
                    ];
                    return final;
                }
                const final = [{ type: 'Bedsits' as const, id: 'LIST' }];
                return final;
            },
        }),

        getBedsitsByLandLord: build.query<BedsitsResponse, number>({
            query: (id) => ({
                url: `/bedsit/list-by-landlord/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
        }),
        getBedsitsByStaff: build.query<BedsitsResponse, number>({
            query: (id) => ({
                url: `/bedsit/list-by-landlord/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
        }),

        addBedsits: build.mutation<Bedsit, Omit<Bedsit, 'id'>>({
            query: (body) => ({
                url: '/bedsit/add',
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body,
            }),
            //những thứ match tag với invalidatesTags sẽ chạy lại (getBedsits)
            invalidatesTags: (result, erorr, body) => [{ type: 'Bedsits', id: 'LIST' }],
        }),
        getBedsit: build.query<BedsitsResponse, number>({
            query: (id) => ({
                url: `/bedsit/detail/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
        }),

        updateBedsits: build.mutation<Bedsit, { id: number; body: Bedsit }>({
            query: (data) => ({
                url: '/bedsit/update',
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                method: 'PUT',
                body: data.body,
            }),
            //những thứ match tag với invalidatesTags sẽ chạy lại (getBedsits)
            invalidatesTags: (result, erorr, data) => [{ type: 'Bedsits', id: data.id }],
        }),
        deleteBedsit: build.mutation<{}, number>({
            query: (id) => ({
                url: `/bedsit/delete/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
            }),
            invalidatesTags: (result, erorr, id) => [{ type: 'Bedsits', id }],
        }),
    }),
});

export const {
    useGetBedsitsByLandLordQuery,
    useGetBedsitsQuery,
    useAddBedsitsMutation,
    useGetBedsitQuery,
    useUpdateBedsitsMutation,
    useDeleteBedsitMutation,
    useGetBedsitsByStaffQuery,
} = bedsitApi;
