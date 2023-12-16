import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Alert, Button, CircularProgress, Grid, Stack, TextField, Typography } from '@mui/material';
import { SimpleLayout } from '@/components/common/layout/main/simple-layout';
import { checkToken } from '@/services/auth/check-token';
import {
    useAddMotelsMutation,
    useDeleteMotelMutation,
    useGetMotelsQuery,
} from '@/services/motel.services';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';
import { startEditMotel } from '@/slices/motel.slice';
import { useGetStaffQuery } from '@/services/staff.services';
export interface IMotelListProps {}

export function MotelList(props: IMotelListProps) {
    const [tokenData, setTokenData] = useState<any>(null);
    const [deletePost] = useDeleteMotelMutation();
    const { data: dataMotel } = useGetMotelsQuery();
    console.log(dataMotel);
    const { data: dataStaff } = useGetStaffQuery(3);
    console.log('data staff', dataStaff);
    //Danh sách nhà trọ
    const motels = dataMotel?.result || [];

    const dispatch = useDispatch();
    const startEdit = (id: number) => {
        dispatch(startEditMotel(id));
    };
    const handleDeleteMotel = (id: number) => {
        deletePost(id);
    };

    useEffect(() => {
        const checkTokenAndSetData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    return;
                }

                const data = await checkToken(token);
                setTokenData(data);
            } catch (error: any) {
                console.error('Error:', error.message);
            }
        };

        if (tokenData === null) {
            checkTokenAndSetData();
        }
    }, [tokenData]);
    console.log(tokenData);
    if (tokenData?.userType === 'landlord') {
        console.log('hi Như');
    }

    const columns: GridColDef[] = [
        // { field: 'id', headerName: 'ID', width: 70 },
        { field: 'motel_name', headerName: 'Tên dãy trọ', width: 130 },
        { field: 'address', headerName: 'Địa chỉ', width: 130 },
        {
            field: 'record_day',
            headerName: 'Ngày chốt',
            type: 'number',
            width: 90,
        },
        {
            field: 'pay_day',
            headerName: 'Ngày tính',
            type: 'number',
            width: 90,
        },
        { field: 'staff_name', headerName: 'Nhân viên', width: 130 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => (
                <Stack>
                    <button
                        onClick={() => {
                            startEdit(params.row.id);
                        }}
                    >
                        Edit
                    </button>

                    <button onClick={() => handleDeleteMotel(params.row.id)}>Delete</button>
                </Stack>
            ),
        },
    ];
    return (
        <div style={{ height: 400, width: '100%', margin: '10%' }}>
            <DataGrid
                rows={motels as readonly any[]} // Cast motels to the expected type
                columns={columns}
                pageSizeOptions={[5, 10]}
                // checkboxSelection
            />
        </div>
    );
}
