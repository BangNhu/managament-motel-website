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
import { ReceiptExpense } from '@/types/receipt_expense.type';
import {
    useAddReceiptExpensesMutation,
    useGetReceiptExpenseQuery,
    useUpdateReceiptExpensesMutation,
} from '@/services/receipt-expense.services';
import {
    MotelsResponse,
    useGetMotelsByLandLordQuery,
    useGetMotelsByStaffQuery,
} from '@/services/motel.services';

export interface IAddReceiptExpenseProps {
    handleCloseModal: () => void;
}

const intialState: Omit<ReceiptExpense, 'id'> = {
    reason: '',
    date: '',
    monney: 0,
    transaction_type: 0,
    person: '',
    motel_id: '',
};
export default function AddReceiptExpense(props: IAddReceiptExpenseProps) {
    const tokenData = useTokenData();
    // console.log(tokenData);
    const [formData, setFormData] = useState<Omit<ReceiptExpense, 'id'>>(intialState);
    const [addReceiptExpense, addReceiptExpenseReslut] = useAddReceiptExpensesMutation();
    //lấy danh sách nhà trọ
    const { data: dataMotelLandlord } = useGetMotelsByLandLordQuery(tokenData?.userID);
    const { data: dataMotelStaff } = useGetMotelsByStaffQuery(tokenData?.userID);
    const [motelData, setMotelData] = useState<MotelsResponse | undefined>();
    useEffect(() => {
        if (tokenData?.userType === 'landlord') {
            setMotelData(dataMotelLandlord as MotelsResponse);
        } else if (tokenData?.account_type === 'staff') {
            setMotelData(dataMotelStaff as MotelsResponse);
        }
    }, [dataMotelLandlord, tokenData]);
    const receiptExpenseId = useSelector((state: RootState) => state.receiptExpense.id);

    const { data: receiptExpenseData } = useGetReceiptExpenseQuery(receiptExpenseId, {
        skip: !receiptExpenseId,
    });
    // const { data: staffData } = useGetStaffsByLandlordQuery(tokenData?.userID);
    const [updateReceiptExpense, updateMotelResult] = useUpdateReceiptExpensesMutation();

    // console.log('infodata', motelData?.result);
    // console.log('infodata staff ', staffData?.result);

    useEffect(() => {
        if (receiptExpenseData) {
            setFormData(receiptExpenseData?.result as any);
        }
    }, [receiptExpenseData]);
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
            if (receiptExpenseId) {
                await updateReceiptExpense({
                    body: formData as ReceiptExpense,
                    id: receiptExpenseId,
                }).unwrap();
            } else {
                console.log('formData', formData);

                const result = await addReceiptExpense(formData).unwrap();
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
            {receiptExpenseId !== undefined && receiptExpenseId !== 0 && (
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
                    Cập nhật phiếu
                </Typography>
            )}
            {!Boolean(receiptExpenseId) && (
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
                    Thêm mới phiếu
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
                            name="date"
                            type="date"
                            variant="outlined"
                            color="secondary"
                            label="Ngày lập phiếu"
                            onChange={handleChange}
                            value={formData.date}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name="reason"
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Lý do lập phiếu"
                            onChange={handleChange}
                            value={formData.reason}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name="monney"
                            type="number"
                            variant="outlined"
                            color="secondary"
                            label="Số tiền"
                            onChange={handleChange}
                            value={formData.monney}
                            fullWidth
                            required
                        />
                    </Grid>{' '}
                    <Grid item xs={12} md={6}>
                        <TextField
                            name="person"
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Người lập phiếu"
                            onChange={handleChange}
                            value={formData.person}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth variant="outlined" color="secondary">
                            <InputLabel id="demo-simple-select-label">Loại phiếu</InputLabel>
                            <Select
                                name="transaction_type"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={handleChangeSelect}
                                label="Loại phiếu"
                                value={String(formData.transaction_type)}
                                fullWidth
                            >
                                <MenuItem value={0}>Phiếu thu</MenuItem>
                                <MenuItem value={1}>Phiếu chi</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                {receiptExpenseId !== undefined && receiptExpenseId !== 0 && (
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
                {!Boolean(receiptExpenseId) && (
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
