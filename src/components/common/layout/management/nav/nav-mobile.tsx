import { Stack, Typography, Button } from '@mui/material';
import * as React from 'react';
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import { navmain } from '../topbar/data.nav.mock';
// import Menu from './menu';
export interface IMenuMobileProps {}

export default function NavMobile(props: IMenuMobileProps) {
    const MENU_HEIGHT = '270px';
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const onClickMenuBtn = () => {
        setIsOpenMenu(!isOpenMenu);
    };
    const NavItem = [
        { title: 'Trang Chủ', path: '/' },
        { title: 'Bảng Giá', path: '/' },
        { title: 'Hướng dẫn', path: '/' },
        { title: 'Liên Hệ', path: '/' },
    ];

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
                    background: isOpenMenu ? '#fff' : '#ffffffaa',
                    transition: 'all 0.3s ease-in-out',
                    boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.08)',
                    height: isOpenMenu ? MENU_HEIGHT : '60px',
                    overflow: 'hidden',
                }}
            >
                <Stack
                    onClick={() => setIsOpenMenu(false)}
                    sx={{
                        background: 'transperent',
                        top: MENU_HEIGHT,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        position: 'fixed',
                        zIndex: 0,
                        display: isOpenMenu ? 'flex' : 'none',
                    }}
                ></Stack>
                {/* header */}
                <Stack
                    sx={{ width: '100%' }}
                    direction="row"
                    alignItems="start"
                    justifyContent="space-between"
                >
                    <Stack sx={{ padding: '0 5%' }} direction="row">
                        <Link href={'/'}>
                            <h1>
                                <Stack
                                    component="img"
                                    src="/logo/nhutk-logo.png"
                                    alt="Logo website NhuTK"
                                    sx={{ width: '90px' }}
                                />
                            </h1>
                        </Link>
                    </Stack>
                    <Stack
                        onClick={onClickMenuBtn}
                        sx={{
                            width: '60px',
                            height: '60px',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {isOpenMenu ? (
                            <CloseIcon sx={{ color: '#0A0B11' }} />
                        ) : (
                            <MenuIcon sx={{ color: '#0A0B11' }} />
                        )}
                    </Stack>
                </Stack>
                <Stack sx={{ gap: '10px', paddingLeft: '5%' }}>
                    {NavItem.map((item, index) => (
                        <Stack key={`list-key-${index}`}>
                            <Typography
                                component="a"
                                href={item.path}
                                sx={{
                                    fontSize: { xs: '14px', md: '15px', lg: '16px' },
                                    letterSpacing: '-0.35px',
                                    zIndex: 10,
                                    textDecoration: 'none',
                                    color: '#1C1C1C',
                                }}
                            >
                                {item.title}
                            </Typography>
                        </Stack>
                    ))}
                </Stack>
                <Stack
                    direction="row"
                    alignItems="center"
                    sx={{
                        gap: { xs: '10px', md: '10px', lg: '20px' },
                        marginTop: '20px',
                        color: '#1C1C1C',
                        justifyContent: 'center',
                    }}
                >
                    <Button
                        onClick={handleRegisterClick}
                        sx={{
                            textTransform: 'uppercase',
                            fontSize: { xs: '14px', md: '15px', lg: '16px' },
                            letterSpacing: '-0.35px',
                            zIndex: 10,
                            color: '#A61713',
                            border: '2px solid #A61713',
                            width: '120px',
                            borderRadius: '8px',
                        }}
                    >
                        Đăng ký
                    </Button>
                    <Button
                        onClick={handleLoginClick}
                        sx={{
                            textTransform: 'uppercase',
                            fontSize: { xs: '14px', md: '15px', lg: '16px' },
                            letterSpacing: '-0.35px',
                            zIndex: 10,
                            color: '#A61713',
                            border: '2px solid #A61713',
                            width: '120px',
                            borderRadius: '8px',
                        }}
                    >
                        Đăng nhập
                    </Button>
                </Stack>
            </Stack>
        </>
    );
}
