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

import {
    MotelsResponse,
    useGetMotelQuery,
    useGetMotelsByLandLordQuery,
    useGetMotelsByStaffQuery,
} from '@/services/motel.services';
import { useGetBlockMotelsByStaffQuery } from '@/services/block-motel.services';
import { Services } from '@/types/services.type';
import {
    useAddServicesMutation,
    useGetServiceQuery,
    useUpdateServicesMutation,
} from '@/services/services.services';

export interface IAddServiceProps {
    handleCloseModal: () => void;
}

const intialState: Omit<Services, 'id'> = {
    service_name: '',
    price: 0,
    unit: 0,
    is_required: false,
    motel_id: '',
};
export default function AddService(props: IAddServiceProps) {
    const tokenData = useTokenData();
    // console.log(tokenData);
    const [formData, setFormData] = useState<Omit<Services, 'id'>>(intialState);
    const [addService, addServiceReslut] = useAddServicesMutation();
    //lấy danh sách nhà trọ
    const { data: dataMotelLandlord } = useGetMotelsByLandLordQuery(tokenData?.userID);
    const { data: dataMotelStaff } = useGetMotelsByStaffQuery(tokenData?.userID);
    const [motelData, setMotelData] = useState<MotelsResponse | undefined>();
    useEffect(() => {
        if (tokenData?.userType === 'landlord') {
            setMotelData(dataMotelLandlord as MotelsResponse);
        } else if (tokenData?.userType === 'staff') {
            setMotelData(dataMotelStaff as MotelsResponse);
        }
    }, [dataMotelLandlord, tokenData]);
    const serviceId = useSelector((state: RootState) => state.services.id);
    console.log('service id', serviceId);

    const { data: serviceData } = useGetServiceQuery(serviceId, { skip: !serviceId });
    const { data: staffData } = useGetStaffsByLandlordQuery(tokenData?.userID);
    const [updateService, updateMotelResult] = useUpdateServicesMutation();

    // console.log('infodata', motelData?.result);
    // console.log('infodata staff ', staffData?.result);

    useEffect(() => {
        if (serviceData) {
            setFormData(serviceData?.result as any);
        }
    }, [serviceData]);
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
            if (serviceId) {
                await updateService({
                    body: formData as Services,
                    id: serviceId,
                }).unwrap();
            } else {
                console.log('formData', formData);

                const result = await addService(formData).unwrap();
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
            {serviceId !== undefined && serviceId !== 0 && (
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
                    Cập nhật khách trọ
                </Typography>
            )}
            {!Boolean(serviceId) && (
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
                    Thêm mới khách trọ
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
                            name="service_name"
                            id="service_name"
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Tên dịch vụ"
                            onChange={handleChange}
                            value={formData.service_name}
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
                                value={String(formData.motel_id)}
                                fullWidth
                            >
                                {motelData?.result.map((item) => (
                                    <MenuItem value={item.id} key={item.id}>
                                        {item.motel_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name="price"
                            type="number"
                            variant="outlined"
                            color="secondary"
                            label="Giá tiền"
                            onChange={handleChange}
                            value={formData.price}
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth variant="outlined" color="secondary">
                            <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
                            <Select
                                name="unit"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={handleChangeSelect}
                                label="Đơn vị tính"
                                value={String(formData.unit)}
                                fullWidth
                            >
                                <MenuItem value={0}>Theo tháng</MenuItem>
                                <MenuItem value={1}>
                                    Theo số lượng (người, xe, thiết bị,...)
                                </MenuItem>
                                {/* <MenuItem value={2}>Khác</MenuItem> */}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                {serviceId !== undefined && serviceId !== 0 && (
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
                {!Boolean(serviceId) && (
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
