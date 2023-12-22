import { Contract } from '@/types/contract.type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface ContractsResponse {
    result: Contract[];
}
let token: string | null;

// Check if window is defined (browser environment)
if (typeof window !== 'undefined') {
    token = window.localStorage.getItem('token');
}

export const contractApi = createApi({
    tagTypes: ['Contracts'], //Nhưng kiểu tag cho phép dùng
    reducerPath: 'contractApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    endpoints: (build) => ({
        getContracts: build.query<ContractsResponse, void>({
            query: () => ({
                url: '/contract/list',
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
            providesTags(result) {
                if (result) {
                    const final = [
                        ...result?.result.map(({ id }) => ({ type: 'Contracts' as const, id })),
                        { type: 'Contracts' as const, id: 'LIST' },
                    ];
                    return final;
                }
                const final = [{ type: 'Contracts' as const, id: 'LIST' }];
                return final;
            },
        }),

        getContractsByLandLord: build.query<ContractsResponse, number>({
            query: (id) => ({
                url: `/contract/list-by-landlord/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
        }),
        getContractsByStaff: build.query<ContractsResponse, number>({
            query: (id) => ({
                url: `/contract/list-by-landlord/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
        }),

        addContracts: build.mutation<Contract, Omit<Contract, 'id'>>({
            query: (body) => ({
                url: '/contract/add',
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body,
            }),
            //những thứ match tag với invalidatesTags sẽ chạy lại (getContracts)
            invalidatesTags: (result, erorr, body) => [{ type: 'Contracts', id: 'LIST' }],
        }),
        getContract: build.query<ContractsResponse, number>({
            query: (id) => ({
                url: `/contract/detail/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
        }),

        updateContracts: build.mutation<Contract, { id: number; body: Contract }>({
            query: (data) => ({
                url: '/contract/update',
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                method: 'PUT',
                body: data.body,
            }),
            //những thứ match tag với invalidatesTags sẽ chạy lại (getContracts)
            invalidatesTags: (result, erorr, data) => [{ type: 'Contracts', id: data.id }],
        }),
        deleteContract: build.mutation<{}, number>({
            query: (id) => ({
                url: `/contact/delete/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
            }),
            invalidatesTags: (result, erorr, id) => [{ type: 'Contracts', id }],
        }),
    }),
});

export const {
    useGetContractsByLandLordQuery,
    useGetContractsQuery,
    useAddContractsMutation,
    useGetContractQuery,
    useUpdateContractsMutation,
    useDeleteContractMutation,
    useGetContractsByStaffQuery,
} = contractApi;
