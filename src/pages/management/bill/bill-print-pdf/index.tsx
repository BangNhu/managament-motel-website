import { Button, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { saveAs } from 'file-saver';
import { SimpleLayout } from '@/components/common/layout/main/simple-layout';
export interface IBillPrintPDFProps {}

export default function BillPrintPDF(props: IBillPrintPDFProps) {
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
                // width: { xs: '90%', md: '50%' },
                // // margin: { xs: '20% auto', md: '10% auto 0 auto ' },
                // mx: 'auto',
                borderRadius: '8px',
                // border: '2px solid #1c1c1c',
                padding: '2% 5%',
                // boxShadow: '4px 4px 16px rgba(0, 0, 0, 0.25)',
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
                    <Typography sx={{ width: '15%' }}>Tên chi phí</Typography>
                    <Typography sx={{ width: '15%' }}>Đơn giá</Typography>
                    <Typography sx={{ width: '15%' }}>Số mới</Typography>
                    <Typography sx={{ width: '15%' }}>Số cũ</Typography>
                    <Typography sx={{ width: '15%' }}>Đơn vị tính</Typography>
                    <Typography sx={{ width: '15%' }}>Số dùng</Typography>
                    <Typography>Thành tiền</Typography>
                </Stack>
                <Stack
                    direction="row"
                    sx={{ bgcolor: '#ffffff', color: '#1c1c1c', margin: '10px 0' }}
                >
                    <Typography sx={{ width: '15%' }}>Điện</Typography>
                    <Typography sx={{ width: '15%' }}>3500</Typography>
                    <Typography sx={{ width: '15%' }}>225</Typography>
                    <Typography sx={{ width: '15%' }}>200</Typography>
                    <Typography sx={{ width: '15%' }}>đ/kWh</Typography>
                    <Typography sx={{ width: '15%' }}>25</Typography>
                    <Typography>87500</Typography>
                </Stack>{' '}
                <Stack
                    direction="row"
                    sx={{ bgcolor: '#ffffff', color: '#1c1c1c', margin: '10px 0' }}
                >
                    <Typography sx={{ width: '15%' }}>Nước</Typography>
                    <Typography sx={{ width: '15%' }}>10000</Typography>
                    <Typography sx={{ width: '15%' }}>1278</Typography>
                    <Typography sx={{ width: '15%' }}>1272</Typography>
                    <Typography sx={{ width: '15%' }}>đ/khối</Typography>
                    <Typography sx={{ width: '15%' }}>6</Typography>
                    <Typography>60000</Typography>
                </Stack>
            </Stack>
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
