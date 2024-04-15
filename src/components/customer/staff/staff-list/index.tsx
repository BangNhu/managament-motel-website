import useTokenData from '@/services/auth/token-data-loader';
import { useDeleteStaffMutation, useGetStaffsByLandlordQuery } from '@/services/staff.services';
import { startEditStaff } from '@/slices/staff.slice';
import { Button, Modal, Stack } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import FormStaff from '../form-staff';
import FormDecentralize from '../decentral';

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

export interface IStaffListProps {}

export default function StaffList(props: IStaffListProps) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };
    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => {
        setOpenEdit(false);
    };
    const tokenData = useTokenData();
    const [deletePost] = useDeleteStaffMutation();
    // console.log(dataMotel);
    const { data: dataStaff } = useGetStaffsByLandlordQuery(tokenData?.userID);
    console.log('dataStaff', dataStaff);
    //Danh sách nhà trọ
    const staffs = dataStaff?.result || [];

    const handleDeleteMotel = (id: number) => {
        deletePost(id);
    };

    const columns: GridColDef[] = [
        { field: 'index', headerName: 'STT', width: 70 },
        { field: 'staff_name', headerName: 'Tên nhân viên', width: 130 },
        { field: 'citizen_identification', headerName: 'CCCD', width: 130 },
        { field: 'address', headerName: 'Địa chỉ', width: 130 },
        { field: 'number_phone', headerName: 'Số điện thoại', width: 130 },
        { field: 'email', headerName: 'Email', width: 130 },
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
        {
            field: 'actions',
            headerName: '',
            width: 400,
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams) => (
                <Stack direction="row" spacing={1}>
                    <Button
                        variant="outlined"
                        sx={{ textTransform: 'capitalize' }}
                        onClick={() => {
                            dispatch(startEditStaff(params.row.id));
                            handleOpen();
                        }}
                    >
                        Phân quyền
                    </Button>
                    <Modal
                        open={open}
                        onClose={() => {
                            handleClose();
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
                            <FormDecentralize
                                handleCloseModal={() => {
                                    handleClose();
                                }}
                            />
                        </Stack>
                    </Modal>
                    <Button
                        variant="outlined"
                        sx={{ textTransform: 'capitalize' }}
                        onClick={() => {
                            dispatch(startEditStaff(params.row.id));
                            handleOpenEdit();
                        }}
                    >
                        Sửa
                    </Button>
                    <Modal
                        open={openEdit}
                        onClose={() => {
                            handleCloseEdit();
                            dispatch(startEditStaff(0));
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
                            <FormStaff
                                handleCloseModal={() => {
                                    handleCloseEdit();
                                }}
                            />
                        </Stack>
                    </Modal>
                    {/* <Button
                        variant="outlined"
                        sx={{ textTransform: 'capitalize' }}
                        // onClick={() => handleDeleteMotel(params.row.id)}
                    >
                        Sửa
                    </Button> */}

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
    const rows = staffs.map((staff, index) => ({
        ...staff,
        index: index + 1, // Bắt đầu từ số 1
    }));
    return (
        //Để 98% cho nó có thanh scroll
        <Stack sx={{ width: { xs: '95%', md: '98%' }, mx: 'auto' }}>
            <DataGrid
                rows={rows} // Cast staffs to the expected type
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
