import { SimpleLayout } from '@/components/common/layout/main/simple-layout';
import { useState, ChangeEvent, useEffect, Fragment } from 'react';
import {
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Stack,
    Grid,
    Typography,
    SelectChangeEvent,
    Divider,
} from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Motel } from '@/types/motel.type';
import {
    useAddMotelsMutation,
    useGetMotelQuery,
    useUpdateMotelsMutation,
} from '@/services/motel.services';
import useTokenData from '@/services/auth/token-data-loader';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useGetStaffsByLandlordQuery } from '@/services/staff.services';

export interface IAddMotelProps {
    // handleCloseModal: () => void;
}

const intialState: Omit<Motel, 'id' | 'staff_name' | 'price_water' | 'price_electricity'> = {
    motel_name: '',
    address: '',
    record_day: 0,
    pay_day: 0,
    staff_id: 0,
    landlord_id: 0,
    // staff_name: '',
};
export default function AddMotel(props: IAddMotelProps) {
    const tokenData = useTokenData();
    // console.log(tokenData);
    const [formData, setFormData] =
        useState<Omit<Motel, 'id' | 'staff_name' | 'price_water' | 'price_electricity'>>(
            intialState
        );
    const [addMotel, addMotelReslut] = useAddMotelsMutation();
    const motelId = useSelector((state: RootState) => state.motel.id);
    console.log('motel id', motelId);

    const { data: motelData } = useGetMotelQuery(motelId, { skip: !motelId });
    const { data: staffData } = useGetStaffsByLandlordQuery(tokenData?.userID);
    const [updateMotel, updateMotelResult] = useUpdateMotelsMutation();

    // console.log('infodata', motelData?.result);
    // console.log('infodata staff ', staffData?.result);

    useEffect(() => {
        if (motelData) {
            setFormData(motelData?.result as any);
        }
    }, [motelData]);
    useEffect(() => {
        if (tokenData) {
            const newFormData = {
                ...intialState,
                landlord_id: tokenData.userID || 0,
            };
            setFormData(newFormData);
        }
    }, [tokenData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const handleChangeSelect = (e: SelectChangeEvent) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (motelId) {
            await updateMotel({
                body: formData as Motel,
                id: motelId,
            }).unwrap();
        } else {
            console.log('formData', formData);
            await addMotel(formData).unwrap();
            console.log('thành công');
        }

        setFormData(intialState);
        // if (props.handleCloseModal) {
        //     props.handleCloseModal();
        // }
    };

    return (
        <Stack
            sx={{
                // width: { xs: '90%', md: '50%' },
                // // margin: { xs: '20% auto', md: '10% auto 0 auto ' },
                // mx: 'auto',
                borderRadius: '8px',
                // border: '2px solid #A61713',
                padding: '2% 5%',
                // boxShadow: '4px 4px 16px rgba(0, 0, 0, 0.25)',
            }}
        >
            {' '}
            {motelId !== undefined && motelId !== 0 && (
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: '22px',
                        fontFamily: 'Verdana',
                        marginBottom: { xs: '10px', md: '20px' },
                        textAlign: 'center',
                        color: '#A61713',
                        fontWeight: 600,
                        // textTransform: 'uppercase',
                    }}
                >
                    Cập nhật nhà trọ
                </Typography>
            )}
            {!Boolean(motelId) && (
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: '22px',
                        fontFamily: 'Verdana',
                        marginBottom: { xs: '10px', md: '20px' },
                        textAlign: 'center',
                        color: '#A61713',
                        fontWeight: 600,
                        // textTransform: 'uppercase',
                    }}
                >
                    Thêm mới nhà trọ
                </Typography>
            )}
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
                <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name="motel_name"
                            id="motel_name"
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Tên khu trọ"
                            onChange={handleChange}
                            value={formData.motel_name}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name="address"
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Địa chỉ"
                            onChange={handleChange}
                            value={formData.address}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name="record_day"
                            type="number"
                            variant="outlined"
                            color="secondary"
                            label="Ngày ghi"
                            onChange={handleChange}
                            value={formData.record_day}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name="pay_day"
                            type="number"
                            variant="outlined"
                            color="secondary"
                            label="Ngày tính"
                            onChange={handleChange}
                            value={formData.pay_day}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {/* <TextField
                            name="staff_id"
                            type="number"
                            variant="outlined"
                            color="secondary"
                            label="Nhân viên"
                            onChange={handleChange}
                            value={formData.staff_id}
                            fullWidth
                            required
                            sx={{ mb: 4 }}
                        /> */}
                        <FormControl fullWidth variant="outlined" color="secondary">
                            <InputLabel id="demo-simple-select-label">Nhân viên</InputLabel>
                            <Select
                                name="staff_id"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={handleChangeSelect}
                                label="Nhân viên"
                                value={String(formData.staff_id)}
                                fullWidth
                            >
                                {staffData?.result.map((item) => (
                                    <MenuItem value={item.id} key={item.id}>
                                        {item.staff_name}
                                    </MenuItem>
                                ))}
                                {/* <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem> */}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                {motelId !== undefined && motelId !== 0 && (
                    <Stack
                        direction="row"
                        justifyContent="center"
                        spacing={3}
                        sx={{ margin: { xs: '10px auto 0', sm: '30px auto 0' } }}
                    >
                        <Button
                            variant="contained"
                            sx={{ textTransform: 'capitalize', width: '100px' }}
                            type="submit"
                        >
                            Cập nhật
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ textTransform: 'capitalize', width: '100px' }}
                            type="submit"
                            // onClick={() => {
                            //     if (props.handleCloseModal) {
                            //         props.handleCloseModal();
                            //     }
                            // }}
                        >
                            Hủy
                        </Button>
                    </Stack>
                )}
                {!Boolean(motelId) && (
                    <Stack
                        direction="row"
                        justifyContent="center"
                        spacing={3}
                        sx={{ margin: { xs: '10px auto 0', sm: '30px auto 0' } }}
                    >
                        <Button
                            variant="contained"
                            sx={{ textTransform: 'capitalize', width: '100px' }}
                            type="submit"
                        >
                            Thêm mới
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ textTransform: 'capitalize', width: '100px' }}
                            type="submit"
                            // onClick={() => {
                            //     if (props.handleCloseModal) {
                            //         props.handleCloseModal();
                            //     }
                            // }}
                        >
                            Hủy
                        </Button>
                    </Stack>
                )}
            </form>
        </Stack>
    );
}
