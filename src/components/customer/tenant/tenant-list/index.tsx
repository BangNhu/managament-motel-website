import useTokenData from '@/services/auth/token-data-loader';
import {
    TenantsResponse,
    useDeleteTenantMutation,
    useGetTenantsByLandLordQuery,
    useGetTenantsByStaffQuery,
} from '@/services/tenant.services';
import { startEditTenant } from '@/slices/tenant.slice';
import { Button, Modal, Stack } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AddTenant from '../form-tenant';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: '50%' },
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    borderRadius: '8px',
    boxShadow: '4px 4px 16px rgba(0, 0, 0, 0.25)',
    p: 5,
};

export interface ITenantListProps {}

export function TenantList(props: ITenantListProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        dispatch(startEditTenant(0));
    };
    const tokenData = useTokenData();
    const [selectedTenantId, setSelectedTenantId] = useState<number | null>(null);
    const [deleteTenant] = useDeleteTenantMutation();
    // const { data: dataTenant } = useGetTenantsQuery();
    // console.log(dataTenant);

    const { data: dataTenantLandlord } = useGetTenantsByLandLordQuery(tokenData?.userID);
    console.log('dataTenantLandlord', dataTenantLandlord);

    const { data: dataTenantStaff } = useGetTenantsByStaffQuery(tokenData?.userID);
    const [Tenant, setTenant] = useState<TenantsResponse | undefined>();
    useEffect(() => {
        if (tokenData?.userType === 'landlord') {
            setTenant(dataTenantLandlord as TenantsResponse);
        } else if (tokenData?.account_type === 'staff') {
            setTenant(dataTenantStaff as TenantsResponse);
        }
    }, [dataTenantLandlord, dataTenantStaff, tokenData]);
    console.log('type', tokenData);
    console.log('first', Tenant);
    //Danh sách nhà trọ
    const Tenants = Tenant?.result || [];

    const dispatch = useDispatch();
    // const startEdit = (id: number) => {
    //     dispatch(startEditTenant(id));
    // };
    const handleDeleteTenant = (id: number) => {
        deleteTenant(id);
    };
    const convertStatus = (status: number) => {
        if (status === 0) {
            return 'Đang trống';
        } else if (status === 1) {
            return 'Đã thuê';
        } else if (status === 2) {
            return 'Đang đặt cọc';
        } else {
            return 'Trạng thái không xác định';
        }
    };
    const columns: GridColDef[] = [
        { field: 'index', headerName: 'STT', width: 70 },
        { field: 'tenant_name', headerName: 'Tên khách hàng', width: 130 },
        {
            field: 'birthday',
            headerName: 'Ngày sinh',
            width: 130,
            type: 'Date',
            //xài format fns lại bị lỗi getStaticPaths
            valueFormatter: (params) => {
                const date = new Date(params.value);
                const formattedDate = new Intl.DateTimeFormat('en-GB').format(date);
                return formattedDate;
            },
        },
        { field: 'citizen_identification', headerName: 'Số định danh', width: 130 },
        {
            field: 'address',
            headerName: 'Địa chỉ',
            width: 150,
        },
        {
            field: 'number_phone',
            headerName: 'Số điện thoại',

            width: 130,
        },
        {
            field: 'email',
            headerName: 'Email',

            width: 130,
        },
        {
            field: 'gender',
            headerName: 'Giới tính',
            valueFormatter: (params: { value: number }) => {
                if (params.value === 0) return 'Nữ';
                else if (params.value === 1) return 'Nam';
                return 'Khác';
            },
            width: 80,
        },
        {
            field: 'is_temporary residence',
            headerName: 'Khai báo tạm trú',

            width: 150,
            valueFormatter: (params: { value: number }) => {
                if (params.value === 1) return 'Đã khai báo';
                else if (params.value === 0) return 'Chưa khai báo';
                return 'Khác';
            },
        },
        {
            field: 'motel_name',
            headerName: 'Nhà trọ',

            width: 130,
        },
        {
            field: 'bedsit_id',
            headerName: 'Phòng',

            width: 130,
        },

        // { field: 'staff_name', headerName: 'Nhân viên', width: 130 },
        {
            field: 'actions',
            headerName: '',
            width: 350,
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams) => (
                <Stack direction="row" spacing={1}>
                    <Button
                        variant="outlined"
                        sx={{ textTransform: 'capitalize' }}
                        onClick={() => {
                            dispatch(startEditTenant(params.row.id));
                            handleOpen();
                        }}
                    >
                        Sửa
                    </Button>
                    <Modal
                        open={open}
                        onClose={() => {
                            handleClose();
                            dispatch(startEditTenant(0));
                            // setSelectedTenantId(null); // Đặt lại giá trị của selectedTenantId khi đóng Modal
                        }}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        sx={{
                            '& .MuiBackdrop-root': {
                                backgroundColor: 'rgba(169, 169, 169, 0.5)', // Màu xám nhạt với độ trong suốt
                            },
                        }}
                    >
                        <Stack sx={style}>
                            <AddTenant
                                handleCloseModal={() => {
                                    handleClose();
                                    setSelectedTenantId(null);
                                }}
                            />
                        </Stack>
                    </Modal>
                    <Button
                        variant="outlined"
                        sx={{ textTransform: 'capitalize' }}
                        onClick={() => handleDeleteTenant(params.row.id)}
                    >
                        Chi tiết
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ textTransform: 'capitalize' }}
                        // onClick={() => handleDeleteTenant(params.row.id)}
                    >
                        Tạm trú
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ textTransform: 'capitalize' }}
                        onClick={() => handleDeleteTenant(params.row.id)}
                    >
                        Xóa
                    </Button>
                </Stack>
            ),
        },
    ];

    const rows = Tenants.map((tenant, index) => ({
        ...tenant,
        id: tenant.id,
        // status: convertStatus(bedsit.status),
        index: index + 1,
    }));

    return (
        <Stack sx={{ width: { xs: '95%', md: '90%' }, mx: 'auto' }}>
            <DataGrid
                //    rowId={(row: { id: any; }) => row.id}
                rows={rows} // Cast Bedsits to the expected type
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10, 20, 30]}
                // checkboxSelection
                sx={{
                    '& .MuiDataGrid-root': {
                        backgroundColor: 'lightgray', // Màu nền của DataGrid
                        border: '1px solid #ccc', // Viền của DataGrid
                        borderRadius: '8px', // Độ bo tròn các góc
                        fontSize: '14px',
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: '1px solid #ddd', // Đường viền dưới của cell
                    },
                    '& .MuiDataGrid-header': {
                        backgroundColor: '#f0f0f0', // Màu nền của header
                        borderBottom: '2px solid #ccc', // Viền dưới của header
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        color: '#1C1C1C',
                        fontWeight: 'bold',
                        fontSize: '16px',
                    },
                }}
            />
        </Stack>
    );
}
