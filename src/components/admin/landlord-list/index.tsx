import useTokenData from '@/services/auth/token-data-loader';
import { Button, Modal, Stack } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AddLandlord from '../form-landlord';
import { startEditLandlord } from '@/slices/landlord.slice';
import { useDeleteLandlordMutation, useGetLandlordsQuery } from '@/services/landlord.services';

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

export interface ILandlordListProps {}

export function LandlordList(props: ILandlordListProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        dispatch(startEditLandlord(0));
    };
    const tokenData = useTokenData();
    const [selectedLandlordId, setSelectedLandlordId] = useState<number | null>(null);
    const [deleteLandlord] = useDeleteLandlordMutation();
    // const { data: dataLandlord } = useGetLandlordsQuery();
    // console.log(dataLandlord);

    const { data: Landlord } = useGetLandlordsQuery();
    console.log('Landlord', Landlord);
    //Danh sách nhà trọ
    const Landlords = Landlord?.result || [];

    const dispatch = useDispatch();
    // const startEdit = (id: number) => {
    //     dispatch(startEditLandlord(id));
    // };
    const handleDeleteLandlord = (id: number) => {
        deleteLandlord(id);
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
        { field: 'landlord_name', headerName: 'Tên khách hàng', width: 130 },
        // {
        //     field: 'birthday',
        //     headerName: 'Ngày sinh',
        //     width: 130,
        //     type: 'Date',
        //     //xài format fns lại bị lỗi getStaticPaths
        //     valueFormatter: (params) => {
        //         const date = new Date(params.value);
        //         const formattedDate = new Intl.DateTimeFormat('en-GB').format(date);
        //         return formattedDate;
        //     },
        // },

        {
            field: 'number_phone',
            headerName: 'Số điện thoại',

            width: 150,
        },
        {
            field: 'email',
            headerName: 'Email',

            width: 150,
        },
        {
            field: 'account_type',
            headerName: 'Loại tài khoản',

            width: 150,
            valueFormatter: (params: { value: number }) => {
                if (params.value === 0) return 'Dùng thử';
                else if (params.value === 1) return 'Cơ bản';
                else if (params.value === 2) return 'Vip 1';
                else if (params.value === 3) return 'Vip 2';
                else return 'Khác';
            },
        },

        {
            field: 'expiration_date',
            headerName: 'Ngày hết hạn',
            type: 'Date',

            width: 130,
            valueFormatter: (params) => {
                const date = new Date(params.value);
                if (!isNaN(date.getTime())) {
                    // Check if the date is valid
                    const formattedDate = new Intl.DateTimeFormat('en-GB').format(date);
                    return formattedDate;
                } else {
                    // Handle the case where the date is invalid
                    console.error('Invalid date:', params.value);
                    // You may want to return a default value or handle the error in another way
                }
            },
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
                            dispatch(startEditLandlord(params.row.id));
                            handleOpen();
                        }}
                    >
                        Sửa
                    </Button>
                    <Modal
                        open={open}
                        onClose={() => {
                            handleClose();
                            dispatch(startEditLandlord(0));
                            // setSelectedLandlordId(null); // Đặt lại giá trị của selectedLandlordId khi đóng Modal
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
                            <AddLandlord
                                handleCloseModal={() => {
                                    handleClose();
                                    setSelectedLandlordId(null);
                                }}
                            />
                        </Stack>
                    </Modal>

                    <Button
                        variant="outlined"
                        sx={{ textTransform: 'capitalize' }}
                        onClick={() => handleDeleteLandlord(params.row.id)}
                    >
                        Xóa
                    </Button>
                </Stack>
            ),
        },
    ];

    const rows = Landlords.map((Landlord: { id: any }, index: number) => ({
        ...Landlord,
        id: Landlord.id,
        // status: convertStatus(bedsit.status),
        index: index + 1,
    }));

    return (
        <Stack sx={{ width: { xs: '95%', md: '80%' }, mx: 'auto' }}>
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
