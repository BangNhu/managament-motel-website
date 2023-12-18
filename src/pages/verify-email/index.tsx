import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Alert, CircularProgress, Stack } from '@mui/material';
import Link from 'next/link';
import { SimpleLayout } from '@/components/common/layout/main/simple-layout';

export interface IVerifyEmailProps {}

export default function VerifyEmail(props: IVerifyEmailProps) {
    const router = useRouter();
    const [isVerified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const { email_token } = router.query;
            console.log('token', email_token);

            if (email_token) {
                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/verify-email?email_token=${email_token}`,
                        {
                            method: 'POST',
                        }
                    );

                    if (response.ok) {
                        const data = await response.json();
                        console.log('Data:', data.result.is_verified);
                        setIsVerified(true);
                        console.log('Verification successful');
                    } else {
                        console.log('Verification failed');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        };

        fetchData();
    }, [router.query]);

    return (
        <Stack sx={{ margin: { xs: '20% auto', md: '5% auto' } }}>
            {isVerified ? (
                <Alert severity="success">
                    Email đã được xác nhận. Thực hiện đăng nhập tại đây{' '}
                    <Link href={'/login'}>Đăng nhập tài khoản</Link>
                </Alert>
            ) : (
                <Stack sx={{ gap: '20px' }}>
                    {' '}
                    <Alert severity="info">
                        Chào mừng bạn đến với Hệ thống quản lý nhà trọ NhuTK. Để bắt đầu, hãy xác
                        nhận địa chỉ email của bạn!
                    </Alert>
                    <Alert severity="info">
                        Chúng tôi đã gửi liên kết xác nhận đến email của bạn. Nó có thời hạn 15
                        phút.
                    </Alert>
                </Stack>
            )}

            {/* Các thông tin khác có thể được hiển thị ở đây */}
        </Stack>
    );
}
VerifyEmail.Layout = SimpleLayout;
