import { RegisterLoginLayout } from '@/components/common/layout/main/resgister-login';
import { RegisterForm } from '@/components/register';
import { Stack } from '@mui/material';
import React from 'react';

export interface IRegisterProps {}

export default function Register(props: IRegisterProps) {
    return (
        <Stack>
            <RegisterForm />
        </Stack>
    );
}
Register.Layout = RegisterLoginLayout;
