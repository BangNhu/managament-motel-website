import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Alert, Button, CircularProgress, Grid, Stack, TextField, Typography } from '@mui/material';
import { SimpleLayout } from '@/components/common/layout/main/simple-layout';

export interface IForgotPasswordProps {
    email: string;
}

export default function ForgotPassword(props: IForgotPasswordProps) {
    const [formData, setFormData] = useState<IForgotPasswordProps>({ email: '' });
    const [isSendEmail, setIsSendEmail] = useState(false);
    const router = useRouter();
    const handleChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Thành công!');
                setIsSendEmail(true);
                console.log(formData);
                // router.push('/login');
            } else {
                console.error('Thất bại');
            }
        } catch (error) {
            console.error('Error during signup:', error);
            if (error instanceof Response) {
                const errorMessage = await error.text();
                console.error('Server error:', errorMessage);
            }
        }
    };
    return (
        <Stack
            sx={{
                width: { xs: '90%', md: '50%' },
                margin: { xs: '20% auto', md: '5% auto' },
                borderRadius: '8px',
                // border: '2px solid #A61713',
                padding: '2% 5%',
                boxShadow: '4px 4px 16px rgba(0, 0, 0, 0.25)',
            }}
        >
            <Typography
                variant="h1"
                sx={{
                    fontSize: '32px',
                    fontFamily: 'Verdana',
                    marginBottom: { xs: '10px', md: '20px' },
                    textAlign: 'center',
                    // textTransform: 'uppercase',
                }}
            >
                Đăng ký phần mềm quản lý nhà trọ{' '}
                <Typography
                    component="span"
                    sx={{ color: '#A61713', fontSize: '32px', fontFamily: 'Verdana' }}
                >
                    NhuTK
                </Typography>
            </Typography>
            <form onSubmit={handleSubmit} action="/login">
                <TextField
                    sx={{
                        width: { xs: '100%', sm: '60%' },
                        display: 'block',
                        textAlign: 'center',
                        mx: 'auto', //margin-x:theo 2 trục chiều ngang trong mui
                    }}
                    type="text"
                    variant="outlined"
                    color="secondary"
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <Button variant="contained" type="submit">
                    Gửi
                </Button>
            </form>
            {isSendEmail ? <p>Link làm mới mật khẩu đã được gửi tới email của bạn.</p> : null}
        </Stack>
    );
}
ForgotPassword.Layout = SimpleLayout;
