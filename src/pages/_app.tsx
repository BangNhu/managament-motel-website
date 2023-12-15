import { MainLayout } from '@/components/common/layout/main';
import { AppPropsWithLayout } from '@/models/common';

import { ThemeProvider, createTheme } from '@mui/material';
import '@/styles/font.css';
import { useMemo, useState } from 'react';
import { Provider } from 'react-redux';
import { getDesignTokens } from '@/utils/palette_mode';
import { store } from '@/store';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
    const Layout = Component.Layout ?? MainLayout;
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </Provider>
    );
}
