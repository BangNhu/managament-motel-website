import { Divider, Stack, Typography } from '@mui/material';
import * as React from 'react';

export interface IStatsInOutProps {}

export function StatsInOut(props: IStatsInOutProps) {
    return (
        <Stack direction="row" justifyContent="space-between">
            <Stack
                sx={{
                    boxShadow: '4px 4px 16px rgba(0, 0, 0, 0.25)',
                    borderRadius: '8px',
                    padding: '20px',
                    margin: '30px 0',
                    width: '45%',
                }}
            >
                <Stack>
                    <Typography sx={{ fontSize: '26px', color: '#a61713' }}>
                        Thống kê thu chi
                    </Typography>
                    <Divider sx={{ border: '2px solid #a61713', width: '45%' }} />
                </Stack>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ mt: '20px', gap: '2%' }}
                >
                    <Stack
                        sx={{
                            width: '35%',
                            bgcolor: '#8ded73',
                            padding: '30px',
                            borderRadius: '8px',
                            justifyContent: 'center',
                        }}
                    >
                        {' '}
                        <Typography>Số tiền thu vào</Typography>
                        <Typography sx={{ fontSize: '24px' }}>25589000</Typography>
                    </Stack>
                    <Stack
                        sx={{
                            width: '35%',
                            bgcolor: '#8ded73',
                            padding: '30px',
                            borderRadius: '8px',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography>Số tiền chi ra</Typography>
                        <Typography sx={{ fontSize: '24px' }}>5600000</Typography>
                    </Stack>
                </Stack>
            </Stack>
            <Stack
                sx={{
                    boxShadow: '4px 4px 16px rgba(0, 0, 0, 0.25)',
                    borderRadius: '8px',
                    padding: '20px',
                    margin: '30px 0',
                    width: '45%',
                }}
            >
                <Stack>
                    <Typography sx={{ fontSize: '26px', color: '#a61713' }}>
                        Theo dõi hóa đơn
                    </Typography>
                    <Divider sx={{ border: '2px solid #a61713', width: '45%' }} />
                </Stack>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ mt: '20px', gap: '2%' }}
                >
                    <Stack
                        sx={{
                            bgcolor: '#d7ed73',
                            padding: '30px',
                            borderRadius: '8px',
                            justifyContent: 'center',
                        }}
                    >
                        {' '}
                        <Typography>Hóa đơn đã thanh toán</Typography>
                        <Typography sx={{ fontSize: '24px' }}>12</Typography>
                    </Stack>
                    <Stack
                        sx={{
                            bgcolor: '#d7ed73',
                            padding: '30px',
                            borderRadius: '8px',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography>Hóa đơn chưa thanh toán</Typography>
                        <Typography sx={{ fontSize: '24px' }}>1</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
}
