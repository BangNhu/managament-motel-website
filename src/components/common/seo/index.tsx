import * as React from 'react';
import Head from 'next/head';

export interface SeoPageProps {
    title: string;
    description?: string;
    imagePreview?: string;
    ogTitle?: string;
}

export function SeoPage(props: SeoPageProps) {
    const description = props?.description || 'Phần mềm quản lý hệ thống nhà trọ NhuTK';
    const image = props?.imagePreview || '/icons/favicon.ico';
    const url = '';
    const ogTitle = props?.ogTitle || props.title;
    const title = `${props.title || 'Pages'} - NhuTK`;
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:image:url" content={url} />
            <meta property="og:image:secure_url" content={image} />
            <meta property="og:title" content={ogTitle} />
            <link rel="icon" type="image/x-icon" href="/icons/icon-website.png"></link>
        </Head>
    );
}
