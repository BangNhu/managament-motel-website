import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Alert, Button, CircularProgress, Grid, Stack, TextField, Typography } from '@mui/material';
import { SimpleLayout } from '@/components/common/layout/main/simple-layout';
import { checkToken } from '@/services/auth/check-token';

export interface IHomeManagementProps {}

export default function HomeManagement(props: IHomeManagementProps) {
    const [tokenData, setTokenData] = useState<any>(null);

    useEffect(() => {
        const checkTokenAndSetData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    return;
                }

                const data = await checkToken(token);
                setTokenData(data);
            } catch (error: any) {
                console.error('Error:', error.message);
            }
        };

        if (tokenData === null) {
            checkTokenAndSetData();
        }
    }, [tokenData]);
    console.log(tokenData);
    if (tokenData?.userType === 'landlord') {
        console.log('hi Như');
    }
    return <div>HomeManagement</div>;
}
