import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Paypal from '@/components/button/Paypal';
import { ManagementLayout } from '@/components/common/layout/management';

export interface IPaymentProps {
    // account_type: number;
    // password: string;
}
const AccountType = [
    { name: 'Cơ bản', value: 1, price: 150000 },
    { name: 'Vip 1', value: 2, price: 350000 },
    { name: 'Vip 2', value: 3, price: 700000 },
];

export default function Payment(props: IPaymentProps) {
    const [userType, setUserType] = useState<number>(0);
    const [numberMonth, setNumberMonth] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        const calculateTotal = () => {
            for (let i = 0; i < AccountType.length; i++) {
                if (userType === AccountType[i].value) {
                    const price = numberMonth * AccountType[i].price;
                    setTotal(price);
                }
            }
        };

        // Call the function
        calculateTotal();
    }, [userType, numberMonth]);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };
    return (
        <>
            <Stack
                justifyContent="space-between"
                direction="row"
                sx={{ width: { xs: '95%', md: '80%' }, margin: '8% auto' }}
            >
                <Stack sx={{ width: { md: '40%' }, gap: '20px' }}>
                    <Typography sx={{ color: '#a61713', fontWeight: 'bold', fontSize: '22px' }}>
                        Thông tin thanh toán
                    </Typography>
                    <form>
                        <Stack sx={{ gap: '20px' }}>
                            <FormControl fullWidth variant="outlined" color="secondary">
                                <InputLabel id="demo-simple-select-label">
                                    Loại tài khoản*
                                </InputLabel>
                                <Select
                                    name=""
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    onChange={(e) => setUserType(parseInt(e.target.value))}
                                    label="Loại tài khoản*"
                                    value={String(userType)}
                                    fullWidth
                                >
                                    {AccountType.map((item, index) => (
                                        <MenuItem value={item.value} key={index}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                name=""
                                type="number"
                                variant="outlined"
                                color="secondary"
                                label="Số tháng"
                                onChange={(e) => setNumberMonth(parseInt(e.target.value))}
                                value={String(numberMonth)}
                                required
                                fullWidth
                            />
                        </Stack>
                    </form>
                </Stack>
                <Stack sx={{ width: { md: '40%' }, gap: '20px' }}>
                    <Typography sx={{ color: '#a61713', fontWeight: 'bold', fontSize: '22px' }}>
                        Thông tin thanh toán
                    </Typography>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography>Loại tài khoản</Typography>
                        <Typography>
                            {userType === 1 && 'Cơ bản'}
                            {userType === 2 && 'Vip 1'}
                            {userType === 3 && 'Vip 2'}
                        </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography>Giá tiền</Typography>
                        <Typography>
                            {userType === 1 && '150000đ'}
                            {userType === 2 && '350000đ'}
                            {userType === 3 && '700000đ'}
                        </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography>Số tháng</Typography>
                        <Typography>{numberMonth}</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography>Tổng cộng</Typography>
                        <Typography>{total}</Typography>
                    </Stack>
                    <Stack>
                        <Paypal
                            amount={String(Math.round((total / 23500) * 100) / 100)}
                            type={userType}
                            months={numberMonth}
                        />
                    </Stack>
                </Stack>
            </Stack>
        </>
    );
}
Payment.Layout = ManagementLayout;
