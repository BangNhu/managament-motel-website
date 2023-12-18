import { Button, Stack, Typography } from '@mui/material';
import * as React from 'react';
import DoneIcon from '@mui/icons-material/Done';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
export interface IPriceTableProps {}

export function PriceTable(props: IPriceTableProps) {
    const data = [
        {
            name: 'Dùng thử',
            price: 'Miễn phí',
            content: [
                { detail: 'Quy mô tối đa 50 phòng' },
                { detail: 'Dùng thử trong 30 ngày' },
                { detail: 'Hỗ trợ 24/7' },
            ],
        },
        {
            name: 'Cơ bản',
            price: '150.000đ',
            month: '/tháng',
            content: [
                { detail: 'Quy mô tối đa 30 phòng' },
                { detail: 'Nâng cấp, cập nhật tính năng phần mềm quản lý nhà trọ miễn phí' },
                { detail: 'Hỗ trợ 24/7' },
            ],
        },
        {
            name: 'Vip 1',
            price: '350.000',
            month: '/tháng',
            content: [
                { detail: 'Quy mô tối đa 60 phòng' },
                { detail: 'Nâng cấp, cập nhật tính năng phần mềm quản lý nhà trọ miễn phí' },
                { detail: 'Phân quyền nhân viên' },
                { detail: 'Hỗ trợ 24/7' },
            ],
        },
        {
            name: 'Vip 2',
            price: '700.000',
            month: '/tháng',
            content: [
                { detail: 'Quy mô tối đa 100 phòng' },
                { detail: 'Nâng cấp, cập nhật tính năng phần mềm quản lý nhà trọ miễn phí' },
                { detail: 'Phân quyền nhân viên' },
                { detail: 'Hỗ trợ 24/7' },
            ],
        },
    ];
    return (
        // fontSize: { xs: '30px', sm: '35px', md: '40px' },
        // // textTransform: 'uppercase',
        // fontFamily: '"Verdana", sans-serif',
        // color: '#A61713',
        // fontWeight: 'bold',
        <Stack sx={{ bgcolor: '#faf8f8' }}>
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
                        <Typography
                            component="span"
                            sx={{
                                fontSize: { xs: '22px', md: '28px' },
                                fontFamily: '"Verdana", sans-serif',
                                color: '#A61713',
                                fontWeight: 'bold',
                                // fontStyle: 'italic',
                            }}
                        >
                            NhuTK
                        </Typography>{' '}
                        có nhiều mức giá cho bạn lựa chọn{' '}
                    </Typography>
                    <Typography>
                        Hãy cùng trải nghiệm phần mềm NhuTK. Chúng tôi luôn hỗ trợ bạn 24/7.
                    </Typography>
                    <Stack>
                        <Stack
                            direction={{ xs: 'column', md: 'row' }}
                            sx={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: { xs: '20px', md: '2%' },
                                my: '20px',
                            }}
                        >
                            {data?.map((item, index) => (
                                <Stack
                                    boxShadow={4}
                                    key={index}
                                    sx={{
                                        width: { xs: '80%', md: '18%' },

                                        alignItems: 'center',
                                        gap: { xs: '5px', md: '10px' },
                                        padding: { xs: '5%', md: '2%' },
                                        borderRadius: '8px',
                                        bgcolor: '#fff',
                                        height: '380px',
                                        position: 'relative',
                                        transition: 'all 0.3s ease-in-out',
                                        '&:hover': {
                                            transform: 'translateY(-30px)',
                                        },
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: 'bold',
                                            fontSize: { xs: '18px', md: '22px' },
                                        }}
                                    >
                                        {item.name}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: 'bold',
                                            fontSize: { xs: '22px', md: '28px' },
                                            color: '#a61713',
                                        }}
                                    >
                                        {item.price}
                                        <Typography
                                            component="span"
                                            sx={{
                                                fontWeight: 'bold',
                                                fontStyle: 'italic',
                                            }}
                                        >
                                            {item.month}
                                        </Typography>
                                    </Typography>
                                    {Array.isArray(item.content) ? (
                                        <Stack sx={{ gap: { xs: '5px', md: '10px' } }}>
                                            {item.content.map((contentItem, contentIndex) => (
                                                <Stack
                                                    direction="row"
                                                    key={contentIndex}
                                                    sx={{
                                                        fontSize: '14px',
                                                        // justifyContent: 'center',
                                                        gap: '5px',
                                                    }}
                                                >
                                                    <DoneIcon
                                                        sx={{
                                                            color: '#A61317',
                                                        }}
                                                    />{' '}
                                                    <Typography sx={{ textAlign: 'justify' }}>
                                                        {Object.values(contentItem)[0]}
                                                    </Typography>
                                                </Stack>
                                            ))}
                                        </Stack>
                                    ) : (
                                        <Typography sx={{ fontSize: '14px' }}>
                                            {item.content}
                                        </Typography>
                                    )}
                                    <Button
                                        className="button-register"
                                        variant="contained"
                                        sx={{
                                            // width: '150px',
                                            // height: '60px',
                                            mx: 'auto',
                                            my: '10px',
                                            position: 'absolute',
                                            bottom: 30,
                                            overflow: 'hidden',
                                            transition: 'all 0.3s ease-in-out',
                                            '&:hover': {
                                                '.icon': {
                                                    transform: 'translateX(10px)',
                                                },
                                            },
                                        }}
                                    >
                                        <Link
                                            href="/register"
                                            style={{
                                                textDecoration: 'none',
                                                color: '#fff',
                                            }}
                                        >
                                            Đăng ký ngay
                                        </Link>
                                        <ArrowForwardIcon
                                            className="icon"
                                            sx={{ transition: 'all 0.3s ease-in-out' }}
                                        />
                                    </Button>
                                </Stack>
                            ))}
                        </Stack>
                        <Typography
                            sx={{
                                color: '#1c1c1c',
                                fontWeight: 'bold',
                                fontSize: { xs: '18px', md: '20px' },
                                margin: '2%',
                                fontStyle: 'italic',
                            }}
                        >
                            Với qui mô lớn hơn 100 phòng. Liên hệ trực tiếp để báo giá.
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
}
