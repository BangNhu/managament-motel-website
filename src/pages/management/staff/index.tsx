import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CSVLink, CSVDownload } from 'react-csv';
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
import { useGetMotelsQuery } from '@/services/motel.services';
import { MotelList } from '@/components/customer/motel/motel-list';
import AddMotel from '@/components/customer/motel/form-motel';
import useTokenData from '@/services/auth/token-data-loader';
import { StaffList } from '@/components/customer/staff/staff-list';
import FormDecentralize from '@/components/customer/staff/decentral';

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
export interface IManageStaffProps {}

export default function ManageStaff(props: IManageStaffProps) {
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
                    <Stack sx={style}> {<FormDecentralize handleCloseModal={handleClose} />}</Stack>
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
            <StaffList />
        </Stack>
    );
}
