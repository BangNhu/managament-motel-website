import { TemporaryResidence, TemporaryResidencesResult } from '@/types/temporary_residence.type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface TemporaryResidencesResponse {
    result: TemporaryResidence[];
}
let token: string | null;

// Check if window is defined (browser environment)
if (typeof window !== 'undefined') {
    token = window.localStorage.getItem('token');
}

export const temporaryResidenceApi = createApi({
    tagTypes: ['TemporaryResidences'], //Nhưng kiểu tag cho phép dùng
    reducerPath: 'temporaryResidenceApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    endpoints: (build) => ({
        // getTemporaryResidences: build.query<TemporaryResidencesResponse, void>({
        //     query: () => ({
        //         url: '/temporary_residence/list',
        //         headers: {
        //             // Kiểm tra nếu có token, thì thêm vào header Authorization
        //             ...(token && { Authorization: `Bearer ${token}` }),
        //             'Content-Type': 'application/json',
        //         },
        //     }),
        //     providesTags(result) {
        //         if (result) {
        //             const final = [
        //                 ...result?.result.map(({ id }) => ({ type: 'TemporaryResidences' as const, id })),
        //                 { type: 'TemporaryResidences' as const, id: 'LIST' },
        //             ];
        //             return final;
        //         }
        //         const final = [{ type: 'TemporaryResidences' as const, id: 'LIST' }];
        //         return final;
        //     },
        // }),

        getTemporaryResidencesByLandLord: build.query<TemporaryResidencesResponse, number>({
            query: (id) => ({
                url: `/temporary_residence/list-by-landlord/${id}`,
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
                            type: 'TemporaryResidences' as const,
                            id,
                        })),
                        { type: 'TemporaryResidences' as const, id: 'LIST' },
                    ];
                    return final;
                }
                const final = [{ type: 'TemporaryResidences' as const, id: 'LIST' }];
                return final;
            },
        }),
        getTemporaryResidencesByStaff: build.query<TemporaryResidencesResponse, number>({
            query: (id) => ({
                url: `/temporary_residence/list-by-landlord/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
        }),

        addTemporaryResidences: build.mutation<
            TemporaryResidence,
            Omit<TemporaryResidence, 'id' | 'motel_name' | 'is_temporary_residence'>
        >({
            query: (body) => ({
                url: '/temporary_residence/add',
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body,
            }),
            //những thứ match tag với invalidatesTags sẽ chạy lại (getTemporaryResidences)
            invalidatesTags: (result, erorr, body) => [{ type: 'TemporaryResidences', id: 'LIST' }],
        }),
        getTemporaryResidence: build.query<TemporaryResidencesResponse, number>({
            query: (id) => ({
                url: `/temporary_residence/detail/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
        }),
        getTemporaryResidenceId: build.query<TemporaryResidencesResult, number>({
            query: (id) => ({
                url: `/temporary_residence/detail/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
        }),

        updateTemporaryResidences: build.mutation<
            TemporaryResidence,
            { id: number; body: TemporaryResidence }
        >({
            query: (data) => ({
                url: '/temporary_residence/update',
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                method: 'PUT',
                body: data.body,
            }),
            //những thứ match tag với invalidatesTags sẽ chạy lại (getTemporaryResidences)
            invalidatesTags: (result, erorr, data) => [
                { type: 'TemporaryResidences', id: data.id },
            ],
        }),
        deleteTemporaryResidence: build.mutation<{}, number>({
            query: (id) => ({
                url: `/temporary_residence/delete/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
            }),
            invalidatesTags: (result, erorr, id) => [{ type: 'TemporaryResidences', id }],
        }),
    }),
});

export const {
    useGetTemporaryResidencesByLandLordQuery,
    // useGetTemporaryResidencesQuery,
    useAddTemporaryResidencesMutation,
    useGetTemporaryResidenceQuery,
    useUpdateTemporaryResidencesMutation,
    useDeleteTemporaryResidenceMutation,
    useGetTemporaryResidencesByStaffQuery,
    useGetTemporaryResidenceIdQuery,
} = temporaryResidenceApi;
