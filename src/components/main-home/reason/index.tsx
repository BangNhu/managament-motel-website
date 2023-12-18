import { Stack, Typography } from '@mui/material';
import * as React from 'react';

export interface IReasonProps {}

export function Reason(props: IReasonProps) {
    const data = [
        {
            icons: '/icons/growth.png',
            title: 'Đơn giản và dễ dùng',
            content:
                'Giao diện đơn giản, thân thiện, dễ sử dụng trong việc thực hiện các thao tác quản lý.',
        },
        {
            icons: '/icons/location.png',
            title: 'Quản lý mọi lúc, mọi nơi',
            content:
                'Chủ trọ có thể quản lý nhà trọ của mình ở bất cứ đâu, chỉ cần có thiết bị thông minh và mạng.',
        },
        {
            icons: '/icons/save-money.png',
            title: 'Tiết kiệm chi phí tối đa',
            content:
                'Với chi phí rất ít, chủ trọ đã có thể sử dụng những công nghệ hiện đại vào việc quản lý.',
        },
        {
            icons: '/icons/people.png',
            title: 'Tiện ích cho khách thuê',
            content:
                'Khách thuê có thể dễ dàng nghiêm cứu hóa đơn và không cần lưu trữ hóa đơn giấy.',
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
                        Các điểm nổi bật khi quản lý nhà trọ bằng{' '}
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
                        <Stack
                            direction={{ xs: 'column', md: 'row' }}
                            sx={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: { xs: '20px', md: '5%' },
                                my: '20px',
                            }}
                        >
                            {data?.map((item, index) => (
                                <Stack
                                    boxShadow={4}
                                    key={index}
                                    sx={{
                                        width: { xs: '80%', md: '18%' },
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: { xs: '5px', md: '10px' },
                                        padding: { xs: '5%', md: '2%' },
                                        borderRadius: '8px',
                                        bgcolor: '#fff',
                                    }}
                                >
                                    <Stack
                                        component={'img'}
                                        src={item.icons}
                                        sx={{ width: '64px', height: '64px' }}
                                    />
                                    <Typography sx={{ fontWeight: 'bold' }}>
                                        {item.title}
                                    </Typography>
                                    <Typography sx={{ fontSize: '14px' }}>
                                        {item.content}
                                    </Typography>
                                </Stack>
                            ))}
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
}
