import { Motel } from '@/types/motel.type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface MotelsResponse {
    result: Motel[];
}
let token: string | null;

// Check if window is defined (browser environment)
if (typeof window !== 'undefined') {
    token = window.localStorage.getItem('token');
}

export const motelApi = createApi({
    tagTypes: ['Motels'], //Nhưng kiểu tag cho phép dùng
    reducerPath: 'motelApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    endpoints: (build) => ({
        getMotels: build.query<MotelsResponse, void>({
            query: () => ({
                url: '/motel/list',
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
            providesTags(result) {
                if (result) {
                    const final = [
                        ...result?.result.map(({ id }) => ({ type: 'Motels' as const, id })),
                        { type: 'Motels' as const, id: 'LIST' },
                    ];
                    return final;
                }
                const final = [{ type: 'Motels' as const, id: 'LIST' }];
                return final;
            },
        }),

        addMotels: build.mutation<Motel, Omit<Motel, 'id'>>({
            query: (body) => ({
                url: '/motel/add',
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body,
            }),
            //những thứ match tag với invalidatesTags sẽ chạy lại (getMotels)
            invalidatesTags: (result, erorr, body) => [{ type: 'Motels', id: 'LIST' }],
        }),
        getMotel: build.query<MotelsResponse, number>({
            query: (id) => ({
                url: `/motel/detail/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
        }),
    }),
});

export const { useGetMotelsQuery, useAddMotelsMutation, useGetMotelQuery } = motelApi;
