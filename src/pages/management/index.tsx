import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Alert, Button, CircularProgress, Grid, Stack, TextField, Typography } from '@mui/material';
import { SimpleLayout } from '@/components/common/layout/main/simple-layout';
import { checkToken } from '@/services/auth/check-token';
import { useGetMotelsQuery } from '@/services/motel.services';
import { MotelList } from '@/components/customer/motel/motel-list';
import AddMotel from '@/components/customer/motel/form-motel';
import useTokenData from '@/services/auth/token-data-loader';

export interface IHomeManagementProps {}

export default function HomeManagement(props: IHomeManagementProps) {
    const { data } = useGetMotelsQuery();
    console.log('data redux tookit', data);

    const tokenData = useTokenData();

    console.log(tokenData);
    if (tokenData?.userType === 'landlord') {
        console.log('hi Như');
    }
    return (
        <div>
            <AddMotel />
            <MotelList />
        </div>
    );
}
