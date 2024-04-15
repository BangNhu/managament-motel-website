import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { StatsMotel } from './stats-motel';
import { StatsInOut } from './in-out';
import { ChartElectricWater } from './electric_water';
import {
    MotelsResponse,
    useGetMotelsByLandLordQuery,
    useGetMotelsByStaffQuery,
} from '@/services/motel.services';
import useTokenData from '@/services/auth/token-data-loader';
import { useGetStaffsByLandlordQuery } from '@/services/staff.services';

export interface IStatsProps {}
interface InfoFormData {
    input_id: number;
    start_day: string;
    end_day: string;
}
const intialState: InfoFormData = {
    input_id: 0,
    start_day: '',
    end_day: '',
};

interface dataMotel {
    blockMotelCount: number;
    bedsitCount: number;
    bedsitEmpty: number;
    bedsitHired: number;
    bedsitDeposit: number;
    tenantCount: number;
}
const intialStateMotel: dataMotel = {
    blockMotelCount: 0,
    bedsitCount: 0,
    bedsitEmpty: 0,
    bedsitHired: 0,
    bedsitDeposit: 0,
    tenantCount: 0,
};
interface dataBill {
    billTotal: number;
    recepitIn: number;
    recepitOut: number;
    billUnPaidCount: number;
    billPaidCount: number;
}
const intialStatBill: dataBill = {
    billTotal: 0,
    recepitIn: 0,
    recepitOut: 0,
    billUnPaidCount: 0,
    billPaidCount: 0,
};
export function Stats(props: IStatsProps) {
    let token: string | null;

    if (typeof window !== 'undefined') {
        token = window.localStorage.getItem('token');
    }
    const tokenData = useTokenData();
    const [formData, setFormData] = useState<InfoFormData>(intialState);
    const [dataMotel, setDataMotel] = useState<dataMotel>(intialStateMotel);
    const [dataBill, setDataBill] = useState<dataBill>(intialStatBill);
    const [chartData, setChartData] = React.useState([]);
    const { data: dataMotelLandlord } = useGetMotelsByLandLordQuery(tokenData?.userID);
    const { data: dataMotelStaff } = useGetMotelsByStaffQuery(tokenData?.userID);
    const [motelData, setMotelData] = useState<MotelsResponse | undefined>();
    const { data: dataStaffLandlord } = useGetStaffsByLandlordQuery(tokenData?.userID);
    useEffect(() => {
        if (tokenData?.userType === 'landlord') {
            setMotelData(dataMotelLandlord as MotelsResponse);
        } else if (tokenData?.userType === 'staff') {
            setMotelData(dataMotelStaff as MotelsResponse);
        }
    }, [dataMotelLandlord, tokenData]);
    let landlordId: number | undefined;
    useEffect(() => {
        if (tokenData?.userType === 'landlord') {
            landlordId = tokenData?.userID;
        } else if (tokenData?.userType === 'staff') {
            const landlord_id = dataStaffLandlord?.result[0].landlord_id;
            landlordId = landlord_id;
        }
    }, [dataMotelLandlord, tokenData]);
    console.log('landlordid', landlordId);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    console.log(landlordId);
    const handleChangeSelect = (e: SelectChangeEvent) => {
        const { name, value } = e.target;
        const selectedValue = value === '0' ? landlordId : value;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: selectedValue,
        }));
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        console.log('form data', formData);
        let apiUrl;
        if (formData.input_id == 0)
            apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/statistical/get-all-electric-water`;
        else {
            apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/statistical/get-electric-water`;
        }

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: formData.input_id,
                    start_day: formData.start_day,
                    end_day: formData.end_day,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setChartData(data);
                console.log('data sơ đồ', data);
            } else {
                console.error('Failed to create PDF');
            }
        } catch (error) {
            console.error('Error:', error);
        }

        //motel
        let apiUrlMotel;

        if (formData.input_id == 0)
            apiUrlMotel = `${process.env.NEXT_PUBLIC_API_URL}/statistical/info-all-motel/${formData.input_id}`;
        else {
            apiUrlMotel = `${process.env.NEXT_PUBLIC_API_URL}/statistical/info-motel/${formData.input_id}`;
        }

        try {
            const response = await fetch(apiUrlMotel, {
                method: 'GET',
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setDataMotel(data);
                console.log('data nhà trọ', data);
            } else {
                console.error('Failed to create PDF');
            }
        } catch (error) {
            console.error('Error:', error);
        }

        //bill
        let apiUrlBill;
        if (formData.input_id == 0)
            apiUrlBill = `${process.env.NEXT_PUBLIC_API_URL}/statistical/all-in-out`;
        else {
            apiUrlBill = `${process.env.NEXT_PUBLIC_API_URL}/statistical/in-out`;
        }

        try {
            const response = await fetch(apiUrlBill, {
                method: 'POST',
                headers: {
                    // Kiểm tra nếu có token, thì thêm vào header Authorization
                    ...(token && { Authorization: `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: formData.input_id,
                    start_day: formData.start_day,
                    end_day: formData.end_day,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setDataBill(data);
                console.log('data bill', data);
            } else {
                console.error('Failed to create PDF');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <Stack sx={{ width: { xs: '95%', md: '80%' }, margin: '8% auto' }}>
            {/* <Stack sx={{ height: '100px' }}></Stack> */}
            <Stack direction="row" justifyContent="space-between">
                <FormControl fullWidth variant="outlined" color="secondary" sx={{ width: '20%' }}>
                    <InputLabel id="demo-simple-select-label">Chọn nhà trọ</InputLabel>
                    <Select
                        name="input_id"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={handleChangeSelect}
                        label="Nhà trọ"
                        value={String(formData.input_id)}
                        fullWidth
                    >
                        <MenuItem value={0}>Tất cả</MenuItem>
                        {motelData?.result.map((item) => (
                            <MenuItem value={item.id} key={item.id}>
                                {item.motel_name}
                            </MenuItem>
                        ))}
                        {/* <MenuItem value={10}>Tất cả</MenuItem>
                        <MenuItem value={20}>Hoàng Nam</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem> */}
                    </Select>
                </FormControl>
                <Stack direction="row" sx={{ gap: '10px' }}>
                    <TextField
                        sx={{
                            width: { xs: '100%', sm: '50%' },
                            display: 'block',
                            textAlign: 'center',
                            mx: 'auto', //margin-x:theo 2 trục chiều ngang trong mui
                        }}
                        variant="outlined"
                        color="secondary"
                        label="Ngày bắt đầu"
                        type="date"
                        name="start_day"
                        value={formData.start_day}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        sx={{
                            width: { xs: '100%', sm: '50%' },
                            display: 'block',
                            textAlign: 'center',
                            mx: 'auto', //margin-x:theo 2 trục chiều ngang trong mui
                        }}
                        variant="outlined"
                        color="secondary"
                        label="Ngày kết thúc"
                        type="date"
                        name="end_day"
                        value={formData.end_day}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <Button variant="contained" type="submit" onClick={handleSubmit}>
                        Lọc
                    </Button>
                </Stack>
                {/* <Stack
                    sx={{
                        border: '2px solid #A61713',
                        borderRadius: '8px',
                        color: '#a95353',
                        width: '30%',
                    }}
                >
                    <Typography sx={{ margin: '15px', textAlign: 'center' }}>
                        Gói: Vip 2. Hạn dùng: 28/03/2024.
                    </Typography>
                </Stack> */}
            </Stack>
            <StatsMotel data={dataMotel} />
            <StatsInOut data={dataBill} />
            {/* <ChartElectricWater chartData={chartData} /> */}
        </Stack>
    );
}
