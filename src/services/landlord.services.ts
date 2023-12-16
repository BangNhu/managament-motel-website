import { Landlord } from '@/types/landlord.type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface LandLordsResponse {
    result: Landlord[];
}
let token: string | null;

// Check if window is defined (browser environment)
if (typeof window !== 'undefined') {
    token = window.localStorage.getItem('token');
}

export const LandlordApi = createApi({
    tagTypes: ['Landlords'], //Nhưng kiểu tag cho phép dùng
    reducerPath: 'LandlordApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    endpoints: (build) => ({
        getLandlords: build.query<LandLordsResponse, void>({
            query: () => ({
                url: '/landlord/list',
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
            providesTags(result) {
                if (result) {
                    const final = [
                        ...result?.result.map(({ id }) => ({ type: 'Landlords' as const, id })),
                        { type: 'Landlords' as const, id: 'LIST' },
                    ];
                    return final;
                }
                const final = [{ type: 'Landlords' as const, id: 'LIST' }];
                return final;
            },
        }),

        addLandlords: build.mutation<Landlord, Omit<Landlord, 'id'>>({
            query: (body) => ({
                url: '/landlord/add',
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body,
            }),
            //những thứ match tag với invalidatesTags sẽ chạy lại (getLandlords)
            invalidatesTags: (result, erorr, body) => [{ type: 'Landlords', id: 'LIST' }],
        }),
        getLandlord: build.query<LandLordsResponse, number>({
            query: (id) => ({
                url: `/landlord/detail/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
        }),

        updateLandlords: build.mutation<Landlord, { id: number; body: Landlord }>({
            query: (data) => ({
                url: '/landlord/update',
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                method: 'PUT',
                body: data.body,
            }),
            //những thứ match tag với invalidatesTags sẽ chạy lại (getLandlords)
            invalidatesTags: (result, erorr, data) => [{ type: 'Landlords', id: data.id }],
        }),
        deleteLandlord: build.mutation<{}, number>({
            query: (id) => ({
                url: `/landlord/delete/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
            }),
            invalidatesTags: (result, erorr, id) => [{ type: 'Landlords', id }],
        }),
    }),
});

export const {
    useGetLandlordsQuery,
    useAddLandlordsMutation,
    useGetLandlordQuery,
    useUpdateLandlordsMutation,
    useDeleteLandlordMutation,
} = LandlordApi;
