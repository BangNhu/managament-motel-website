import useTokenData from '@/services/auth/token-data-loader';
import {
    useAddElectricWatersMutation,
    useGetElectricWaterQuery,
    useUpdateElectricWatersMutation,
} from '@/services/electric-water.services';
import { RootState } from '@/store';
import { ElectricWater } from '@/types/electric-water.type';
import {
    Button,
    Divider,
    Grid,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export interface IFormELectricWaterProps {
    handleCloseModal: () => void;
}

const intialState: Omit<ElectricWater, 'id'> = {
    record_day: '',
    index_electricity: 0,
    index_water: 0,
    bedsit_id: 0,
};
export default function FormELectricWater(props: IFormELectricWaterProps) {
    const tokenData = useTokenData();
    // console.log(tokenData);
    const [formData, setFormData] = useState<Omit<ElectricWater, 'id'>>(intialState);
    const [addElectricWater, addElectricWaterReslut] = useAddElectricWatersMutation();
    const bedsitId = useSelector((state: RootState) => state.bedsit.id);
    const electricWaterId = useSelector((state: RootState) => state.electricWater.id);
    console.log('bedsitId id', electricWaterId);

    const { data: electricWaterData } = useGetElectricWaterQuery(electricWaterId, {
        skip: !electricWaterId,
    });
    // const [updateTenant, updateMotelResult] = useUpdateElectricWatersMutation();

    // console.log('infodata', motelData?.result);
    // console.log('infodata staff ', staffData?.result);

    //Lấy tháng năm hiện tại bỏ xuống Typography cho người dùng biết thời gian thêm
    const currentDate: Date = new Date();

    const currentDay: number = currentDate.getDate();
    const currentMonth: number = currentDate.getMonth() + 1; // Lưu ý: getMonth trả về index từ 0 đến 11
    const currentYear: number = currentDate.getFullYear();
    const formattedDate: string = `${currentDay.toString().padStart(2, '0')}/${currentMonth
        .toString()
        .padStart(2, '0')}/${currentYear}`; //đảm bảo có 2 số với padStart (ex: 03)
    useEffect(() => {
        if (electricWaterData) {
            setFormData(electricWaterData?.result as any);
        }
    }, [electricWaterData]);
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
    //lấy bedsit_id cho bảng điện nước
    useEffect(() => {
        const currentDate = new Date();
        console.log('current date: ' + currentDate);
        const formattedDate = currentDate.toISOString().split('T')[0];
        const newFormData = {
            ...intialState,
            bedsit_id: bedsitId,
            record_day: formattedDate,
        };
        setFormData(newFormData);
    }, []);

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        try {
            if (bedsitId) {
                const result = await addElectricWater(formData).unwrap();
                console.log('thành công', result);
            } else {
                console.log('formData', formData);
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
            {bedsitId !== undefined && bedsitId !== 0 && (
                <Stack>
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
                        Chốt điện nước
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
                </Stack>
            )}
            {!Boolean(electricWaterId) && (
                <Stack>
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
                        {/*  Thêm mới khách trọ */}
                    </Typography>
                    {/* <Divider
                        sx={{
                            margin: '0 0 5% 0',
                            border: '1px solid #cb5656',
                          
                        }}
                    />*/}
                </Stack>
            )}
            <form onSubmit={handleSubmit} action="/login">
                <Stack
                    sx={{
                        border: '2px solid #a61713',
                        width: '200px',
                        height: '40px',
                        borderRadius: '8px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 1,
                        marginBottom: '30px',
                        color: '#2f2f3a',
                    }}
                >
                    <Typography>NGÀY CHỐT {formattedDate}</Typography>
                </Stack>
                <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {/* <Grid item xs={12} md={6}>
                        <TextField
                            name="bedsit_id"
                            id="motel_name"
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Tên khách trọ"
                            onChange={handleChange}
                            value={formData.bedsit_id}
                            fullWidth
                            required
                        />
                    </Grid> */}

                    {/* <Grid item xs={12} md={6}>
                        <TextField
                            name="record_day"
                            type="date"
                            variant="outlined"
                            color="secondary"
                            label="Ngày ghi"
                            onChange={handleChange}
                            value={formData.record_day}
                            fullWidth
                            required
                        />
                    </Grid> */}

                    <Grid item xs={12} md={6}>
                        <TextField
                            name="index_electricity"
                            type="number"
                            variant="outlined"
                            color="secondary"
                            label="Chỉ số điện"
                            onChange={handleChange}
                            value={formData.index_electricity}
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            name="index_water"
                            type="number"
                            variant="outlined"
                            color="secondary"
                            label="Chỉ số nước"
                            onChange={handleChange}
                            value={formData.index_water}
                            fullWidth
                            required
                        />
                    </Grid>
                </Grid>
                {bedsitId !== undefined && bedsitId !== 0 && (
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
                            Lưu
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
                {!Boolean(electricWaterId) && (
                    <Stack
                        direction="row"
                        justifyContent="center"
                        spacing={3}
                        sx={{ margin: { xs: '10px auto 0', sm: '30px auto 0' } }}
                    >
                        {/* <Button
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
                        </Button> */}
                    </Stack>
                )}
            </form>
        </Stack>
    );
}
