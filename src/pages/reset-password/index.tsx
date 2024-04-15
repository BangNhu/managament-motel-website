import React, { useContext, useState, useEffect } from 'react';
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
import { SeoPage } from '@/components/common/seo';

export interface IResetPasswordProps {
    password: string;
}
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function ResetPassword(props: IResetPasswordProps) {
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

    //lấy thông tin email, token từ router
    const router = useRouter();
    const [infoEmail, setInfoEmail] = useState<string | null>(null);
    const [infoToken, setInfoToken] = useState<string | null>(null);
    useEffect(() => {
        const { email } = router.query;
        console.log(email);
        if (email && typeof email === 'string') {
            const indexOfQuestionMark = email.indexOf('?');

            // Tìm vị trí của dấu '=' trong chuỗi, bắt đầu từ vị trí của dấu '?'
            const indexOfEqualSign =
                indexOfQuestionMark !== -1 ? email.indexOf('=', indexOfQuestionMark) : -1;

            const firstPart =
                indexOfQuestionMark !== -1 ? email.substring(0, indexOfQuestionMark) : email;
            const secondPart = indexOfEqualSign !== -1 ? email.substring(indexOfEqualSign + 1) : '';

            console.log('Chuỗi đầu tiên:', firstPart);
            console.log('Chuỗi thứ hai:', secondPart);

            setInfoEmail(firstPart as string);
            setInfoToken(secondPart as string);
        }
    }, [router.query]);
    //
    const [formData, setFormData] = useState<IResetPasswordProps>({ password: '' });
    const [isReset, setIsReset] = useState(false);

    const handleChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (infoToken) {
            console.log(infoToken);
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/reset-password?reset_token=${infoToken}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    console.log('Thành công', data);
                    setIsReset(true);
                } else {
                    console.log('Thất bại');
                }
            } catch (error) {
                console.error('Error:', error);
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
            <SeoPage title="Làm mới mật khẩu" />
            <Typography
                variant="h1"
                sx={{
                    fontSize: '28px',
                    fontFamily: 'Verdana',
                    marginBottom: { xs: '10px', md: '20px' },
                    textAlign: 'center',
                    color: '#A61713',
                    // textTransform: 'uppercase',
                }}
            >
                Đặt lại mật khẩu
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
            <form onSubmit={handleSubmit} action="/login">
                <Stack sx={{ gap: '20px' }}>
                    <TextField
                        sx={{
                            width: { xs: '100%', sm: '80%' },
                            display: 'block',
                            textAlign: 'center',
                            mx: 'auto', //margin-x:theo 2 trục chiều ngang trong mui
                        }}
                        variant="outlined"
                        color="secondary"
                        label="Email"
                        name="email"
                        value={infoEmail || ''}
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                        required
                    />
                    <TextField
                        sx={{
                            width: { xs: '100%', sm: '80%' },
                            display: 'block',
                            textAlign: 'center',
                            mx: 'auto', //margin-x:theo 2 trục chiều ngang trong mui
                        }}
                        type="password"
                        variant="outlined"
                        color="secondary"
                        label="Mật khẩu"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        sx={{
                            width: { xs: '100%', sm: '80%' },
                            display: 'block',
                            textAlign: 'center',
                            mx: 'auto', //margin-x:theo 2 trục chiều ngang trong mui
                        }}
                        type="password"
                        variant="outlined"
                        color="secondary"
                        label="Nhập lại mật khẩu"
                        name="password"
                        value={formData.password}
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
            </form>{' '}
            {isReset ? (
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Đặt lại mật khẩu thành công.
                    </Alert>
                </Snackbar>
            ) : null}
        </Stack>
    );
}
ResetPassword.Layout = SimpleLayout;
