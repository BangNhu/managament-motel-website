import useTokenData from '@/services/auth/token-data-loader';
import { useDeleteMotelMutation, useGetMotelsByLandLordQuery } from '@/services/motel.services';
import { startEditMotel } from '@/slices/motel.slice';
import { Button, Modal, Stack } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AddMotel from '../form-bedsit';
import { startEditBedsit } from '@/slices/bedsit.slice';
import {
    BedsitsResponse,
    useDeleteBedsitMutation,
    useGetBedsitsByLandLordQuery,
    useGetBedsitsByStaffQuery,
} from '@/services/bedsit.services';

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

export interface IBedsitListProps {}

export function BedsitList(props: IBedsitListProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        dispatch(startEditBedsit(0));
    };
    const tokenData = useTokenData();
    const [selectedMotelId, setSelectedMotelId] = useState<number | null>(null);
    const [deletePost] = useDeleteBedsitMutation();
    // const { data: dataMotel } = useGetMotelsQuery();
    // console.log(dataMotel);

    const { data: dataBedsitLandlord } = useGetBedsitsByLandLordQuery(tokenData?.userID);
    console.log('dataMotelLandlord', dataBedsitLandlord);

    const { data: dataBedsitStaff } = useGetBedsitsByStaffQuery(tokenData?.userID);
    const [Bedsit, setBedsit] = useState<BedsitsResponse | undefined>();
    useEffect(() => {
        if (tokenData?.userType === 'landlord') {
            setBedsit(dataBedsitLandlord as BedsitsResponse);
        } else if (tokenData?.account_type === 'staff') {
            setBedsit(dataBedsitStaff as BedsitsResponse);
        }
    }, [dataBedsitLandlord, dataBedsitStaff, tokenData]);
    console.log('type', tokenData);
    console.log('first', Bedsit);
    //Danh sách nhà trọ
    const Bedsits = Bedsit?.result || [];

    const dispatch = useDispatch();
    // const startEdit = (id: number) => {
    //     dispatch(startEditMotel(id));
    // };
    const handleDeleteMotel = (id: number) => {
        deletePost(id);
    };
    const convertStatus = (status: string) => {
        if (status === '0') {
            return 'Đang trống';
        } else if (status === '1') {
            return 'Đã thuê';
        } else if (status === '2') {
            return 'Đang đặt cọc';
        } else {
            return 'Trạng thái không xác định';
        }
    };
    const columns: GridColDef[] = [
        { field: 'index', headerName: 'STT', width: 70 },
        { field: 'bedsit_name', headerName: 'Tên phòng trọ', width: 130 },
        { field: 'motel_name', headerName: 'Thuộc nhà trọ', width: 130 },
        { field: 'block_motel_name', headerName: 'Thuộc dãy trọ', width: 130 },
        {
            field: 'status',
            headerName: 'Trạng thái',
            width: 150,
        },
        {
            field: 'current_quantity',
            headerName: 'Số người ở',
            type: 'number',
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

    const rows = Bedsits.map((bedsit, index) => ({
        ...bedsit,
        id: bedsit.id,
        status: convertStatus(bedsit.status.toString()),
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
