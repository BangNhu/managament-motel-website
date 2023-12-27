import { Button, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import * as React from 'react';
import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
    useAddBillsMutation,
    useGetBillsOldNewQuery,
    useGetBillsPriceBedsitQuery,
    useGetBillsServiceBedsitQuery,
} from '@/services/bill.services';
import { Bill } from '@/types/bill.type';
export interface IFormBillProps {
    handleCloseModal: () => void;
}
const intialState: Omit<Bill, 'id'> = {
    bedsit_id: 0,
    create_day: '',
    pay_day: '',
    total_price_service: 0,
    electronic_money: 0,
    water_money: 0,
    costs_incurred: 0,
    old_debt: 0,
    total: 0,
    status: 0,
    note: '',
};
export function FormBill(props: IFormBillProps) {
    const bedsitId = useSelector((state: RootState) => state.bedsit.id);
    const { data: dataElectricWater } = useGetBillsOldNewQuery(bedsitId);
    const { data: dataServiceBedsit } = useGetBillsServiceBedsitQuery(bedsitId);
    const { data: dataPriceBedsit } = useGetBillsPriceBedsitQuery(bedsitId);

    //Dữ liệu bảng điện nước
    const titleHeaderTable = [
        'Tên chi phí',
        'Đơn giá',
        'Số mới',
        'Số cũ',
        'Đơn vị tính',
        'Số dùng',
        'Thành tiền',
    ];
    const priceElectric = dataPriceBedsit?.result[0].price_electricity ?? 0;
    const priceWater = dataPriceBedsit?.result[0].price_water ?? 0;
    const priceBedsit = dataPriceBedsit?.result[0].price ?? 0;
    const indexElectricNew = dataElectricWater?.result.index_electric_new ?? 0;
    const indexWaterNew = dataElectricWater?.result.index_water_new ?? 0;
    const indexElectricOld = dataElectricWater?.result.index_electric_old ?? 0;
    const indexWaterOld = dataElectricWater?.result.index_water_old ?? 0;
    const amountElectric = dataElectricWater?.result.amount_electric ?? 0;
    const amountWater = dataElectricWater?.result.amount_water ?? 0;
    const totalElectric = priceElectric * amountElectric;
    const totalWater = priceWater * amountWater;
    const priceBesit = dataPriceBedsit?.result[0].price ?? 0;
    const totalService = dataServiceBedsit?.result.reduce(
        (acc: any, service: { price: any }) => acc + service.price,
        0
    );

    const rowElectric = [
        'Điện',
        priceElectric,
        indexElectricNew,
        indexElectricOld,
        'đ/kWh',
        amountElectric,
        totalElectric,
    ];
    const rowWater = [
        'Nước',
        priceWater,
        indexWaterNew,
        indexWaterOld,
        'đ/khối',
        amountWater,
        totalWater,
    ];
    //Lấy dữ liệu bảng dịch vụ
    const titleHeaderService = ['Tên chi phí', 'Đơn giá', 'Đơn vị tính', 'Số lượng', 'Thành tiền'];

    //Lấy tháng năm hiện tại bỏ xuống Typography cho người dùng biết thời gian thêm
    const currentDate: Date = new Date();
    const formattedDateInput = currentDate.toISOString().split('T')[0];
    const currentDay: number = currentDate.getDate();
    const currentMonth: number = currentDate.getMonth() + 1; // Lưu ý: getMonth trả về index từ 0 đến 11
    const currentYear: number = currentDate.getFullYear();
    const formattedDate: string = `${currentDay.toString().padStart(2, '0')}/${currentMonth
        .toString()
        .padStart(2, '0')}/${currentYear}`; //đảm bảo có 2 số với padStart (ex: 03)
    let token: string | null;

    if (typeof window !== 'undefined') {
        token = window.localStorage.getItem('token');
    }

    //Lưu hóa đơn
    const [formData, setFormData] = React.useState<Omit<Bill, 'id'>>(intialState);
    const [addBill, addBillResult] = useAddBillsMutation();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const total =
        totalElectric +
        totalWater +
        priceBesit +
        totalService +
        parseInt(formData.old_debt.toString(), 10) +
        parseInt(formData.costs_incurred.toString(), 10);
    React.useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            bedsit_id: bedsitId,
            create_day: formattedDateInput,
            total_price_service: totalService,
            electronic_money: totalElectric,
            water_money: totalWater,
            total: total,
            status: 0,
            old_debt: formData.old_debt,
            costs_incurred: formData.costs_incurred,
            note: formData.note,
        }));
    }, [bedsitId, formattedDateInput, totalService, totalElectric, totalWater, total]);

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        try {
            const result = await addBill(formData).unwrap();
            console.log('thành công', result);
        } catch (error) {
            console.error('Error:', error);
        }
        if (props.handleCloseModal) {
            props.handleCloseModal();
        }
    };
    return (
        <Stack
            sx={{
                borderRadius: '8px',
                padding: '2% 5%',
            }}
        >
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
                    Lập hóa đơn
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
            <Stack direction={{ xs: 'column', md: 'row' }} sx={{ gap: { xs: '0', md: '10px' } }}>
                <Stack
                    sx={{
                        border: '2px solid #a61713',
                        padding: '5px',
                        height: '40px',
                        borderRadius: '8px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 1,
                        marginBottom: { xs: '10px', md: '30px' },
                        color: '#2f2f3a',
                    }}
                >
                    <Typography>
                        NGÀY LẬP HÓA ĐƠN:{' '}
                        <Typography component="span" sx={{ fontWeight: 'bold', color: '#a61713' }}>
                            {formattedDate}
                        </Typography>
                    </Typography>
                </Stack>
                <Stack
                    sx={{
                        border: '2px solid #0b3944',
                        padding: '5px',
                        height: '40px',
                        borderRadius: '8px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 1,
                        marginBottom: '30px',
                        color: '#2f2f3a',
                    }}
                >
                    <Typography>
                        PHÒNG:{' '}
                        <Typography component="span" sx={{ fontWeight: 'bold', color: '#a61713' }}>
                            {/* {`${dataPriceBedsit?.result[0].bedsit_name} - ${dataPriceBedsit?.result[0].block_motel_name} - ${dataPriceBedsit?.result[0].motel_name}`} */}
                            {`${dataPriceBedsit?.result[0].bedsit_name}`}
                        </Typography>
                    </Typography>
                </Stack>
            </Stack>
            <Typography sx={{ fontWeight: 'bold', fontSize: '17px', marginBottom: '10px' }}>
                Bảng Điện Nước
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ border: '1px solid #1c1c1c' }}>
                    <TableHead
                        sx={{
                            backgroundColor: '#a48e8e',
                        }}
                    >
                        <TableRow>
                            {titleHeaderTable.map((item, index) => (
                                <TableCell key={index} sx={{ fontWeight: 'bold', color: '#fff' }}>
                                    {item}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            {rowElectric.map((item, index) => (
                                <TableCell key={index} sx={{}}>
                                    {item}
                                </TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            {rowWater.map((item, index) => (
                                <TableCell key={index} sx={{}}>
                                    {item}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography sx={{ fontWeight: 'bold', fontSize: '17px', margin: '10px 0' }}>
                Bảng Dịch Vụ
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ border: '1px solid #1c1c1c' }}>
                    <TableHead
                        sx={{
                            backgroundColor: '#a48e8e',
                        }}
                    >
                        <TableRow>
                            {titleHeaderService.map((item, index) => (
                                <TableCell key={index} sx={{ fontWeight: 'bold', color: '#fff' }}>
                                    {item}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataServiceBedsit?.result.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.service_name}</TableCell>
                                <TableCell>{item.price}</TableCell>
                                <TableCell>
                                    {item.unit === 0 ? 'Theo tháng' : 'Theo số lượng'}
                                </TableCell>
                                <TableCell>{item.unit === 0 ? null : <TextField />}</TableCell>
                                <TableCell>{item.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack direction="row" justifyContent="space-between" sx={{ margin: '20px 0 5px 0' }}>
                <Typography sx={{}}>Tiền phòng</Typography>
                <Typography sx={{}}>{priceBesit}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" sx={{ margin: '5px 0' }}>
                <Typography sx={{}}>Chi phí phát sinh</Typography>
                <input
                    name="costs_incurred"
                    onChange={handleChange}
                    value={formData.costs_incurred}
                    type="number"
                    style={{ textAlign: 'end' }}
                ></input>
            </Stack>{' '}
            <Stack direction="row" justifyContent="space-between" sx={{ margin: '5px 0' }}>
                <Typography sx={{}}>Nợ cũ</Typography>
                <input
                    name="old_debt"
                    onChange={handleChange}
                    value={formData.old_debt}
                    type="number"
                    style={{ textAlign: 'end' }}
                ></input>
            </Stack>{' '}
            <Stack direction="row" justifyContent="space-between" sx={{ margin: '5px 0' }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Tổng cộng</Typography>
                <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>{total}</Typography>
            </Stack>
            <TextField
                name="note"
                type="text"
                variant="outlined"
                color="secondary"
                label="Ghi chú"
                onChange={handleChange}
                value={formData.note}
                fullWidth
            />
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
        </Stack>
    );
}
