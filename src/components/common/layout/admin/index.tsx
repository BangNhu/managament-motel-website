import { LayoutProps } from '@/models/common';
import { IconButton, Stack, Tooltip } from '@mui/material';

import { useRef, useState } from 'react';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import { NavDesktop } from './nav';
import NavMobile from './nav/nav-mobile';
export interface AdminLayoutProps {}

export function AdminLayout({ children }: LayoutProps) {
    const [navColor, setNavColor] = useState<string>('unset');

    const checkScrollHeight = (height: number) => {
        console.log(height);
        if (height < 6200 && navColor !== '#ffffffaa') {
            setNavColor('#ffffffaa');
        }

        if (height > 6200 && navColor !== 'unset') {
            setNavColor('unset');
        }
    };

    const ref = useRef<HTMLDivElement | null>(null);

    return (
        <Stack
            onScroll={(e) => {
                const value =
                    e.currentTarget.scrollHeight -
                    e.currentTarget.scrollTop -
                    e.currentTarget.clientHeight;
                checkScrollHeight(value);
            }}
            ref={ref}
            sx={
                {
                    // maxHeight: '100vh',
                    // overflowY: 'auto',
                    // overflowX: 'hidden',
                    // transition: 'all ease .5s',
                }
            }
        >
            <Stack display={{ xs: 'none', sm: 'flex' }}>
                <NavDesktop />
            </Stack>
            <Stack display={{ xs: 'flex', sm: 'none' }}>
                <NavMobile />
            </Stack>
            {children}

            <Stack sx={{ display: { xs: 'none', sm: 'flex' } }}>
                <Tooltip title="về đầu trang">
                    <IconButton
                        sx={{ position: 'fixed', right: '20px', bottom: '20px' }}
                        onClick={() => {
                            ref.current?.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    >
                        <VerticalAlignTopIcon />
                    </IconButton>
                </Tooltip>
            </Stack>
        </Stack>
    );
}
