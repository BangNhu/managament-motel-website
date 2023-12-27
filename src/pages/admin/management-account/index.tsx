import { LandlordList } from '@/components/admin';
import AddLandlord from '@/components/admin/form-landlord';
import { AdminLayout } from '@/components/common/layout/admin';
import { ManagementLayout } from '@/components/common/layout/management';
import { BedsitList } from '@/components/customer/bedsit';
import AddMotel from '@/components/customer/motel/form-motel';
import { TenantList } from '@/components/customer/tenant';
import AddTenant from '@/components/customer/tenant/form-tenant';
import useTokenData from '@/services/auth/token-data-loader';
import { useGetMotelsQuery } from '@/services/motel.services';
import { Button, Modal, Stack } from '@mui/material';
import { useState } from 'react';
import { CSVLink } from 'react-csv';

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
export interface IManageLandlordProps {}

export default function ManageLandlord(props: IManageLandlordProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [dataExport, setDataExport] = useState<any[][]>([]);
    const { data } = useGetMotelsQuery();
    // console.log('data redux tookit', data);

    const tokenData = useTokenData();
    const { data: dataMotel } = useGetMotelsQuery();
    const motels = dataMotel?.result || [];

    const listMotel = motels.map((motel, index) => ({
        ...motel,
        index: index + 1, // Bắt đầu từ số 1
    }));

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
                    onClick={handleOpen}
                    sx={{ textTransform: 'capitalize' }}
                >
                    Thêm mới
                </Button>
                <Modal
                    open={open}
                    // onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Stack sx={style}> {<AddLandlord handleCloseModal={handleClose} />}</Stack>
                </Modal>
                {/* <Button
                    // variant="contained"
                    sx={{
                        textTransform: 'capitalize',
                        bgcolor: '#188123',
                        color: '#fff',
                        '&.MuiButton-root:hover': {
                            backgroundColor: '#115818',
                        },
                    }}
                ></Button> */}
            </Stack>
            {/* <AddMotel /> */}
            <LandlordList />
        </Stack>
    );
}

ManageLandlord.Layout = AdminLayout;
