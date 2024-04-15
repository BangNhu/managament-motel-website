import useTokenData from '@/services/auth/token-data-loader';
import { Button, Modal, Stack } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
    ContractsResponse,
    useDeleteContractMutation,
    useGetContractsByLandLordQuery,
    useGetContractsByStaffQuery,
} from '@/services/contract.services';
import { startEditContract } from '@/slices/contract.slice';
import AddMotel from '../form-contract';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: '50%' },
    maxHeight: '80%',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: '4px 4px 16px rgba(0, 0, 0, 0.25)',
    p: 5,
};
const convertStatus = (endDay: string, liquidateDay: string) => {
    const currentDate = new Date();
    const end = new Date(endDay);
    const liquidate = new Date(liquidateDay);

    if (end >= currentDate) {
        const differenceInMilliseconds = end.getTime() - currentDate.getTime();
        const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
        return `Còn hạn (${differenceInDays} ngày)`;
    } else if (end < currentDate) {
        return 'Hết hạn';
    } else if (liquidate && liquidate <= currentDate) {
        return 'Đã thanh lý';
    } else {
        return 'Trạng thái không xác định';
    }
};
export interface IContractListProps {}

export function ContractList(props: IContractListProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        dispatch(startEditContract(0));
    };
    const tokenData = useTokenData();
    const [selectedMotelId, setSelectedMotelId] = useState<number | null>(null);
    const [deleteContract] = useDeleteContractMutation();
    // const { data: dataMotel } = useGetMotelsQuery();
    // console.log(dataMotel);

    const { data: dataContractLandlord } = useGetContractsByLandLordQuery(tokenData?.userID);
    console.log('dataMotelLandlord', dataContractLandlord);

    const { data: dataContractStaff } = useGetContractsByStaffQuery(tokenData?.userID);
    const [Contract, setContract] = useState<ContractsResponse | undefined>();
    useEffect(() => {
        if (tokenData?.userType === 'landlord') {
            setContract(dataContractLandlord as ContractsResponse);
        } else if (tokenData?.userType === 'staff') {
            setContract(dataContractStaff as ContractsResponse);
        }
    }, [dataContractLandlord, dataContractStaff, tokenData]);
    console.log('type', tokenData);
    console.log('first', Contract);
    //Danh sách nhà trọ
    const Contracts = Contract?.result || [];

    const dispatch = useDispatch();
    // const startEdit = (id: number) => {
    //     dispatch(startEditMotel(id));
    // };
    const handleDeleteContract = (id: number) => {
        deleteContract(id);
    };

    const columns: GridColDef[] = [
        { field: 'index', headerName: 'STT', width: 70 },
        { field: 'motel_name', headerName: 'Nhà trọ', width: 120 },
        { field: 'bedsit_name', headerName: 'Phòng', width: 80 },
        {
            field: 'start_day',
            headerName: 'Ngày bắt đầu',
            width: 130,
            type: 'Date',
            valueFormatter(params) {
                const date = new Date(params.value);
                const dateFormatter = new Intl.DateTimeFormat('en-GB').format(date);
                return dateFormatter;
            },
        },
        {
            field: 'end_day',
            headerName: 'Ngày kết thúc',
            width: 130,
            type: 'Date',
            valueFormatter(params) {
                const date = new Date(params.value);
                const dateFormatter = new Intl.DateTimeFormat('en-GB').format(date);
                return dateFormatter;
            },
        },
        { field: 'status', headerName: 'Trạng thái', width: 150 },
        { field: 'tenant_name', headerName: 'Khách trọ đại diện', width: 130 },

        {
            field: 'deposits',
            headerName: 'Tiền đặt cọc',
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
                            dispatch(startEditContract(params.row.id));
                            handleOpen();
                        }}
                    >
                        Sửa
                    </Button>
                    <Modal
                        open={open}
                        onClose={() => {
                            handleClose();
                            dispatch(startEditContract(0));
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
                        // onClick={() => handleDeleteMotel(params.row.id)}
                    >
                        Chi tiết
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ textTransform: 'capitalize' }}
                        onClick={() => handleDeleteContract(params.row.id)}
                    >
                        Xóa
                    </Button>
                </Stack>
            ),
        },
    ];

    const rows = Contracts.map((contract, index) => ({
        ...contract,
        id: contract.id,
        status: convertStatus(contract.end_day, contract.liquidate_day),
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
