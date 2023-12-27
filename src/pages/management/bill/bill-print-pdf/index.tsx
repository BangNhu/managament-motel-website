import { Button, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import * as React from 'react';
import { saveAs } from 'file-saver';
import { SimpleLayout } from '@/components/common/layout/main/simple-layout';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
    useGetBillsOldNewQuery,
    useGetBillsPriceBedsitQuery,
    useGetBillsServiceBedsitQuery,
} from '@/services/bill.services';
export interface IBillPrintPDFProps {}
const tileHeaderTable = [
    'Tên chi phí',
    'Đơn giá',
    'Số mới',
    'Số cũ',
    'Đơn vị tính',
    'Số dùng',
    'Thành tiền',
];
export default function BillPrintPDF(props: IBillPrintPDFProps) {
    const bedsitId = useSelector((state: RootState) => state.bedsit.id);
    const { data: dataElectricWater } = useGetBillsOldNewQuery(bedsitId);
    const { data: dataServiceBedsit } = useGetBillsServiceBedsitQuery(bedsitId);
    const { data: dataPriceBedsit } = useGetBillsPriceBedsitQuery(bedsitId);
    //Lấy tháng năm hiện tại bỏ xuống Typography cho người dùng biết thời gian thêm
    const currentDate: Date = new Date();

    const currentDay: number = currentDate.getDate();
    const currentMonth: number = currentDate.getMonth() + 1; // Lưu ý: getMonth trả về index từ 0 đến 11
    const currentYear: number = currentDate.getFullYear();
    const formattedDate: string = `${currentDay.toString().padStart(2, '0')}/${currentMonth
        .toString()
        .padStart(2, '0')}/${currentYear}`; //đảm bảo có 2 số với padStart (ex: 03)
    let token: string | null;

    if (typeof window !== 'undefined') {
        token = window.localStorage.getItem('token');
    }
    const handleSubmit = async (e: { preventDefault: () => void }) => {};
    return (
        <Stack
            sx={{
                borderRadius: '8px',
                padding: '2% 5%',
            }}
        >
            <Stack>
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: '22px',
                        fontFamily: 'Verdana',
                        marginBottom: { xs: '10px', md: '20px' },
                        textAlign: 'center',
                        color: '#1c1c1c',
                        fontWeight: 600,
                        // textTransform: 'uppercase',
                    }}
                >
                    Lập hóa đơn
                </Typography>
                <Divider
                    sx={{
                        margin: '0 0 5% 0',
                        border: '1px solid #1c1c1c',
                        // width: { xs: '100%', sm: '80%' },
                        // textAlign: 'center',
                        // mx: 'auto',
                    }}
                />
            </Stack>
            <Stack direction="row" sx={{ gap: '10px' }}>
                <Stack
                    sx={{
                        border: '2px solid #1c1c1c',
                        width: '300px',
                        height: '40px',
                        borderRadius: '8px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 1,
                        marginBottom: '30px',
                        color: '#2f2f3a',
                    }}
                >
                    <Typography>
                        NGÀY LẬP HÓA ĐƠN:{' '}
                        <Typography component="span" sx={{ fontWeight: 'bold', color: '#1c1c1c' }}>
                            {formattedDate}
                        </Typography>
                    </Typography>
                </Stack>
                <Stack
                    sx={{
                        border: '2px solid #0b3944',
                        width: '120px',
                        height: '40px',
                        borderRadius: '8px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 1,
                        marginBottom: '30px',
                        color: '#2f2f3a',
                    }}
                >
                    <Typography>
                        PHÒNG:{' '}
                        <Typography component="span" sx={{ fontWeight: 'bold', color: '#1c1c1c' }}>
                            3
                        </Typography>
                    </Typography>
                </Stack>
            </Stack>
            <Typography sx={{ fontWeight: 'bold', fontSize: '17px', marginBottom: '10px' }}>
                Bảng Điện Nước
            </Typography>
            <TableContainer component={Paper}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '17px', margin: '10px 0' }}>
                    Thông tin chỉ số điện nước
                </Typography>
                <Table sx={{ border: '1px solid #1c1c1c' }}>
                    <TableHead
                        sx={{
                            backgroundColor: '#a48e8e',
                        }}
                    >
                        <TableRow>
                            {tileHeaderTable.map((item, index) => (
                                <TableCell key={index} sx={{ fontWeight: 'bold', color: '#fff' }}>
                                    {item}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Điện</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Nước</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography sx={{ fontWeight: 'bold', fontSize: '17px', margin: '10px 0' }}>
                Bảng Dịch Vụ
            </Typography>
            <Stack sx={{ border: '1px solid #1c1c1c' }}>
                <Stack
                    direction="row"
                    sx={{
                        bgcolor: '#a48e8e',
                        color: '#fff',
                        height: '50px',

                        alignItems: 'center',
                    }}
                >
                    <Typography sx={{ width: '20%' }}>Tên chi phí</Typography>
                    <Typography sx={{ width: '20%' }}>Đơn giá</Typography>
                    <Typography sx={{ width: '20%' }}>Đơn vị tính</Typography>
                    <Typography sx={{ width: '30%' }}>Số lượng</Typography>
                    <Typography sx={{}}>Thành tiền</Typography>
                </Stack>
                <Stack
                    direction="row"
                    sx={{ bgcolor: '#ffffff', color: '#1c1c1c', margin: '10px 0' }}
                >
                    <Typography sx={{ width: '20%' }}>Wifi</Typography>
                    <Typography sx={{ width: '20%' }}>30000</Typography>
                    <Typography sx={{ width: '20%' }}>Theo số lượng</Typography>
                    <Stack>
                        <Typography sx={{ width: '30%' }}>2</Typography>
                    </Stack>

                    <Typography sx={{}}>60000</Typography>
                </Stack>{' '}
                <Stack
                    direction="row"
                    sx={{ bgcolor: '#ffffff', color: '#1c1c1c', margin: '10px 0' }}
                >
                    <Typography sx={{ width: '20%' }}>An ninh</Typography>
                    <Typography sx={{ width: '20%' }}>10000</Typography>
                    <Typography sx={{ width: '20%' }}>Theo tháng</Typography>
                    <Typography sx={{ width: '30%' }}></Typography>
                    <Typography sx={{}}>10000</Typography>
                </Stack>{' '}
                <Stack
                    direction="row"
                    sx={{ bgcolor: '#ffffff', color: '#1c1c1c', margin: '10px 0' }}
                >
                    <Typography sx={{ width: '20%' }}>Rác</Typography>
                    <Typography sx={{ width: '20%' }}>10000</Typography>
                    <Typography sx={{ width: '20%' }}>Theo tháng</Typography>
                    <Typography sx={{ width: '30%' }}></Typography>
                    <Typography sx={{}}>10000</Typography>
                </Stack>
            </Stack>
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                justifyContent="space-between"
                sx={{ margin: '20px 0 5px 0' }}
            >
                <Typography sx={{}}>Tiền phòng</Typography>
                <Typography sx={{}}>800000</Typography>
            </Stack>
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                justifyContent="space-between"
                sx={{ margin: '5px 0' }}
            >
                <Typography sx={{}}>Chi phí phát sinh</Typography>
                <Typography sx={{}}>0</Typography>
            </Stack>{' '}
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                justifyContent="space-between"
                sx={{ margin: '5px 0' }}
            >
                <Typography sx={{}}>Nợ cũ</Typography>
                <Typography sx={{}}>0</Typography>
            </Stack>{' '}
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                justifyContent="space-between"
                sx={{ margin: '5px 0' }}
            >
                <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Tổng cộng</Typography>
                <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>1027500</Typography>
            </Stack>
        </Stack>
    );
}
BillPrintPDF.Layout = SimpleLayout;
