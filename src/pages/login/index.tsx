import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
    Alert,
    Button,
    Checkbox,
    CircularProgress,
    Divider,
    FormControlLabel,
    FormGroup,
    Grid,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { SimpleLayout } from '@/components/common/layout/main/simple-layout';
import { checkToken } from '@/services/auth/check-token';
import Link from 'next/link';

export interface ILoginProps {
    account_name: string;
    password: string;
}

export default function Login(props: ILoginProps) {
    const router = useRouter();
    const [tokenData, setTokenData] = useState<any>(null);
    const [formData, setFormData] = useState<ILoginProps>({
        account_name: '',
        password: '',
    });

    const handleChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                console.log('Thành công', data.token);
                const checkTokenAndSetData = async () => {
                    try {
                        const infoToken = await checkToken(data.token);
                        setTokenData(infoToken);
                    } catch (error: any) {
                        console.error('Error:', error.message);
                    }
                };
                checkTokenAndSetData();
            } else {
                const data = await response.json();
                console.log(data.message);
                console.log('Thất bại');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    useEffect(() => {
        if (tokenData) {
            if (tokenData.userType === 'landlord') {
                router.push('/management');
            } else console.log('hi');
        }
    }, [tokenData]);

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
                    fontSize: '32px',
                    fontFamily: 'Verdana',
                    marginBottom: { xs: '10px', md: '20px' },
                    textAlign: 'center',
                    color: '#A61713',
                    fontWeight: 600,
                    // textTransform: 'uppercase',
                }}
            >
                ĐĂNG NHẬP
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
                <Stack sx={{ gap: '10px' }}>
                    <TextField
                        sx={{
                            width: { xs: '100%', sm: '80%' },
                            display: 'block',
                            textAlign: 'center',
                            mx: 'auto', //margin-x:theo 2 trục chiều ngang trong mui
                        }}
                        type="text"
                        variant="outlined"
                        color="secondary"
                        label="Tên tài khoản"
                        name="account_name"
                        value={formData.account_name}
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
                        label="Mật khẩu"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <FormGroup
                        sx={{
                            width: { xs: '100%', sm: '80%' },
                            display: 'block',
                            mx: 'auto', //margin-x:theo 2 trục chiều ngang trong mui
                        }}
                    >
                        <FormControlLabel
                            control={<Checkbox color="primary" />}
                            label="Nhớ đăng nhập"
                        />
                    </FormGroup>
                    <Stack
                        direction="row"
                        sx={{
                            justifyContent: 'end',
                            gap: '20px',
                            width: { xs: '100%', sm: '90%' },
                        }}
                    >
                        <Link
                            href={'/forgot-password'}
                            style={{ textDecoration: 'none', color: '#2565b9' }}
                        >
                            Quên mật khẩu
                        </Link>
                        <Link
                            href={'/register'}
                            style={{ textDecoration: 'none', color: '#2565b9' }}
                        >
                            Đăng ký mới
                        </Link>
                    </Stack>
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{
                            width: { xs: '100%', sm: '80%' },
                            textAlign: 'center',

                            margin: '10px auto',
                        }}
                    >
                        Gửi
                    </Button>
                </Stack>
            </form>{' '}
        </Stack>
    );
}
Login.Layout = SimpleLayout;
