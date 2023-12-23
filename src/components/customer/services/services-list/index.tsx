import useTokenData from '@/services/auth/token-data-loader';

import { Button, Modal, Stack } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { startEditServices } from '@/slices/services.slice';
import {
    ServicesResponse,
    useDeleteServiceMutation,
    useGetServicesByLandLordQuery,
    useGetServicesByStaffQuery,
} from '@/services/services.services';
import AddServices from '../form-services';

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

export interface IServicesListProps {}

export function ServicesList(props: IServicesListProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        dispatch(startEditServices(0));
    };
    const tokenData = useTokenData();
    const [selectedTenantId, setSelectedServicesId] = useState<number | null>(null);
    const [deleteServices] = useDeleteServiceMutation();
    // const { data: dataServices } = useGetServicessQuery();
    // console.log(dataServices);

    const { data: dataServicesLandlord } = useGetServicesByLandLordQuery(tokenData?.userID);
    console.log('dataServicesLandlord', dataServicesLandlord);

    const { data: dataServicesStaff } = useGetServicesByStaffQuery(tokenData?.userID);
    const [dataServices, setServices] = useState<ServicesResponse | undefined>();
    useEffect(() => {
        if (tokenData?.userType === 'landlord') {
            setServices(dataServicesLandlord as ServicesResponse);
        } else if (tokenData?.account_type === 'staff') {
            setServices(dataServicesStaff as ServicesResponse);
        }
    }, [dataServicesLandlord, dataServicesStaff, tokenData]);
    console.log('type', tokenData);
    console.log('first', dataServices);
    //Danh sách nhà trọ
    const data = dataServices?.result || [];

    const dispatch = useDispatch();
    // const startEdit = (id: number) => {
    //     dispatch(startEditServices(id));
    // };
    const handleDeleteServices = (id: number) => {
        deleteServices(id);
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
        { field: 'service_name', headerName: 'Tên dịch vụ', width: 130 },
        {
            field: 'price',
            headerName: 'Giá tiền',
            width: 130,
            type: 'number',
        },

        {
            field: 'unit',
            headerName: 'Đơn vị tính',
            width: 150,
            valueFormatter: (params: { value: number }) => {
                if (params.value === 0) {
                    return 'Tính theo phòng';
                } else if (params.value === 1) {
                    return 'Tính theo số người';
                }
            },
        },
        {
            field: 'motel_name',
            headerName: 'Nhà trọ',

            width: 130,
        },

        // { field: 'staff_name', headerName: 'Nhân viên', width: 130 },
        {
            field: 'actions',
            headerName: '',
            width: 250,
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams) => (
                <Stack direction="row" spacing={1}>
                    <Button
                        variant="outlined"
                        sx={{ textTransform: 'capitalize' }}
                        onClick={() => {
                            dispatch(startEditServices(params.row.id));
                            handleOpen();
                        }}
                    >
                        Sửa
                    </Button>
                    <Modal
                        open={open}
                        onClose={() => {
                            handleClose();
                            dispatch(startEditServices(0));
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
                            <AddServices
                                handleCloseModal={() => {
                                    handleClose();
                                    setSelectedServicesId(null);
                                }}
                            />
                        </Stack>
                    </Modal>
                    <Button
                        variant="outlined"
                        sx={{ textTransform: 'capitalize' }}
                        onClick={() => handleDeleteServices(params.row.id)}
                    >
                        Chi tiết
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ textTransform: 'capitalize' }}
                        onClick={() => handleDeleteServices(params.row.id)}
                    >
                        Xóa
                    </Button>
                </Stack>
            ),
        },
    ];

    const rows = data.map((services, index) => ({
        ...services,
        id: services.id,
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
