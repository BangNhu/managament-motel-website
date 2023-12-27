import { Bill, BillResult, BillResultArray } from '@/types/bill.type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface BillsResponse {
    result: Bill[];
}
let token: string | null;

// Check if window is defined (browser environment)
if (typeof window !== 'undefined') {
    token = window.localStorage.getItem('token');
}

export const billApi = createApi({
    tagTypes: ['Bills'], //Nhưng kiểu tag cho phép dùng
    reducerPath: 'billApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    endpoints: (build) => ({
        // getBills: build.query<BillsResponse, void>({
        //     query: () => ({
        //         url: '/bill/list',
        //         headers: {
        //             // Kiểm tra nếu có token, thì thêm vào header Authorization
        //             ...(token && { Authorization: `Bearer ${token}` }),
        //             'Content-Type': 'application/json',
        //         },
        //     }),
        //     providesTags(result) {
        //         if (result) {
        //             const final = [
        //                 ...result?.result.map(({ id }) => ({ type: 'Bills' as const, id })),
        //                 { type: 'Bills' as const, id: 'LIST' },
        //             ];
        //             return final;
        //         }
        //         const final = [{ type: 'Bills' as const, id: 'LIST' }];
        //         return final;
        //     },
        // }),

        getBillsByLandLord: build.query<BillsResponse, number>({
            query: (id) => ({
                url: `/bill/list-by-landlord/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
            providesTags(result) {
                if (result) {
                    const final = [
                        ...result?.result.map(({ id }) => ({ type: 'Bills' as const, id })),
                        { type: 'Bills' as const, id: 'LIST' },
                    ];
                    return final;
                }
                const final = [{ type: 'Bills' as const, id: 'LIST' }];
                return final;
            },
        }),
        getBillsByStaff: build.query<BillsResponse, number>({
            query: (id) => ({
                url: `/bill/list-by-landlord/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
        }),

        addBills: build.mutation<Bill, Omit<Bill, 'id' | 'motel_name' | 'is_temporary_residence'>>({
            query: (body) => ({
                url: '/bill/add',
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body,
            }),
            //những thứ match tag với invalidatesTags sẽ chạy lại (getBills)
            invalidatesTags: (result, erorr, body) => [{ type: 'Bills', id: 'LIST' }],
        }),
        getBill: build.query<BillsResponse, number>({
            query: (id) => ({
                url: `/bill/detail/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
        }),

        updateBills: build.mutation<Bill, { id: number; body: Bill }>({
            query: (data) => ({
                url: '/bill/update',
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                method: 'PUT',
                body: data.body,
            }),
            //những thứ match tag với invalidatesTags sẽ chạy lại (getBills)
            invalidatesTags: (result, erorr, data) => [{ type: 'Bills', id: data.id }],
        }),
        deleteBill: build.mutation<{}, number>({
            query: (id) => ({
                url: `/bill/delete/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
            }),
            invalidatesTags: (result, erorr, id) => [{ type: 'Bills', id }],
        }),
        getBillsPriceBedsit: build.query<BillResultArray, number>({
            query: (id) => ({
                url: `/bill/get-price-bedsit/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
        }),
        getBillsServiceBedsit: build.query<BillResultArray, number>({
            query: (id) => ({
                url: `bill/get-service-bedsit/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
        }),
        getBillsOldNew: build.query<BillResult, number>({
            query: (id) => ({
                url: `bill/get-old-new/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
        }),
        getBillsTenant: build.query<BillsResponse, number>({
            query: (id) => ({
                url: `bill/get-list-tenant/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
        }),
    }),
});

export const {
    useGetBillsByLandLordQuery,
    // useGetBillsQuery,
    useAddBillsMutation,
    useGetBillQuery,
    useUpdateBillsMutation,
    useDeleteBillMutation,
    useGetBillsByStaffQuery,
    useGetBillsOldNewQuery,
    useGetBillsServiceBedsitQuery,
    useGetBillsPriceBedsitQuery,
    useGetBillsTenantQuery,
} = billApi;
