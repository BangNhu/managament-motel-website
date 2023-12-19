import useTokenData from '@/services/auth/token-data-loader';
import { useDeleteMotelMutation, useGetMotelsByLandLordQuery } from '@/services/motel.services';
import { startEditMotel } from '@/slices/motel.slice';
import { Button, Modal, Stack } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import AddMotel from '../form-block-motel';

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

    // const columns: GridColDef[] = [
    //     { field: 'id', headerName: 'ID', width: 70 },
    //     { field: 'firstName', headerName: 'First name', width: 130 },
    //     { field: 'lastName', headerName: 'Last name', width: 130 },
    //     {
    //         field: 'age',
    //         headerName: 'Age',
    //         type: 'number',
    //         width: 90,
    //     },
    //     {
    //         field: 'fullName',
    //         headerName: 'Full name',
    //         description: 'This column has a value getter and is not sortable.',
    //         sortable: false,
    //         width: 160,
    //         valueGetter: (params: GridValueGetterParams) =>
    //             `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    //     },
    // ];
    // const rows = [
    //     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    //     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    //     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    //     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    //     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    //     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    //     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    //     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    //     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    // ];
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
