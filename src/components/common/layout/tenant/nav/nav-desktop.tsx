import React, { useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
export interface INavDesktopProps {}
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const NavItem = [
    { title: 'Hồ Sơ', path: '/tenant' },
    { title: 'Báo cáo sự cố', path: '/problem' },
    { title: 'Khai báo tạm trú ', path: '/tenant/temporary-residence' },
    { title: 'Xem hóa đơn', path: '/tenant/bill' },
];
export function NavDesktop(props: INavDesktopProps) {
    const MENU_HEIGHT = '80px';

    const router = useRouter();
    const handleRegisterClick = () => {
        router.push('/register');
    };
    const handleLoginClick = () => {
        router.push('/login');
    };

    return (
        <>
            <Stack
                sx={{
                    position: 'fixed',
                    top: 0,
                    width: '100%',
                    zIndex: 10,
                    backgroundColor: '#c6c6c6',
                    color: '#fff',
                    boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.08)',

                    height: MENU_HEIGHT,
                }}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                onScroll={(e) => {}}
            >
                <Stack
                    sx={{
                        gap: { xs: '15px', md: '25px', lg: '70px' },
                        width: '100%',
                        padding: '0 10%',
                    }}
                    direction="row"
                    justifyContent="space-between"
                >
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{
                            gap: { xs: '15px', md: '25px', lg: '70px' },
                        }}
                    >
                        <Link href={'/'}>
                            <h1>
                                <Stack
                                    component="img"
                                    src="/logo/nhutk-logo.png"
                                    alt="Logo website NhuTK"
                                    sx={{ width: { md: '70px', lg: '110px' } }}
                                />
                            </h1>
                        </Link>

                        <Stack
                            direction="row"
                            alignItems="center"
                            sx={{ gap: { xs: '10px', md: '20px', lg: '50px' } }}
                        >
                            {NavItem.map((item, index) => (
                                <Stack key={`list-key-${index}`}>
                                    <Typography
                                        component="a"
                                        href={item.path}
                                        sx={{
                                            textTransform: 'uppercase',
                                            fontSize: { xs: '12px', md: '15px', lg: '16px' },
                                            letterSpacing: '-0.35px',
                                            zIndex: 10,
                                            textDecoration: 'none',

                                            ':hover': { color: '#A61713', paddingBottom: '5px' },
                                            transition: 'all 0.2s ease-in-out',
                                            color: '#020202',
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                </Stack>
                            ))}
                        </Stack>
                    </Stack>

                    <Stack
                        direction="row"
                        alignItems="center"
                        sx={{
                            gap: { xs: '10px', md: '10px', lg: '20px' },
                            color: '#1C1C1C',
                        }}
                    >
                        <Button
                            onClick={handleRegisterClick}
                            sx={{
                                fontSize: { xs: '12px', md: '15px', lg: '16px' },
                                letterSpacing: '-0.35px',
                                zIndex: 10,
                                color: '#A61713',
                                textTransform: 'capitalize',
                                width: '120px',
                                borderRadius: '8px',
                                ':hover': {
                                    backgroundColor: 'transparent',
                                    border: '2px solid #A61713',
                                },
                            }}
                        >
                            <AccountCircleIcon /> Kim Ti Hoa
                        </Button>
                        <Button
                            onClick={handleLoginClick}
                            sx={{
                                textTransform: 'uppercase',
                                fontSize: { xs: '12px', md: '15px', lg: '16px' },
                                letterSpacing: '-0.35px',
                                zIndex: 10,
                                color: '#A61713',

                                width: '120px',
                                borderRadius: '8px',
                                ':hover': {
                                    backgroundColor: 'transparent',
                                    border: '2px solid #A61713',
                                },
                            }}
                        >
                            Đăng xuất
                        </Button>
                    </Stack>
                </Stack>

                <Stack
                    direction="row"
                    sx={{ gap: { xs: '10px', lg: '25px' }, alignItems: 'center' }}
                ></Stack>
            </Stack>
        </>
    );
}
