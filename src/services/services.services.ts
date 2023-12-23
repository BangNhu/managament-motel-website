import { Services } from '@/types/services.type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface ServicesResponse {
    result: Services[];
}
let token: string | null;

// Check if window is defined (browser environment)
if (typeof window !== 'undefined') {
    token = window.localStorage.getItem('token');
}

export const servicesApi = createApi({
    tagTypes: ['Services'], //Nhưng kiểu tag cho phép dùng
    reducerPath: 'ServicesApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    endpoints: (build) => ({
        // getBedsits: build.query<BedsitsResponse, void>({
        //     query: () => ({
        //         url: '/bedsit/list',
        //         headers: {
        //             // Kiểm tra nếu có token, thì thêm vào header Authorization
        //             ...(token && { Authorization: `Bearer ${token}` }),
        //             'Content-Type': 'application/json',
        //         },
        //     }),
        //     providesTags(result) {
        //         if (result) {
        //             const final = [
        //                 ...result?.result.map(({ id }) => ({ type: 'Bedsits' as const, id })),
        //                 { type: 'Bedsits' as const, id: 'LIST' },
        //             ];
        //             return final;
        //         }
        //         const final = [{ type: 'Bedsits' as const, id: 'LIST' }];
        //         return final;
        //     },
        // }),

        getServicesByLandLord: build.query<ServicesResponse, number>({
            query: (id) => ({
                url: `/services/list-by-landlord/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
            providesTags(result) {
                if (result) {
                    const final = [
                        ...result?.result.map(({ id }) => ({ type: 'Services' as const, id })),
                        { type: 'Services' as const, id: 'LIST' },
                    ];
                    return final;
                }
                const final = [{ type: 'Services' as const, id: 'LIST' }];
                return final;
            },
        }),
        getServicesByStaff: build.query<ServicesResponse, number>({
            query: (id) => ({
                url: `/services/list-by-staff/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
        }),

        addServices: build.mutation<Services, Omit<Services, 'id'>>({
            query: (body) => ({
                url: '/services/add',
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body,
            }),
            //những thứ match tag với invalidatesTags sẽ chạy lại (getBedsits)
            invalidatesTags: (result, erorr, body) => [{ type: 'Services', id: 'LIST' }],
        }),
        getService: build.query<ServicesResponse, number>({
            query: (id) => ({
                url: `/services/detail/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
        }),

        updateServices: build.mutation<Services, { id: number; body: Services }>({
            query: (data) => ({
                url: '/services/update',
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                method: 'PUT',
                body: data.body,
            }),
            //những thứ match tag với invalidatesTags sẽ chạy lại (getBedsits)
            invalidatesTags: (result, erorr, data) => [{ type: 'Services', id: data.id }],
        }),
        deleteService: build.mutation<{}, number>({
            query: (id) => ({
                url: `/services/delete/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
            }),
            invalidatesTags: (result, erorr, id) => [{ type: 'Services', id }],
        }),
    }),
});

export const {
    useGetServicesByLandLordQuery,

    useAddServicesMutation,
    useGetServiceQuery,
    useUpdateServicesMutation,
    useDeleteServiceMutation,
    useGetServicesByStaffQuery,
} = servicesApi;
