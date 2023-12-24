import { ElectricWater } from '@/types/electric-water.type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface ElectricWatersResponse {
    result: ElectricWater[];
}
let token: string | null;

// Check if window is defined (browser environment)
if (typeof window !== 'undefined') {
    token = window.localStorage.getItem('token');
}

export const electricWaterApi = createApi({
    tagTypes: ['ElectricWaters'], //Nhưng kiểu tag cho phép dùng
    reducerPath: 'electricWaterApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    endpoints: (build) => ({
        // getElectricWaters: build.query<ElectricWatersResponse, void>({
        //     query: () => ({
        //         url: '/tenant/list',
        //         headers: {
        //             // Kiểm tra nếu có token, thì thêm vào header Authorization
        //             ...(token && { Authorization: `Bearer ${token}` }),
        //             'Content-Type': 'application/json',
        //         },
        //     }),
        //     providesTags(result) {
        //         if (result) {
        //             const final = [
        //                 ...result?.result.map(({ id }) => ({ type: 'ElectricWaters' as const, id })),
        //                 { type: 'ElectricWaters' as const, id: 'LIST' },
        //             ];
        //             return final;
        //         }
        //         const final = [{ type: 'ElectricWaters' as const, id: 'LIST' }];
        //         return final;
        //     },
        // }),

        getElectricWatersByLandLord: build.query<ElectricWatersResponse, number>({
            query: (id) => ({
                url: `/electricity-water/list-by-landlord/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
            providesTags(result) {
                if (result) {
                    const final = [
                        ...result?.result.map(({ id }) => ({
                            type: 'ElectricWaters' as const,
                            id,
                        })),
                        { type: 'ElectricWaters' as const, id: 'LIST' },
                    ];
                    return final;
                }
                const final = [{ type: 'ElectricWaters' as const, id: 'LIST' }];
                return final;
            },
        }),
        getElectricWatersByStaff: build.query<ElectricWatersResponse, number>({
            query: (id) => ({
                url: `/electricity-water/list-by-landlord/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
        }),

        addElectricWaters: build.mutation<
            ElectricWater,
            Omit<ElectricWater, 'id' | 'motel_name' | 'is_temporary_residence'>
        >({
            query: (body) => ({
                url: '/electricity-water/add',
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body,
            }),
            //những thứ match tag với invalidatesTags sẽ chạy lại (getElectricWaters)
            invalidatesTags: (result, erorr, body) => [{ type: 'ElectricWaters', id: 'LIST' }],
        }),
        getElectricWater: build.query<ElectricWatersResponse, number>({
            query: (id) => ({
                url: `/electricity-water/detail/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
        }),
        getElectricWaterByBedsit: build.query<ElectricWatersResponse, number>({
            query: (id) => ({
                url: `/electricity-water/get-by-bedsit/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
        }),

        updateElectricWaters: build.mutation<ElectricWater, { id: number; body: ElectricWater }>({
            query: (data) => ({
                url: '/electricity-water/update',
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                method: 'PUT',
                body: data.body,
            }),
            //những thứ match tag với invalidatesTags sẽ chạy lại (getElectricWaters)
            invalidatesTags: (result, erorr, data) => [{ type: 'ElectricWaters', id: data.id }],
        }),
        deleteElectricWater: build.mutation<{}, number>({
            query: (id) => ({
                url: `/electricity-water/delete/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
            }),
            invalidatesTags: (result, erorr, id) => [{ type: 'ElectricWaters', id }],
        }),
    }),
});

export const {
    useGetElectricWatersByLandLordQuery,
    // useGetElectricWatersQuery,
    useAddElectricWatersMutation,
    useGetElectricWaterQuery,
    useGetElectricWaterByBedsitQuery,
    useUpdateElectricWatersMutation,
    useDeleteElectricWaterMutation,
    useGetElectricWatersByStaffQuery,
} = electricWaterApi;
