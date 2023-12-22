import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
    Alert,
    Button,
    CircularProgress,
    Grid,
    Modal,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { SimpleLayout } from '@/components/common/layout/main/simple-layout';
import { checkToken } from '@/services/auth/check-token';
import {
    useAddMotelsMutation,
    useDeleteMotelMutation,
    useGetMotelsByLandLordQuery,
    useGetMotelsQuery,
} from '@/services/motel.services';
import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
    GridValueGetterParams,
} from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';
import { startEditMotel } from '@/slices/motel.slice';
import { useGetStaffQuery } from '@/services/staff.services';
import AddMotel from '../form-motel';
import useTokenData from '@/services/auth/token-data-loader';

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

const GreyBackdrop = () => {
    return <Stack style={{ backgroundColor: 'rgba(169, 169, 169, 0.5)', zIndex: 1300 }} />;
};
export interface IMotelListProps {}

export function MotelList(props: IMotelListProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        dispatch(startEditMotel(0));
    };
    const tokenData = useTokenData();
    const [selectedMotelId, setSelectedMotelId] = useState<number | null>(null);
    const [deletePost] = useDeleteMotelMutation();
    // const { data: dataMotel } = useGetMotelsQuery();
    // console.log(dataMotel);
    const { data: dataMotelLandlord } = useGetMotelsByLandLordQuery(tokenData?.userID);
    console.log('dataMotelLandlord', dataMotelLandlord);
    //Danh sách nhà trọ
    const motels = dataMotelLandlord?.result || [];

    const dispatch = useDispatch();
    // const startEdit = (id: number) => {
    //     dispatch(startEditMotel(id));
    // };
    const handleDeleteMotel = (id: number) => {
        deletePost(id);
    };

    const columns: GridColDef[] = [
        { field: 'index', headerName: 'STT', width: 70 },
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
                            dispatch(startEditMotel(params.row.id));
                            handleOpen();
                        }}
                    >
                        Sửa
                    </Button>
                    <Modal
                        open={open}
                        onClose={() => {
                            handleClose();
                            dispatch(startEditMotel(0));
                            // setSelectedMotelId(null); // Đặt lại giá trị của selectedMotelId khi đóng Modal
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
                            <AddMotel
                                handleCloseModal={() => {
                                    handleClose();
                                    setSelectedMotelId(null);
                                }}
                            />
                        </Stack>
                    </Modal>
                    <Button
                        variant="outlined"
                        sx={{ textTransform: 'capitalize' }}
                        onClick={() => handleDeleteMotel(params.row.id)}
                    >
                        Chi tiết
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ textTransform: 'capitalize' }}
                        onClick={() => handleDeleteMotel(params.row.id)}
                    >
                        Xóa
                    </Button>
                </Stack>
            ),
        },
    ];
    const rows = motels.map((motel, index) => ({
        ...motel,
        index: index + 1, // Bắt đầu từ số 1
    }));
    return (
        <Stack sx={{ width: { xs: '95%', md: '80%' }, mx: 'auto' }}>
            <DataGrid
                rows={rows} // Cast motels to the expected type
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

                        borderRadius: '8px', // Độ bo tròn các góc
                        fontSize: '14px',
                        border: '1px solid #1c1c1c',
                    },
                    '& .MuiDataGrid-main': {
                        // backgroundColor: '#e7e6e6', // Màu nền của DataGrid

                        borderRadius: '8px', // Độ bo tròn các góc
                        fontSize: '14px',
                        border: '1px solid #1c1c1c',
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
