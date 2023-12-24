import { Tenant } from '@/types/tenant.type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface TenantsResponse {
    result: Tenant[];
}
let token: string | null;

// Check if window is defined (browser environment)
if (typeof window !== 'undefined') {
    token = window.localStorage.getItem('token');
}

export const tenantApi = createApi({
    tagTypes: ['Tenants'], //Nhưng kiểu tag cho phép dùng
    reducerPath: 'tenantApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    endpoints: (build) => ({
        // getTenants: build.query<TenantsResponse, void>({
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
        //                 ...result?.result.map(({ id }) => ({ type: 'Tenants' as const, id })),
        //                 { type: 'Tenants' as const, id: 'LIST' },
        //             ];
        //             return final;
        //         }
        //         const final = [{ type: 'Tenants' as const, id: 'LIST' }];
        //         return final;
        //     },
        // }),

        getTenantsByLandLord: build.query<TenantsResponse, number>({
            query: (id) => ({
                url: `/tenant/list-by-landlord/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
            providesTags(result) {
                if (result) {
                    const final = [
                        ...result?.result.map(({ id }) => ({ type: 'Tenants' as const, id })),
                        { type: 'Tenants' as const, id: 'LIST' },
                    ];
                    return final;
                }
                const final = [{ type: 'Tenants' as const, id: 'LIST' }];
                return final;
            },
        }),
        getTenantsByStaff: build.query<TenantsResponse, number>({
            query: (id) => ({
                url: `/tenant/list-by-landlord/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
        }),

        addTenants: build.mutation<
            Tenant,
            Omit<Tenant, 'id' | 'motel_name' | 'is_temporary_residence'>
        >({
            query: (body) => ({
                url: '/tenant/add',
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body,
            }),
            //những thứ match tag với invalidatesTags sẽ chạy lại (getTenants)
            invalidatesTags: (result, erorr, body) => [{ type: 'Tenants', id: 'LIST' }],
        }),
        getTenant: build.query<TenantsResponse, number>({
            query: (id) => ({
                url: `/tenant/detail/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
        }),

        updateTenants: build.mutation<Tenant, { id: number; body: Tenant }>({
            query: (data) => ({
                url: '/tenant/update',
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                method: 'PUT',
                body: data.body,
            }),
            //những thứ match tag với invalidatesTags sẽ chạy lại (getTenants)
            invalidatesTags: (result, erorr, data) => [{ type: 'Tenants', id: data.id }],
        }),
        deleteTenant: build.mutation<{}, number>({
            query: (id) => ({
                url: `/tenant/delete/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
            }),
            invalidatesTags: (result, erorr, id) => [{ type: 'Tenants', id }],
        }),
    }),
});

export const {
    useGetTenantsByLandLordQuery,
    // useGetTenantsQuery,
    useAddTenantsMutation,
    useGetTenantQuery,
    useUpdateTenantsMutation,
    useDeleteTenantMutation,
    useGetTenantsByStaffQuery,
} = tenantApi;
