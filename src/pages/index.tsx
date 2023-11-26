import { MainLayout } from '@/components/common/layout/main';
import { SeoPage } from '@/components/common/seo';

import { Stack } from '@mui/material';

export default function Home() {
    return (
        <Stack sx={{ width: '100vw' }}>
            {' '}
            <SeoPage title="Trang chủ" /> hi
        </Stack>
    );
}
Home.Layout = MainLayout;
