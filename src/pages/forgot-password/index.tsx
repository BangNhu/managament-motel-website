import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
    Button,
    CircularProgress,
    Divider,
    Grid,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { SimpleLayout } from '@/components/common/layout/main/simple-layout';
import React from 'react';

export interface IForgotPasswordProps {
    email: string;
}
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function ForgotPassword(props: IForgotPasswordProps) {
    //Hiển thị Alert
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

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
                width: { xs: '80%', md: '30%' },
                margin: { xs: '20% auto', md: '5% auto' },
                borderRadius: '8px',
                padding: '2% 5%',
                boxShadow: '4px 4px 16px rgba(0, 0, 0, 0.25)',
            }}
        >
            <Typography
                variant="h1"
                sx={{
                    fontSize: '28px',
                    fontFamily: 'Verdana',
                    marginBottom: { xs: '10px', md: '20px' },
                    textAlign: 'center',

                    // textTransform: 'uppercase',
                }}
            >
                Điền email đã đăng ký
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
            <form onSubmit={handleSubmit}>
                <Stack sx={{ gap: '20px' }}>
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
                    <Button
                        variant="contained"
                        onClick={handleClick}
                        type="submit"
                        sx={{ textAlign: 'center', mx: 'auto' }}
                    >
                        Gửi
                    </Button>
                </Stack>
            </form>
            {isSendEmail ? (
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Bạn hãy kiểm tra email và thực hiện đặt lại mật khẩu.
                    </Alert>
                </Snackbar>
            ) : null}
        </Stack>
    );
}
ForgotPassword.Layout = SimpleLayout;
