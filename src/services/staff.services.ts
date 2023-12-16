import { Staff } from '@/types/staff.type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface StaffsResponse {
    result: Staff[];
}
let token: string | null;

// Check if window is defined (browser environment)
if (typeof window !== 'undefined') {
    token = window.localStorage.getItem('token');
}

export const staffApi = createApi({
    tagTypes: ['Staffs'], //Nhưng kiểu tag cho phép dùng
    reducerPath: 'staffApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    endpoints: (build) => ({
        getStaffs: build.query<StaffsResponse, void>({
            query: () => ({
                url: '/staff/list',
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
            providesTags(result) {
                if (result) {
                    const final = [
                        ...result?.result.map(({ id }) => ({ type: 'Staffs' as const, id })),
                        { type: 'Staffs' as const, id: 'LIST' },
                    ];
                    return final;
                }
                const final = [{ type: 'Staffs' as const, id: 'LIST' }];
                return final;
            },
        }),

        getStaffsByLandlord: build.query<StaffsResponse, number>({
            query: (id) => ({
                url: `/staff/landlord/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
        }),

        addStaffs: build.mutation<Staff, Omit<Staff, 'id'>>({
            query: (body) => ({
                url: '/staff/add',
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body,
            }),
            //những thứ match tag với invalidatesTags sẽ chạy lại (getStaffs)
            invalidatesTags: (result, erorr, body) => [{ type: 'Staffs', id: 'LIST' }],
        }),
        getStaff: build.query<StaffsResponse, number>({
            query: (id) => ({
                url: `/staff/detail/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            }),
        }),

        updateStaffs: build.mutation<Staff, { id: number; body: Staff }>({
            query: (data) => ({
                url: '/staff/update',
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                method: 'PUT',
                body: data.body,
            }),
            //những thứ match tag với invalidatesTags sẽ chạy lại (getStaffs)
            invalidatesTags: (result, erorr, data) => [{ type: 'Staffs', id: data.id }],
        }),
        deleteStaff: build.mutation<{}, number>({
            query: (id) => ({
                url: `/staff/delete/${id}`,
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
            }),
            invalidatesTags: (result, erorr, id) => [{ type: 'Staffs', id }],
        }),
    }),
});

export const {
    useGetStaffsQuery,
    useAddStaffsMutation,
    useGetStaffQuery,
    useUpdateStaffsMutation,
    useDeleteStaffMutation,
    useGetStaffsByLandlordQuery,
} = staffApi;
