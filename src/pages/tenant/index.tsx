import { TenantLayout } from '@/components/common/layout/tenant';
import { TenantInfo } from '@/components/tenant/info';
import { Problem } from '@/components/tenant/problem';
import { TemporaryResidence } from '@/components/tenant/temporary_residence';
import useTokenData from '@/services/auth/token-data-loader';
import { useGetBillsTenantQuery } from '@/services/bill.services';
import { Button, Modal, Stack } from '@mui/material';
import * as React from 'react';

export interface ITenantPageProps {}
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: '50%' },
    maxHeight: '90%',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: '4px 4px 16px rgba(0, 0, 0, 0.25)',
    p: 5,
};
export default function TenantPage(props: ITenantPageProps) {
    const [openBCSC, setOpenBCSC] = React.useState(false);
    const handleOpenBCSC = () => setOpenBCSC(true);
    const handleCloseBCSC = () => setOpenBCSC(false);
    const [openKBTT, setOpenKBTT] = React.useState(false);
    const handleOpenKBTT = () => setOpenKBTT(true);
    const handleCloseKBTT = () => setOpenKBTT(false);
    return (
        <Stack
            sx={{
                width: {
                    xs: '100%',
                    md: '80%',
                },
                mx: 'auto',
                margin: { xs: '20% auto', md: '6% auto 0 auto ' },
                gap: { xs: '10px', md: '20px' },
            }}
        >
            <Stack direction="row" sx={{ justifyContent: 'end', gap: '20px' }}>
                <Button
                    variant="contained"
                    onClick={handleOpenBCSC}
                    sx={{ textTransform: 'capitalize' }}
                >
                    Báo cáo sự số
                </Button>
                <Modal
                    open={openBCSC}
                    // onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Stack sx={style}>
                        <Problem handleCloseModal={handleCloseBCSC} />
                    </Stack>
                </Modal>
                <Button
                    variant="contained"
                    onClick={handleOpenKBTT}
                    sx={{ textTransform: 'capitalize' }}
                >
                    Khai báo tạm trú
                </Button>
                <Modal
                    open={openKBTT}
                    // onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Stack sx={style}>
                        {<TemporaryResidence handleCloseModal={handleCloseKBTT} />}
                    </Stack>
                </Modal>
            </Stack>
            <TenantInfo />
        </Stack>
    );
}
TenantPage.Layout = TenantLayout;
