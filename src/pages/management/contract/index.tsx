import { ManagementLayout } from '@/components/common/layout/management';
import { BedsitList } from '@/components/customer/bedsit';
import { ContractList } from '@/components/customer/contract';
import AddContract from '@/components/customer/contract/form-contract';
import AddMotel from '@/components/customer/motel/form-motel';
import useTokenData from '@/services/auth/token-data-loader';
import { useGetMotelsQuery } from '@/services/motel.services';
import { Button, Modal, Stack } from '@mui/material';
import { useState } from 'react';
import { CSVLink } from 'react-csv';

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
export interface IManageContractProps {}

export default function ManageContract(props: IManageContractProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [dataExport, setDataExport] = useState<any[][]>([]);
    const { data } = useGetMotelsQuery();
    // console.log('data redux tookit', data);

    const tokenData = useTokenData();
    const { data: dataMotel } = useGetMotelsQuery();
    const motels = dataMotel?.result || [];
    // console.log(tokenData);
    // if (tokenData?.userType === 'landlord') {
    //     console.log('hi Như');
    // }
    const csvData = [
        ['firstname', 'lastname', 'email'],
        ['Ahmed', 'Tomi', 'ah@smthing.co.com'],
        ['Raed', 'Labes', 'rl@smthing.co.com'],
        ['Yezzi', 'Min l3b', 'ymin@cocococo.com'],
    ];
    const listMotel = motels.map((motel, index) => ({
        ...motel,
        index: index + 1, // Bắt đầu từ số 1
    }));
    const getMotelsExport = (event: any, done: () => void): void => {
        let result: any[] = [];

        if (listMotel && listMotel.length > 0) {
            result.push(['STT', 'Tên nhà trọ', 'Địa chỉ', 'Ngày chốt', 'Ngày tính', 'Nhân viên']);

            listMotel.map((motel, index) => {
                let arr: any[] = [];
                arr[0] = index + 1;
                arr[1] = motel.motel_name;
                // Assuming `motel.address` is the address property of the Motel interface
                arr[2] = motel.address;
                arr[3] = motel.record_day;
                arr[4] = motel.pay_day;
                arr[5] = motel.staff_name;
                result.push(arr);
            });

            setDataExport(result);
            done();
        }
    };
    return (
        <Stack
            sx={{
                width: {
                    xs: '100%',
                    md: '80%',
                },
                mx: 'auto',
                margin: { xs: '20% auto', md: '6% auto 0 auto ' },
                gap: { xs: '10px', md: '20px' },
            }}
        >
            <Stack direction="row" sx={{ justifyContent: 'end', gap: '20px' }}>
                <Button
                    variant="contained"
                    onClick={handleOpen}
                    sx={{ textTransform: 'capitalize' }}
                >
                    Thêm mới
                </Button>
                <Modal
                    open={open}
                    // onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Stack sx={style}> {<AddContract handleCloseModal={handleClose} />}</Stack>
                </Modal>
                <Button
                    // variant="contained"
                    sx={{
                        textTransform: 'capitalize',
                        bgcolor: '#188123',
                        color: '#fff',
                        '&.MuiButton-root:hover': {
                            backgroundColor: '#115818',
                        },
                    }}
                >
                    <CSVLink
                        data={dataExport}
                        filename={'danh-sach-nha-tro.csv'}
                        className="btn btn-primary"
                        target="_blank"
                        asyncOnClick={true}
                        onClick={getMotelsExport}
                        style={{ color: '#fff', textDecoration: 'none' }}
                    >
                        Xuất Excel
                    </CSVLink>
                </Button>
            </Stack>
            {/* <AddMotel /> */}
            <ContractList />
        </Stack>
    );
}
ManageContract.Layout = ManagementLayout;
