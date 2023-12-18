import { Grid, Stack, Typography } from '@mui/material';
import * as React from 'react';

export interface IFeatureProps {}

export function Feature(props: IFeatureProps) {
    const data = [
        {
            icons: '/icons/icons8-bill-64.png',
            title: 'Quản lý hóa đơn',
            content: 'Quản lý hóa đơn thu tiền hằng tháng, các khoản như điện, nước, dịch vụ..',
        },
        {
            icons: '/icons/icons8-multicultural-people-64.png',
            title: 'Quản lý khách trọ',
            content: 'Quản lý thông tin cá nhân, cập nhật thông tin liên hệ, khai báo tạm trú.',
        },
        {
            icons: '/icons/icons8-print-64.png',
            title: 'In hợp đồng, hóa đơn',
            content:
                'In hợp đồng, đơn tạm trú, hóa đơn hàng tháng một cách nhanh chóng và tiện lợi.',
        },
        {
            icons: '/icons/icons8-light-64.png',
            title: 'Quản lý điện nước',
            content: 'Quản lý số điện nước của phòng theo tháng, tự động tính toán tiền phải trả.',
        },
        {
            icons: '/icons/icons8-receipt-64.png',
            title: 'Quản lý thu chi',
            content: 'Quản lý các khoản chi của nhà trọ, sau đó tổng hợp báo cáo số tiền thu chi.',
        },
        {
            icons: '/icons/icons8-room-64.png',
            title: 'Quản lý phòng trọ',
            content: 'Quản lý phòng theo từng khu, tiền phòng, các dịch vụ sử dụng.',
        },
        {
            icons: '/icons/icons8-wifi-64.png',
            title: 'Quản lý dịch vụ',
            content: 'Quản lý dịch vụ theo từng phòng, thông tin cần thiết tương ứng từng dịch vụ.',
        },
        {
            icons: '/icons/icons8-contract-64.png',
            title: 'Quản lý hợp đồng',
            content: 'Quản lý thông tin hợp đồng, các dịch vụ sử dụng, khách trọ,  tiền đặt cọc.',
        },
        {
            icons: '/icons/icons8-setting-64.png',
            title: 'Cấu hình, thống kê',
            content: 'Cho phép cấu hình các mức giá, thống kê phòng, khách trọ, chi tiêu.',
        },
        // {
        //     icons: '/icons/',
        //     title: '',
        //     content: '.',
        // },
    ];
    return (
        // fontSize: { xs: '30px', sm: '35px', md: '40px' },
        // // textTransform: 'uppercase',
        // fontFamily: '"Verdana", sans-serif',
        // color: '#A61713',
        // fontWeight: 'bold',
        <Stack sx={{}}>
            <Stack sx={{ width: { xs: '95%', md: '80%' }, mx: 'auto', my: '5%' }}>
                <Stack sx={{ textAlign: 'center', gap: { xs: '15px', md: '30px' } }}>
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: '22px', md: '28px' },
                            fontFamily: '"Verdana", sans-serif',
                            color: '#1c1c1c',
                            fontWeight: 'bold',
                        }}
                    >
                        Các tính năng của{' '}
                        <Typography
                            component="span"
                            sx={{
                                fontSize: { xs: '22px', md: '28px' },
                                fontFamily: '"Verdana", sans-serif',
                                color: '#A61713',
                                fontWeight: 'bold',
                            }}
                        >
                            NhuTK
                        </Typography>
                    </Typography>
                    <Typography>
                        Giao diện đơn giản và thông minh, giúp quản lý nhà trọ mọi lúc mọi nơi với
                        đảm bảo an toàn tuyệt đối cho dữ liệu.{' '}
                        <Typography component="span">
                            Kiểm soát doanh số theo thời gian thực và tối ưu hóa chi phí vận hành.
                        </Typography>
                    </Typography>
                    <Stack>
                        <Grid
                            container
                            // spacing={2}
                            sx={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: { xs: '20px', md: '30px' },
                                my: '20px',
                            }}
                        >
                            {data?.map((item, index) => (
                                <Grid
                                    item
                                    md={3}
                                    sm={6}
                                    xs={12}
                                    key={index}
                                    sx={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: { xs: '5%', md: '2%' },
                                        borderRadius: '8px',
                                        bgcolor: '#fff',
                                    }}
                                >
                                    <Stack sx={{ gap: { xs: '10px', md: '10px' } }}>
                                        <Stack
                                            sx={{
                                                border: '2px solid #a61713',
                                                borderRadius: '50%',
                                                width: '70px',
                                                height: '70px',
                                                position: 'relative',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mx: 'auto',
                                            }}
                                        >
                                            <Stack
                                                position="absolute"
                                                component={'img'}
                                                src={item.icons}
                                                sx={{
                                                    width: '50px',
                                                    height: '50px',
                                                }}
                                            />
                                        </Stack>
                                        <Typography sx={{ fontWeight: 'bold' }}>
                                            {item.title}
                                        </Typography>
                                        <Typography sx={{ fontSize: '14px' }}>
                                            {item.content}
                                        </Typography>
                                    </Stack>
                                </Grid>
                            ))}
                        </Grid>
                        <Typography
                            sx={{
                                color: '#1c1c1c',
                                fontWeight: 'bold',
                                fontSize: { xs: '18px', md: '20px' },
                            }}
                        >
                            Và còn nhiều tính năng khác.
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
}
