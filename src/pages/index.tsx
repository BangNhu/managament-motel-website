import { ChatbotAI } from '@/components/common/chatbot-ai';
import { MainLayout } from '@/components/common/layout/main';
import { SeoPage } from '@/components/common/seo';
import { Feature } from '@/components/main-home/feature';
import { Introduce } from '@/components/main-home/introduce';
import { PriceTable } from '@/components/main-home/price-table';
import { Reason } from '@/components/main-home/reason';

import { Stack, Tooltip } from '@mui/material';
import Head from 'next/head';

export default function Home() {
    return (
        <>
            <Head>
                <script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></script>
            </Head>
            <Stack sx={{ width: '100vw' }}>
                <SeoPage title="Trang chủ" />
                <Introduce />
                <Reason />
                <Feature />
                <PriceTable />
                <Tooltip title="Hãy đặt câu hỏi với Chatbot AI">
                    <ChatbotAI />
                </Tooltip>
            </Stack>
        </>
    );
}
Home.Layout = MainLayout;
