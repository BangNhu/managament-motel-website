import React, { useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
export interface INavDesktopProps {}
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useTokenData from '@/services/auth/token-data-loader';
// const NavItem = [
//     { title: 'Thống kê', path: '/management' },
//     { title: 'Nhà trọ', path: '/management/motel' },
//     { title: 'Dãy trọ', path: '/management/block-motel' },
//     { title: 'Phòng trọ', path: '/management/bedsit' },
//     { title: 'Hợp đồng', path: '/management/contract' },
//     { title: 'Khách trọ', path: '/management/tenant' },
//     { title: 'Dịch vụ', path: '/management/services' },
//     // { title: '', path: '/management/services' },
// ];
const NavItem = [
    { title: 'Thống kê', path: '/management/' },
    {
        title: 'Quản lý',
        path: '/management/',
        subMenu: [
            { title: 'Nhà trọ', path: '/management/' },
            { title: 'Dãy trọ', path: '/management/' },
            { title: 'Phòng trọ', path: '/management/' },
            { title: 'Khách trọ', path: '/management/' },
            { title: 'Hợp đồng', path: '/management/' },
            { title: 'Nhân viên', path: '/management/' },
        ],
    },
    { title: 'Tài chính', path: '/management/' },
];

export function NavDesktop(props: INavDesktopProps) {
    const [activeSubMenu, setActiveSubMenu] = useState(null);

    const handleMouseEnter = (index: any) => {
        setActiveSubMenu(index);
    };

    const handleMouseLeave = () => {
        setActiveSubMenu(null);
    };
    const MENU_HEIGHT = '80px';
    const tokenData = useTokenData();
    const userType = tokenData?.userType;
    const router = useRouter();
    const handleRegisterClick = () => {
        router.push('/register');
    };
    const handleLogOutClick = () => {
        router.push('/');
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
                            sx={{ gap: { xs: '10px', md: '5px', lg: '20px' } }}
                        >
                            {NavItem.map((item, index) => (
                                <Stack
                                    key={`list-key-${index}`}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <Typography
                                        component="a"
                                        href={item.path}
                                        sx={{
                                            textTransform: 'uppercase',
                                            fontSize: { xs: '12px', md: '15px', lg: '16px' },
                                            letterSpacing: '-0.35px',
                                            zIndex: 10,
                                            textDecoration: 'none',
                                            color:
                                                activeSubMenu === index ||
                                                (item.subMenu && activeSubMenu === 'subMenu')
                                                    ? '#A61713'
                                                    : '#020202',
                                            ':hover': { color: '#A61713', paddingBottom: '5px' },
                                            transition: 'all 0.2s ease-in-out',
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                    {activeSubMenu === index && item.subMenu && (
                                        <Stack
                                            sx={{
                                                position: 'absolute',
                                                backgroundColor: '#c6c6c6',

                                                paddingTop: '50px',
                                                zIndex: 1,
                                            }}
                                        >
                                            {item.subMenu.map((subItem, subIndex) => (
                                                <Typography
                                                    key={`sub-list-key-${subIndex}`}
                                                    component="a"
                                                    href={subItem.path}
                                                    sx={{
                                                        textTransform: 'none',
                                                        fontSize: {
                                                            xs: '12px',
                                                            md: '15px',
                                                            lg: '16px',
                                                        },
                                                        letterSpacing: '-0.35px',
                                                        textDecoration: 'none',
                                                        color: '#020202',
                                                        ':hover': {
                                                            color: '#A61713',
                                                        },
                                                        transition: 'all 0.2s ease-in-out',
                                                        margin: '2px 30px 5px 10px',
                                                    }}
                                                >
                                                    {subItem.title}
                                                </Typography>
                                            ))}
                                        </Stack>
                                    )}
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
                                width: '130px',
                                borderRadius: '8px',
                                ':hover': {
                                    backgroundColor: 'transparent',
                                    border: '2px solid #A61713',
                                },
                            }}
                        >
                            <AccountCircleIcon />{' '}
                            {userType === 'landlord' ? 'Hoa Phi' : 'Hoàn Mỹ Ly'}
                        </Button>
                        <Button
                            onClick={handleLogOutClick}
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
