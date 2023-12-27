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
    FormLabel,
    FormControlLabel,
    Radio,
    RadioGroup,
} from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useTokenData from '@/services/auth/token-data-loader';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useGetStaffsByLandlordQuery } from '@/services/staff.services';
import { Tenant } from '@/types/tenant.type';

import { TextRotationAngleupOutlined } from '@mui/icons-material';
import {
    MotelsResponse,
    useGetMotelQuery,
    useGetMotelsByLandLordQuery,
    useGetMotelsByStaffQuery,
} from '@/services/motel.services';
import { useGetBlockMotelsByStaffQuery } from '@/services/block-motel.services';
import { Landlord } from '@/types/landlord.type';
import {
    useAddLandlordsMutation,
    useGetLandlordQuery,
    useUpdateLandlordsMutation,
} from '@/services/landlord.services';

export interface IAddLandlordProps {
    handleCloseModal: () => void;
}

const intialState: Omit<Landlord, 'id'> = {
    landlord_name: '',
    password: '',
    number_phone: '',
    email: '',
    birthday: '',
    gender: 0,
    account_type: 0,
    expiration_date: '',
    is_verified: false,
};
export default function AddLandlord(props: IAddLandlordProps) {
    const [formData, setFormData] = useState<Omit<Landlord, 'id'>>(intialState);
    const [addLandlord, addLandlordReslut] = useAddLandlordsMutation();
    //lấy danh sách nhà trọ
    const landlordId = useSelector((state: RootState) => state.landlord.id);
    console.log('landlord id', landlordId);

    const { data: landlordData } = useGetLandlordQuery(landlordId, { skip: !landlordId });
    const [updateLandlord, updateMotelResult] = useUpdateLandlordsMutation();

    // console.log('infodata', motelData?.result);
    // console.log('infodata staff ', staffData?.result);

    useEffect(() => {
        if (landlordData) {
            setFormData(landlordData?.result as any);
        }
    }, [landlordData]);
    // useEffect(() => {
    //     if (tokenData) {
    //         const newFormData = {
    //             ...intialState,
    //             landlord_id: tokenData.userID || 0,
    //         };
    //         setFormData(newFormData);
    //     }
    // }, [tokenData]);

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

        try {
            if (landlordId) {
                await updateLandlord({
                    body: formData as Landlord,
                    id: landlordId,
                }).unwrap();
            } else {
                console.log('formData', formData);

                const result = await addLandlord(formData).unwrap();
                console.log('thành công', result);
            }

            setFormData(intialState);
            if (props.handleCloseModal) {
                props.handleCloseModal();
            }
        } catch (error) {
            console.error('Error during mutation:', error);
        }
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
            {landlordId !== undefined && landlordId !== 0 && (
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
                    Cập nhật tài khoản
                </Typography>
            )}
            {!Boolean(landlordId) && (
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
                    Thêm mới tài khoản
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
                            name="landlord_name"
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Tên chủ trọ"
                            onChange={handleChange}
                            value={formData.landlord_name}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth variant="outlined" color="secondary">
                            <InputLabel id="demo-simple-select-label">Nhà trọ</InputLabel>
                            <Select
                                name="motel_id"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={handleChangeSelect}
                                label="Nhà trọ"
                                value={String(formData.account_type)}
                                fullWidth
                            >
                                <MenuItem value={0}>Dùng thử</MenuItem>
                                <MenuItem value={1}>Cơ bản</MenuItem>
                                <MenuItem value={2}>Vip 1</MenuItem>
                                <MenuItem value={2}>Vip 2</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name="birthday"
                            type="date"
                            variant="outlined"
                            color="secondary"
                            label="Ngày sinh"
                            onChange={handleChange}
                            value={formData.birthday}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name="email"
                            type="email"
                            variant="outlined"
                            color="secondary"
                            label="Email"
                            onChange={handleChange}
                            value={formData.email}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name="password"
                            type="password"
                            variant="outlined"
                            color="secondary"
                            label="Mật khẩu"
                            onChange={handleChange}
                            value={formData.password}
                            required
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            name="number_phone"
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Số điện thoại"
                            onChange={handleChange}
                            value={formData.number_phone}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name="expiration_date"
                            type="date"
                            variant="outlined"
                            color="secondary"
                            label="Ngày hết hạn"
                            onChange={handleChange}
                            value={formData.expiration_date}
                            fullWidth
                            required
                        />
                    </Grid>
                    {/* <Grid item xs={12} md={6}>
                        <FormControl fullWidth variant="outlined" color="secondary">
                            <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
                            <Select
                                name="gender"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={handleChangeSelect}
                                label="Giới tính"
                                value={String(formData.gender)}
                                fullWidth
                            >
                                <MenuItem value={0}>Nữ</MenuItem>
                                <MenuItem value={1}>Nam</MenuItem>
                                <MenuItem value={2}>Khác</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid> */}
                </Grid>
                {landlordId !== undefined && landlordId !== 0 && (
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
                            onClick={() => {
                                if (props.handleCloseModal) {
                                    props.handleCloseModal();
                                }
                            }}
                        >
                            Hủy
                        </Button>
                    </Stack>
                )}
                {!Boolean(landlordId) && (
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
                            onClick={handleSubmit}
                        >
                            Thêm mới
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ textTransform: 'capitalize', width: '100px' }}
                            type="submit"
                            onClick={() => {
                                if (props.handleCloseModal) {
                                    props.handleCloseModal();
                                }
                            }}
                        >
                            Hủy
                        </Button>
                    </Stack>
                )}
            </form>
        </Stack>
    );
}
