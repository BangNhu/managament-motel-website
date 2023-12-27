import useTokenData from '@/services/auth/token-data-loader';

import { Button, Modal, Stack } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AddReceiptExpense from '../form-receipt-expense';
import { startEditReceiptExpense } from '@/slices/receipt-expense.slice';
import {
    ReceiptExpensesResponse,
    useDeleteReceiptExpenseMutation,
    useGetReceiptExpensesByLandLordQuery,
    useGetReceiptExpensesByStaffQuery,
} from '@/services/receipt-expense.services';

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

export interface IReceiptExpenseListProps {}

export function ReceiptExpenseList(props: IReceiptExpenseListProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        dispatch(startEditReceiptExpense(0));
    };
    const tokenData = useTokenData();
    const [selectedReceiptExpenseId, setSelectedReceiptExpenseId] = useState<number | null>(null);
    const [deleteReceiptExpense] = useDeleteReceiptExpenseMutation();
    // const { data: dataReceiptExpense } = useGetReceiptExpensesQuery();
    // console.log(dataReceiptExpense);

    const { data: dataReceiptExpenseLandlord } = useGetReceiptExpensesByLandLordQuery(
        tokenData?.userID
    );
    console.log('dataReceiptExpenseLandlord', dataReceiptExpenseLandlord);

    const { data: dataReceiptExpenseStaff } = useGetReceiptExpensesByStaffQuery(tokenData?.userID);
    const [ReceiptExpense, setReceiptExpense] = useState<ReceiptExpensesResponse | undefined>();
    useEffect(() => {
        if (tokenData?.userType === 'landlord') {
            setReceiptExpense(dataReceiptExpenseLandlord as ReceiptExpensesResponse);
        } else if (tokenData?.account_type === 'staff') {
            setReceiptExpense(dataReceiptExpenseStaff as ReceiptExpensesResponse);
        }
    }, [dataReceiptExpenseLandlord, dataReceiptExpenseStaff, tokenData]);
    console.log('type', tokenData);
    console.log('first', ReceiptExpense);
    //Danh sách nhà trọ
    const ReceiptExpenses = ReceiptExpense?.result || [];

    const dispatch = useDispatch();
    // const startEdit = (id: number) => {
    //     dispatch(startEditReceiptExpense(id));
    // };
    const handleDeleteReceiptExpense = (id: number) => {
        deleteReceiptExpense(id);
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
        {
            field: 'transaction_type',
            headerName: 'Loại giao dịch',
            width: 130,
            valueFormatter: (params: { value: number }) => {
                if (params.value === 0) return 'Phiếu thu';
                else return 'Phiếu chi';
            },
        },
        {
            field: 'date',
            headerName: 'Ngày lập phiếu',
            width: 130,
            type: 'Date',
            //xài format fns lại bị lỗi getStaticPaths
            valueFormatter: (params) => {
                const date = new Date(params.value);
                const formattedDate = new Intl.DateTimeFormat('en-GB').format(date);
                return formattedDate;
            },
        },
        { field: 'monney', headerName: 'Số tiền', width: 130 },
        {
            field: 'reason',
            headerName: 'Lý do lập phiếu',
            width: 200,
        },
        {
            field: 'motel_name',
            headerName: 'Nhà trọ',

            width: 160,
        },

        // { field: 'staff_name', headerName: 'Nhân viên', width: 130 },
        {
            field: 'actions',
            headerName: '',
            width: 150,
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams) => (
                <Stack direction="row" spacing={1}>
                    <Button
                        variant="outlined"
                        sx={{ textTransform: 'capitalize' }}
                        onClick={() => {
                            dispatch(startEditReceiptExpense(params.row.id));
                            handleOpen();
                        }}
                    >
                        Sửa
                    </Button>
                    <Modal
                        open={open}
                        onClose={() => {
                            handleClose();
                            dispatch(startEditReceiptExpense(0));
                            // setSelectedReceiptExpenseId(null); // Đặt lại giá trị của selectedReceiptExpenseId khi đóng Modal
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
                            <AddReceiptExpense
                                handleCloseModal={() => {
                                    handleClose();
                                    setSelectedReceiptExpenseId(null);
                                }}
                            />
                        </Stack>
                    </Modal>

                    <Button
                        variant="outlined"
                        sx={{ textTransform: 'capitalize' }}
                        onClick={() => handleDeleteReceiptExpense(params.row.id)}
                    >
                        Xóa
                    </Button>
                </Stack>
            ),
        },
    ];

    const rows = ReceiptExpenses.map((ReceiptExpense, index) => ({
        ...ReceiptExpense,
        id: ReceiptExpense.id,
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
