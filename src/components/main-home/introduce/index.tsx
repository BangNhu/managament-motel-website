import { Button, Stack, Typography } from '@mui/material';
import * as React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
export interface IIntroduceProps {}

export function Introduce(props: IIntroduceProps) {
    return (
        <Stack sx={{ padding: '15%' }}>
            <Stack sx={{ textAlign: 'center', gap: { xs: '10px', sm: '15px' } }}>
                <Typography
                    sx={{
                        fontSize: { xs: '30px', sm: '35px', md: '40px' },

                        fontFamily: '"Verdana", sans-serif',
                        fontWeight: 'bold',
                        color: '#7b6b6b',
                    }}
                >
                    PHẦN MỀM QUẢN LÝ NHÀ TRỌ{' '}
                    <Typography
                        component="span"
                        sx={{
                            fontSize: { xs: '30px', sm: '35px', md: '40px' },
                            // textTransform: 'uppercase',
                            fontFamily: '"Verdana", sans-serif',
                            color: '#A61713',
                            fontWeight: 'bold',
                        }}
                    >
                        NhuTK
                    </Typography>
                </Typography>
                <Typography
                    sx={{
                        fontSize: { xs: '20px', sm: '23px', md: '25px' },

                        color: '#1c1c1c',
                    }}
                >
                    Quản lý nhà trọ tiện ích, hiệu quả và tiết kiệm thời gian.
                </Typography>
                <Button
                    className="button-register"
                    variant="contained"
                    sx={{
                        width: '150px',
                        height: '60px',
                        mx: 'auto',
                        my: '10px',
                        position: 'relative',
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
                        Dùng thử
                    </Link>
                    <ArrowForwardIcon
                        className="icon"
                        sx={{ transition: 'all 0.3s ease-in-out' }}
                    />
                </Button>
            </Stack>
        </Stack>
    );
}
