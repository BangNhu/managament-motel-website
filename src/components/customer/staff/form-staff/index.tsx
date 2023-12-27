import useTokenData from '@/services/auth/token-data-loader';
import {
    useAddStaffsMutation,
    useGetStaffQuery,
    useUpdateStaffsMutation,
} from '@/services/staff.services';
import { RootState } from '@/store';
import { Staff } from '@/types/staff.type';
import {
    Button,
    Divider,
    Grid,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export interface IFormStaffProps {
    handleCloseModal: () => void;
}

const intialState: Omit<Staff, 'id'> = {
    staff_name: '',
    citizen_identification: '',
    address: '',
    number_phone: '',
    email: '',
    landlord_id: 0,
    password: '',
    gender: 0,
    birthday: '',
};
export default function FormStaff(props: IFormStaffProps) {
    const tokenData = useTokenData();
    // console.log(tokenData);
    const [formData, setFormData] = useState<Omit<Staff, 'id'>>(intialState);
    const [addStaff, addStaffReslut] = useAddStaffsMutation();
    const staffId = useSelector((state: RootState) => state.staff.id);
    console.log('staff id', staffId);

    const { data: staffData } = useGetStaffQuery(staffId, { skip: !staffId });
    const [updateStaff, updateStaffResult] = useUpdateStaffsMutation();

    // console.log('infodata', motelData?.result);
    // console.log('infodata staff ', staffData?.result);

    useEffect(() => {
        if (staffData) {
            setFormData(staffData?.result as any);
        }
    }, [staffData]);
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

        if (staffId) {
            await updateStaff({
                body: formData as Staff,
                id: staffId,
            }).unwrap();
        } else {
            console.log('formData', formData);
            await addStaff(formData).unwrap();
            console.log('thành công');
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
            {staffId !== undefined && staffId !== 0 && (
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
                    Cập nhật nhân viên
                </Typography>
            )}
            {!Boolean(staffId) && (
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
                    Thêm mới nhân viên
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
                            id="staff_name"
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Tên khu trọ"
                            onChange={handleChange}
                            value={formData.staff_name}
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
                            name="citizen_identification"
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Số định danh"
                            onChange={handleChange}
                            value={formData.citizen_identification}
                            fullWidth
                            required
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
                </Grid>
                {staffId !== undefined && staffId !== 0 && (
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
                {!Boolean(staffId) && (
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
