import { ReceiptExpense } from '@/types/receipt_expense.type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface ReceiptExpensesResponse {
    result: ReceiptExpense[];
}
let token: string | null;

// Check if window is defined (browser environment)
if (typeof window !== 'undefined') {
    token = window.localStorage.getItem('token');
}

export const receiptExpenseApi = createApi({
    tagTypes: ['ReceiptExpenses'], //Nhưng kiểu tag cho phép dùng
    reducerPath: 'receiptExpenseApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    endpoints: (build) => ({
        // getReceiptExpenses: build.query<ReceiptExpensesResponse, void>({
        //     query: () => ({
        //         url: '/receipt-expense/list',
        //         headers: {
        //             // Kiểm tra nếu có token, thì thêm vào header Authorization
        //             ...(token && { Authorization: `Bearer ${token}` }),
        //             'Content-Type': 'application/json',
        //         },
        //     }),
        //     providesTags(result) {
        //         if (result) {
        //             const final = [
        //                 ...result?.result.map(({ id }) => ({ type: 'ReceiptExpenses' as const, id })),
        //                 { type: 'ReceiptExpenses' as const, id: 'LIST' },
        //             ];
        //             return final;
        //         }
        //         const final = [{ type: 'ReceiptExpenses' as const, id: 'LIST' }];
        //         return final;
        //     },
        // }),

        getReceiptExpensesByLandLord: build.query<ReceiptExpensesResponse, number>({
            query: (id) => ({
                url: `/receipt-expense/list-by-landlord/${id}`,
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
                            type: 'ReceiptExpenses' as const,
                            id,
                        })),
                        { type: 'ReceiptExpenses' as const, id: 'LIST' },
                    ];
                    return final;
                }
                const final = [{ type: 'ReceiptExpenses' as const, id: 'LIST' }];
                return final;
            },
        }),
        getReceiptExpensesByStaff: build.query<ReceiptExpensesResponse, number>({
            query: (id) => ({
                url: `/receipt-expense/list-by-landlord/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
        }),

        addReceiptExpenses: build.mutation<
            ReceiptExpense,
            Omit<ReceiptExpense, 'id' | 'motel_name' | 'is_temporary_residence'>
        >({
            query: (body) => ({
                url: '/receipt-expense/add',
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body,
            }),
            //những thứ match tag với invalidatesTags sẽ chạy lại (getReceiptExpenses)
            invalidatesTags: (result, erorr, body) => [{ type: 'ReceiptExpenses', id: 'LIST' }],
        }),
        getReceiptExpense: build.query<ReceiptExpensesResponse, number>({
            query: (id) => ({
                url: `/receipt-expense/detail/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
        }),

        updateReceiptExpenses: build.mutation<ReceiptExpense, { id: number; body: ReceiptExpense }>(
            {
                query: (data) => ({
                    url: '/receipt-expense/update',
                    headers: {
                        // Kiểm tra nếu có token, thì thêm vào header Authorization
                        ...(token && { Authorization: `Bearer ${token}` }),
                        'Content-Type': 'application/json',
                    },
                    method: 'PUT',
                    body: data.body,
                }),
                //những thứ match tag với invalidatesTags sẽ chạy lại (getReceiptExpenses)
                invalidatesTags: (result, erorr, data) => [
                    { type: 'ReceiptExpenses', id: data.id },
                ],
            }
        ),
        deleteReceiptExpense: build.mutation<{}, number>({
            query: (id) => ({
                url: `/receipt-expense/delete/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
            }),
            invalidatesTags: (result, erorr, id) => [{ type: 'ReceiptExpenses', id }],
        }),
    }),
});

export const {
    useGetReceiptExpensesByLandLordQuery,
    // useGetReceiptExpensesQuery,
    useAddReceiptExpensesMutation,
    useGetReceiptExpenseQuery,
    useUpdateReceiptExpensesMutation,
    useDeleteReceiptExpenseMutation,
    useGetReceiptExpensesByStaffQuery,
} = receiptExpenseApi;
