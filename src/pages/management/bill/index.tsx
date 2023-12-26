import { Stack } from '@mui/material';
import * as React from 'react';

export interface IManageBillProps {
    handleCloseModal: () => void;
}

export default function ManageBill(props: IManageBillProps) {
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
        ></Stack>
    );
}
