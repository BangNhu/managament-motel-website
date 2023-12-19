import { MainLayout } from '@/components/common/layout/main';
import { AppPropsWithLayout } from '@/models/common';

import { ThemeProvider, createTheme } from '@mui/material';
import '@/styles/font.css';
import { useMemo, useState } from 'react';
import { Provider } from 'react-redux';
import { getDesignTokens } from '@/utils/palette_mode';
import { store } from '@/store';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
    const Layout = Component.Layout ?? MainLayout;
    return (
        <>
            <Head>
                <link rel="icon" type="image/x-icon" href="/icons/icon-website.png"></link>
            </Head>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            </Provider>
        </>
    );
}
