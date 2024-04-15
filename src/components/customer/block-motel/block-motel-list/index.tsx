import useTokenData from '@/services/auth/token-data-loader';
import { useDeleteMotelMutation, useGetMotelsByLandLordQuery } from '@/services/motel.services';
import { startEditMotel } from '@/slices/motel.slice';
import { Button, Modal, Stack } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AddMotel from '../form-block-motel';
import { startEditBlockMotel } from '@/slices/block-motel.slice';
import {
    BlockMotelsResponse,
    useDeleteBlockMotelMutation,
    useGetBlockMotelsByLandLordQuery,
    useGetBlockMotelsByStaffQuery,
} from '@/services/block-motel.services';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: '50%' },
    maxHeight: '90%',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: '4px 4px 16px rgba(0, 0, 0, 0.25)',
    p: 5,
};

export interface IBlockMotelListProps {}

export function BlockMotelList(props: IBlockMotelListProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        dispatch(startEditBlockMotel(0));
    };
    const tokenData = useTokenData();
    const [selectedMotelId, setSelectedMotelId] = useState<number | null>(null);
    const [deletePost] = useDeleteBlockMotelMutation();
    // const { data: dataMotel } = useGetMotelsQuery();
    // console.log(dataMotel);

    const { data: dataBlockMotelLandlord } = useGetBlockMotelsByLandLordQuery(tokenData?.userID);
    console.log('dataMotelLandlord', dataBlockMotelLandlord);

    const { data: dataBlockMotelStaff } = useGetBlockMotelsByStaffQuery(tokenData?.userID);
    const [blockMotel, setBlockMotel] = useState<BlockMotelsResponse | undefined>();
    useEffect(() => {
        if (tokenData?.userType === 'landlord') {
            setBlockMotel(dataBlockMotelLandlord as BlockMotelsResponse);
        } else if (tokenData?.userType === 'staff') {
            console.log('đúng rồi');
            setBlockMotel(dataBlockMotelStaff as BlockMotelsResponse);
        }
    }, [tokenData, dataBlockMotelStaff, dataBlockMotelLandlord]);
    console.log('type', tokenData);
    console.log('first', blockMotel);
    //Danh sách nhà trọ
    const blockMotels = blockMotel?.result || [];

    const dispatch = useDispatch();
    // const startEdit = (id: number) => {
    //     dispatch(startEditMotel(id));
    // };
    const handleDeleteMotel = (id: number) => {
        deletePost(id);
    };

    const columns: GridColDef[] = [
        { field: 'index', headerName: 'STT', width: 70 },
        { field: 'block_motel_name', headerName: 'Tên dãy trọ', width: 130 },
        { field: 'motel_id', headerName: 'Tên nhà trọ', width: 130 },
        {
            field: 'max_quantity',
            headerName: 'Số lượng tối đa',
            type: 'number',
            width: 90,
        },
        {
            field: 'price',
            headerName: 'Giá phòng',
            type: 'number',
            width: 90,
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
    const rows = blockMotels.map((motel, index) => ({
        ...motel,
        index: index + 1, // Bắt đầu từ số 1
    }));
    return (
        <Stack sx={{ width: { xs: '95%', md: '80%' }, mx: 'auto' }}>
            <DataGrid
                rows={rows} // Cast blockMotels to the expected type
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
