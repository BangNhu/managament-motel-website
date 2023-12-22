import { SimpleLayout } from '@/components/common/layout/main/simple-layout';
import { useState, ChangeEvent } from 'react';
import {
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Stack,
    Divider,
    Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { RegisterForm } from '@/components/register';
import Link from 'next/link';

export interface IRegisterProps {
    landlord_name: string;
    email: string;
    number_phone: string;
    password: string;
    birthday: string;
    gender: number;
}

export default function Register(props: IRegisterProps) {
    const router = useRouter();
    const [formData, setFormData] = useState<IRegisterProps>({
        landlord_name: '',
        email: '',
        number_phone: '',
        password: '',
        birthday: '',
        gender: 0,
    });
    const handleChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('User signed up successfully!');
                // Redirect to the login page after successful signup
                console.log(formData);
                router.push('/verify-email');
            } else {
                console.error('Failed to sign up');
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
                    fontSize: '32px',
                    fontFamily: 'Verdana',
                    marginBottom: { xs: '10px', md: '20px' },
                    textAlign: 'center',
                    color: '#A61713',
                    fontWeight: 600,
                    // textTransform: 'uppercase',
                }}
            >
                ĐĂNG KÝ
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
                            width: { xs: '100%', sm: '80%' },
                            display: 'block',
                            textAlign: 'center',
                            mx: 'auto', //margin-x:theo 2 trục chiều ngang trong mui
                        }}
                        variant="outlined"
                        color="secondary"
                        label="Họ và tên"
                        type="text"
                        name="landlord_name"
                        value={formData.landlord_name}
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
                        variant="outlined"
                        color="secondary"
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
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
                        variant="outlined"
                        color="secondary"
                        label="Số điện thoại"
                        type="tel"
                        name="number_phone"
                        value={formData.number_phone}
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
                        variant="outlined"
                        color="secondary"
                        label="Ngày sinh"
                        type="date"
                        name="birthday"
                        value={formData.birthday}
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
                        variant="outlined"
                        color="secondary"
                        label="Mật khẩu"
                        type="password"
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
                        variant="outlined"
                        color="secondary"
                        label="Nhập lại mật khẩu"
                        type="password"
                        name="password"
                        // value={formData.password}
                        // onChange={handleChange}
                        fullWidth
                        required
                    />
                    <Stack
                        direction="row"
                        sx={{
                            justifyContent: 'end',
                            gap: '20px',
                            width: { xs: '100%', sm: '90%' },
                        }}
                    >
                        <Link href={'/login'} style={{ textDecoration: 'none', color: '#2565b9' }}>
                            Bạn đã có tài khoản? Đăng nhập tại đây.
                        </Link>
                    </Stack>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{ width: { xs: '100%', sm: '80%' }, textAlign: 'center', mx: 'auto' }}
                    >
                        Đăng ký
                    </Button>
                </Stack>
            </form>
            {/* <RegisterForm /> */}
        </Stack>
    );
}
Register.Layout = SimpleLayout;
