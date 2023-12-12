import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Alert, Button, CircularProgress, Grid, Stack, TextField, Typography } from '@mui/material';
import { SimpleLayout } from '@/components/common/layout/main/simple-layout';

export interface IResetPasswordProps {
    password: string;
}

export default function ResetPassword(props: IResetPasswordProps) {
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
                    // const data = await response.json();
                    // console.log('Thành công', data);
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
                        width: { xs: '100%', sm: '60%' },
                        display: 'block',
                        textAlign: 'center',
                        mx: 'auto', //margin-x:theo 2 trục chiều ngang trong mui
                    }}
                    type="text"
                    variant="outlined"
                    color="secondary"
                    label="Mật khẩu"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <Button variant="contained" type="submit">
                    Gửi
                </Button>
            </form>{' '}
            {isReset ? <p>Bạn đã đặt lại mật khẩu thành công.</p> : null}
        </Stack>
    );
}
ResetPassword.Layout = SimpleLayout;
