import useTokenData from '@/services/auth/token-data-loader';
import { useGetTenantIdQuery, useGetTenantQuery } from '@/services/tenant.services';
import { Divider, Stack, Typography } from '@mui/material';
import * as React from 'react';

export interface ITenantInfoProps {}

export function TenantInfo(props: ITenantInfoProps) {
    const tokenData = useTokenData();
    const tenantId = tokenData?.userID;
    const { data: dataTenant } = useGetTenantIdQuery(tenantId, { skip: !tenantId });
    const data = dataTenant?.result;

    function convertDateFormat(dateString: string): string {
        const originalDate = new Date(dateString);

        const day = originalDate.getUTCDate().toString().padStart(2, '0');
        const month = (originalDate.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const year = originalDate.getUTCFullYear().toString();

        return `${day}-${month}-${year}`;
    }

    return (
        <Stack
            sx={{
                width: { xs: '80%', md: '40%' },
                margin: { xs: '20% auto', md: '0% auto' },
                borderRadius: '8px',
                padding: '2% 5%',
                boxShadow: '4px 4px 16px rgba(0, 0, 0, 0.25)',
            }}
        >
            <Typography
                variant="h1"
                sx={{
                    fontSize: '22px',
                    fontFamily: 'Verdana',
                    marginBottom: { xs: '10px', md: '20px' },
                    textAlign: 'center',
                    color: '#A61713',
                    fontWeight: 600,
                    // textTransform: 'uppercase',
                }}
            >
                Thông tin cá nhân
            </Typography>
            <Divider
                sx={{
                    margin: '0 0 5% 0',
                    border: '1px solid #cb5656',
                    // width: { xs: '100%', sm: '80%' },
                    // textAlign: 'center',
                    // mx: 'auto',
                }}
            />
            <Stack sx={{ gap: '10px' }}>
                <Stack direction="row">
                    <Stack sx={{ fontWeight: 'bold', fontSize: '20px', width: '30%' }}>
                        Họ và tên:
                    </Stack>
                    <Stack sx={{ fontSize: '20px' }}>{data?.tenant_name}</Stack>
                </Stack>
                <Stack direction="row">
                    <Stack sx={{ fontWeight: 'bold', fontSize: '20px', width: '30%' }}>
                        Email:
                    </Stack>
                    <Stack sx={{ fontSize: '20px' }}>{data?.email}</Stack>
                </Stack>
                <Stack direction="row">
                    <Stack sx={{ fontWeight: 'bold', fontSize: '20px', width: '30%' }}>
                        Số điện thoại:
                    </Stack>
                    <Stack sx={{ fontSize: '20px' }}>{data?.number_phone}</Stack>
                </Stack>
                <Stack direction="row">
                    <Stack sx={{ fontWeight: 'bold', fontSize: '20px', width: '30%' }}>
                        Địa chỉ:
                    </Stack>
                    <Stack sx={{ fontSize: '20px' }}>{data?.address}</Stack>
                </Stack>
                <Stack direction="row">
                    <Stack sx={{ fontWeight: 'bold', fontSize: '20px', width: '30%' }}>
                        Giới tính:
                    </Stack>
                    <Stack sx={{ fontSize: '20px' }}>{data?.gender}</Stack>
                </Stack>
                <Stack direction="row">
                    <Stack sx={{ fontWeight: 'bold', fontSize: '20px', width: '30%' }}>
                        Ngày sinh:
                    </Stack>
                    <Stack sx={{ fontSize: '20px' }}>
                        {convertDateFormat(data?.birthday ?? '')}
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
}
