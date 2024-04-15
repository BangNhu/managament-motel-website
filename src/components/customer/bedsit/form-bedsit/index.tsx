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
import useTokenData from '@/services/auth/token-data-loader';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useGetStaffsByLandlordQuery, useUpdateStaffsMutation } from '@/services/staff.services';
import { Bedsit } from '@/types/bedsit.type';
import {
    useAddBedsitsMutation,
    useGetBedsitQuery,
    useUpdateBedsitsMutation,
} from '@/services/bedsit.services';
import {
    BlockMotelsResponse,
    useGetBlockMotelsByLandLordQuery,
    useGetBlockMotelsByStaffQuery,
} from '@/services/block-motel.services';

export interface IFormBedsitProps {
    handleCloseModal: () => void;
}

const intialState: Omit<Bedsit, 'id'> = {
    bedsit_name: '',
    block_motel_id: 0,
    status: 0,
    current_quantity: 0,
};
export default function FormBedsit(props: IFormBedsitProps) {
    const tokenData = useTokenData();
    // console.log(tokenData);
    const [formData, setFormData] = useState<Omit<Bedsit, 'id'>>(intialState);
    const [addBedsit, addBedsitReslut] = useAddBedsitsMutation();
    const bedsitId = useSelector((state: RootState) => state.bedsit.id);
    console.log('bedsit id', bedsitId);

    const { data: bedsitData } = useGetBedsitQuery(bedsitId, { skip: !bedsitId });
    const { data: staffData } = useGetStaffsByLandlordQuery(tokenData?.userID);
    const [updateBedsit, updateBedsitResult] = useUpdateBedsitsMutation();

    const { data: dataBlockMotelLandlord } = useGetBlockMotelsByLandLordQuery(tokenData?.userID);
    console.log('dataMotelLandlord', dataBlockMotelLandlord);

    const { data: dataBlockMotelStaff } = useGetBlockMotelsByStaffQuery(tokenData?.userID);
    const [blockMotel, setBlockMotel] = useState<BlockMotelsResponse | undefined>();
    useEffect(() => {
        if (tokenData?.userType === 'landlord') {
            setBlockMotel(dataBlockMotelLandlord as BlockMotelsResponse);
        } else if (tokenData?.userType === 'staff') {
            console.log('đúng rồi');
            setBlockMotel(dataBlockMotelStaff as BlockMotelsResponse);
        }
    }, [tokenData, dataBlockMotelStaff, dataBlockMotelLandlord]);
    // console.log('infodata', motelData?.result);
    // console.log('infodata staff ', staffData?.result);

    useEffect(() => {
        if (bedsitData) {
            setFormData(bedsitData?.result as any);
        }
    }, [bedsitData]);
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

        if (bedsitId) {
            await updateBedsit({
                body: formData as Bedsit,
                id: bedsitId,
            }).unwrap();
        } else {
            console.log('formData', formData);
            const result = await addBedsit(formData).unwrap();
            console.log('thành công', result);
        }

        setFormData(intialState);
        if (props.handleCloseModal) {
            props.handleCloseModal();
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
                    Cập nhật phòng trọ
                </Typography>
            )}
            {!Boolean(bedsitId) && (
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
                    Thêm mới phòng trọ
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
                            name="bedsit_name"
                            id="bedsit_name"
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Tên phòng trọ"
                            onChange={handleChange}
                            value={formData.bedsit_name}
                            fullWidth
                            required
                        />
                    </Grid>{' '}
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth variant="outlined" color="secondary">
                            <InputLabel id="demo-simple-select-label">Dãy trọ</InputLabel>
                            <Select
                                name="block_motel_id"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={handleChangeSelect}
                                label="dãy trọ"
                                value={String(formData.block_motel_id)}
                                fullWidth
                            >
                                {blockMotel?.result.map((item) => (
                                    <MenuItem value={item.id} key={item.id}>
                                        {item.block_motel_name}
                                    </MenuItem>
                                ))}
                                {/* <MenuItem value={0}>Phòng trống</MenuItem>
                                <MenuItem value={1}>Đã thuê</MenuItem>
                                <MenuItem value={2}>Đang đặt cọc</MenuItem> */}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth variant="outlined" color="secondary">
                            <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
                            <Select
                                name="status"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={handleChangeSelect}
                                label="Nhân viên"
                                value={String(formData.status)}
                                fullWidth
                            >
                                {/* {staffData?.result.map((item) => (
                                    <MenuItem value={item.id} key={item.id}>
                                        {item.staff_name}
                                    </MenuItem>
                                ))} */}
                                <MenuItem value={0}>Phòng trống</MenuItem>
                                <MenuItem value={1}>Đã thuê</MenuItem>
                                <MenuItem value={2}>Đang đặt cọc</MenuItem>
                            </Select>
                        </FormControl>
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
                {!Boolean(bedsitId) && (
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
