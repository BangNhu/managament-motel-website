import { MainLayout } from '@/components/common/layout/main';
import { SeoPage } from '@/components/common/seo';
import { Feature } from '@/components/main-home/feature';
import { Introduce } from '@/components/main-home/introduce';
import { PriceTable } from '@/components/main-home/price-table';
import { Reason } from '@/components/main-home/reason';

import { Stack } from '@mui/material';

export default function Home() {
    return (
        <Stack sx={{ width: '100vw' }}>
            <SeoPage title="Trang chủ" />
            <Introduce />
            <Reason />
            <Feature />
            <PriceTable />
        </Stack>
    );
}
Home.Layout = MainLayout;
