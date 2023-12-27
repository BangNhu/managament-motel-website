import { Divider, Stack, Typography } from '@mui/material';
import * as React from 'react';

interface dataMotel {
    blockMotelCount: number;
    bedsitCount: number;
    bedsitEmpty: number;
    bedsitHired: number;
    bedsitDeposit: number;
    tenantCount: number;
}
export interface IStatsMotelProps {
    data: dataMotel;
}

export function StatsMotel(props: IStatsMotelProps) {
    console.log(props.data.blockMotelCount);
    return (
        <Stack
            sx={{
                boxShadow: '4px 4px 16px rgba(0, 0, 0, 0.25)',
                borderRadius: '8px',
                padding: '20px',
                margin: '30px 0',
            }}
        >
            <Stack>
                <Typography sx={{ fontSize: '26px', color: '#a61713' }}>Thông tin nhà</Typography>
                <Divider sx={{ border: '2px solid #a61713', width: '20%' }} />
            </Stack>
            <Stack direction="row" justifyContent="space-between" sx={{ mt: '20px', gap: '2%' }}>
                <Stack
                    sx={{
                        width: '15%',
                        bgcolor: '#da9696',
                        padding: '30px',
                        borderRadius: '8px',
                        justifyContent: 'center',
                    }}
                >
                    {' '}
                    <Typography>Số dãy trọ</Typography>
                    <Typography sx={{ fontSize: '24px' }}>{props.data.blockMotelCount}</Typography>
                </Stack>
                <Stack
                    sx={{
                        width: '15%',
                        bgcolor: '#da9696',
                        padding: '30px',
                        borderRadius: '8px',
                        justifyContent: 'center',
                    }}
                >
                    <Typography>Số phòng</Typography>
                    <Typography sx={{ fontSize: '24px' }}>{props.data.bedsitCount}</Typography>
                </Stack>
                <Stack
                    sx={{
                        width: '15%',
                        bgcolor: '#da9696',
                        padding: '30px',
                        borderRadius: '8px',
                        justifyContent: 'center',
                    }}
                >
                    <Typography>Phòng trống</Typography>
                    <Typography sx={{ fontSize: '24px' }}>{props.data.bedsitEmpty}</Typography>
                </Stack>
                <Stack
                    sx={{
                        width: '15%',
                        bgcolor: '#da9696',
                        padding: '30px',
                        borderRadius: '8px',
                        justifyContent: 'center',
                    }}
                >
                    {' '}
                    <Typography>Đang đặt cọc</Typography>
                    <Typography sx={{ fontSize: '24px' }}>{props.data.bedsitDeposit}</Typography>
                </Stack>
                <Stack
                    sx={{
                        width: '15%',
                        bgcolor: '#da9696',
                        padding: '30px',
                        borderRadius: '8px',
                        justifyContent: 'center',
                    }}
                >
                    <Typography>Đang ở</Typography>
                    <Typography sx={{ fontSize: '24px' }}>{props.data.bedsitHired}</Typography>
                </Stack>
                <Stack
                    sx={{
                        width: '15%',
                        bgcolor: '#da9696',
                        padding: '30px',
                        borderRadius: '8px',
                        justifyContent: 'center',
                    }}
                >
                    <Typography>Số khách trọ</Typography>
                    <Typography sx={{ fontSize: '24px' }}>{props.data.tenantCount}</Typography>
                </Stack>
            </Stack>
        </Stack>
    );
}
