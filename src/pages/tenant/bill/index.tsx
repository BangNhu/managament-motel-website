import { TenantLayout } from '@/components/common/layout/tenant';
import useTokenData from '@/services/auth/token-data-loader';
import { useGetBillsTenantQuery } from '@/services/bill.services';
import { Divider, Stack, Typography } from '@mui/material';
import * as React from 'react';

export interface ITenantBillProps {}

export default function TenantBill(props: ITenantBillProps) {
    const tokenData = useTokenData();
    const tenantId = tokenData?.userID;
    const { data: dataTenantBill } = useGetBillsTenantQuery(tenantId, { skip: !tenantId });
    const data = dataTenantBill?.result;
    console.log(data);
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
                margin: { xs: '20% auto', md: '8% auto' },
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
                Hóa đơn
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
            <Stack sx={{ border: '1px solid #1c1c1c', padding: '10px' }}>
                <Stack sx={{ gap: '10px' }}>
                    <Stack direction="row">
                        <Stack sx={{ fontWeight: 'bold', fontSize: '20px', width: '30%' }}>
                            Ngày lập hóa đơn:
                        </Stack>
                        <Stack sx={{ fontSize: '20px' }}>
                            {' '}
                            {convertDateFormat(data?.[0]?.create_day ?? '')}
                        </Stack>
                    </Stack>
                    <Stack direction="row">
                        <Stack sx={{ fontWeight: 'bold', fontSize: '20px', width: '30%' }}>
                            Tên phòng:
                        </Stack>
                        <Stack sx={{ fontSize: '20px' }}>{data?.[0]?.bedsit_name}</Stack>
                    </Stack>
                    <Stack direction="row">
                        <Stack sx={{ fontWeight: 'bold', fontSize: '20px', width: '30%' }}>
                            Tổng tiền dịch vụ:
                        </Stack>
                        <Stack sx={{ fontSize: '20px' }}>{data?.[0]?.total_price_service}</Stack>
                    </Stack>
                    <Stack direction="row">
                        <Stack sx={{ fontWeight: 'bold', fontSize: '20px', width: '30%' }}>
                            Tiền điện:
                        </Stack>
                        <Stack sx={{ fontSize: '20px' }}>{data?.[0]?.electronic_money}</Stack>
                    </Stack>
                    <Stack direction="row">
                        <Stack sx={{ fontWeight: 'bold', fontSize: '20px', width: '30%' }}>
                            Tiền nước:
                        </Stack>
                        <Stack sx={{ fontSize: '20px' }}>{data?.[0]?.water_money}</Stack>
                    </Stack>
                    <Stack direction="row">
                        <Stack sx={{ fontWeight: 'bold', fontSize: '20px', width: '30%' }}>
                            Chi phí phát sinh:
                        </Stack>
                        <Stack sx={{ fontSize: '20px' }}>{data?.[0]?.costs_incurred}</Stack>
                    </Stack>
                    <Stack direction="row">
                        <Stack sx={{ fontWeight: 'bold', fontSize: '20px', width: '30%' }}>
                            Tiền cũ còn nợ:
                        </Stack>
                        <Stack sx={{ fontSize: '20px' }}>{data?.[0]?.old_debt}</Stack>
                    </Stack>
                    <Stack direction="row">
                        <Stack sx={{ fontWeight: 'bold', fontSize: '20px', width: '30%' }}>
                            Tổng tiền:
                        </Stack>
                        <Stack sx={{ fontSize: '20px', fontWeight: 'bold' }}>
                            {data?.[0]?.total}
                        </Stack>
                    </Stack>
                    <Stack direction="row">
                        <Stack sx={{ fontWeight: 'bold', fontSize: '20px', width: '30%' }}>
                            Tình trạng:
                        </Stack>
                        <Stack sx={{ fontSize: '20px' }}>
                            {data?.[0]?.status === 0 ? 'Chưa thanh toán' : 'Đã thanh toán'}
                        </Stack>
                    </Stack>
                    <Stack direction="row">
                        <Stack sx={{ fontWeight: 'bold', fontSize: '20px', width: '30%' }}>
                            Ghi chú:
                        </Stack>
                        <Stack sx={{ fontSize: '20px' }}>{data?.[0]?.note}</Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
}
TenantBill.Layout = TenantLayout;
