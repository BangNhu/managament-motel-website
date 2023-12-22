import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import React from 'react';
import { StatsMotel } from './stats-motel';
import { StatsInOut } from './in-out';

export interface IStatsProps {}

export function Stats(props: IStatsProps) {
    return (
        <Stack sx={{ width: { xs: '95%', md: '80%' }, margin: '8% auto' }}>
            {/* <Stack sx={{ height: '100px' }}></Stack> */}
            <Stack direction="row" justifyContent="space-between">
                <FormControl fullWidth variant="outlined" color="secondary" sx={{ width: '20%' }}>
                    <InputLabel id="demo-simple-select-label">Chọn nhà trọ</InputLabel>
                    <Select
                        name="staff_id"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // onChange={handleChangeSelect}
                        label="Nhân viên"
                        // value={String(formData.staff_id)}
                        fullWidth
                    >
                        {/* {staffData?.result.map((item) => (
                                    <MenuItem value={item.id} key={item.id}>
                                        {item.staff_name}
                                    </MenuItem>
                                ))} */}
                        <MenuItem value={10}>Tất cả</MenuItem>
                        <MenuItem value={20}>Hoàng Nam</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
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
                        name="birthday"
                        // value={formData.birthday}
                        // onChange={handleChange}
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
                        name="birthday"
                        // value={formData.birthday}
                        // onChange={handleChange}
                        fullWidth
                        required
                    />
                </Stack>
                <Stack
                    sx={{
                        border: '2px solid #A61713',
                        borderRadius: '8px',
                        color: '#a95353',
                        width: '30%',
                    }}
                >
                    <Typography sx={{ margin: '15px', textAlign: 'center' }}>
                        Gói: Cơ bản. Hạn dùng: 28/01/2024.
                    </Typography>
                </Stack>
            </Stack>
            <StatsMotel />
            <StatsInOut />
        </Stack>
    );
}
