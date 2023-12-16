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

export interface IAddMotelProps {}

const intialState: Omit<Motel, 'id'> = {
    motel_name: '',
    address: '',
    record_day: 0,
    pay_day: 0,
    staff_id: 0,
    landlord_id: 0,
};
export default function AddMotel(props: IAddMotelProps) {
    const tokenData = useTokenData();

    const [formData, setFormData] = useState<Omit<Motel, 'id'>>(intialState);
    const [addMotel, addMotelReslut] = useAddMotelsMutation();
    const motelId = useSelector((state: RootState) => state.motel.id);

    const { data } = useGetMotelQuery(motelId, { skip: !motelId });
    const [updateMotel, updateMotelResult] = useUpdateMotelsMutation();

    console.log('infodata', data?.result);
    useEffect(() => {
        if (data) {
            setFormData(data?.result as any);
        }
    }, [data]);
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
            await addMotel(formData).unwrap();
        }
        setFormData(intialState);
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
                        <FormControl fullWidth>
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
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                {motelId !== undefined && motelId !== 0 && (
                    <Fragment>
                        <Stack direction="row">
                            <Button variant="outlined" color="secondary" type="submit">
                                Cập nhật
                            </Button>
                            <Button variant="outlined" color="secondary" type="submit">
                                Hủy
                            </Button>
                        </Stack>
                    </Fragment>
                )}
                {!Boolean(motelId) && (
                    <Button variant="outlined" color="secondary" type="submit">
                        Thêm mới
                    </Button>
                )}
            </form>
        </Stack>
    );
}
