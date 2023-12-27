import { SimpleLayout } from '@/components/common/layout/main/simple-layout';
import React, { useState, ChangeEvent, useEffect, Fragment, useRef } from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
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
    FormGroup,
    FormControlLabel,
    Checkbox,
    Modal,
} from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
    useAddContractsMutation,
    useGetContractQuery,
    useUpdateContractsMutation,
} from '@/services/contract.services';
import useTokenData from '@/services/auth/token-data-loader';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useGetStaffsByLandlordQuery } from '@/services/staff.services';
import { Contract } from '@/types/contract.type';
import { useGetMotelQuery } from '@/services/motel.services';
import {
    TenantsResponse,
    useGetTenantsByLandLordQuery,
    useGetTenantsByStaffQuery,
} from '@/services/tenant.services';
import { useGetServicesByLandLordQuery } from '@/services/services.services';
import {
    BedsitsResponse,
    useGetBedsitsByLandLordQuery,
    useGetBedsitsByStaffQuery,
} from '@/services/bedsit.services';
import AddTenant from '../../tenant/form-tenant';
import AddService from '../../services/form-services';
import FormELectricWater from '../../electric-water/form-electric-water';
import { useAddElectricWatersMutation } from '@/services/electric-water.services';
import { ElectricWater } from '@/types/electric-water.type';
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: '50%' },
    maxHeight: '90%',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: '4px 4px 16px rgba(0, 0, 0, 0.25)',
    p: 5,
};
export interface IAddContractProps {
    handleCloseModal: () => void;
}

const intialState: Omit<Contract, 'id' | 'liquidate_day'> = {
    bedsit_id: 0,
    start_day: '',
    end_day: '',
    tenant_represent_id: 0,
    deposits: 0,
    content: '',
    staff_id: 0,
    landlord_id: 0,
};
const intialStateElecWater: Omit<ElectricWater, 'id'> = {
    record_day: '',
    index_electricity: 0,
    index_water: 0,
    bedsit_id: 0,
};
// Khai báo kiểu cho đối tượng checkedItems
interface CheckedItems {
    [key: number]: boolean;
}
export default function AddContract(props: IAddContractProps) {
    //Đóng thêm khách trọ
    const [openTenant, setOpenTenant] = useState(false);
    const handleOpenTenant = () => setOpenTenant(true);
    const handleCloseTenant = () => setOpenTenant(false);
    //Đóng thêm dịch vụ
    const [openService, setOpenService] = useState(false);
    const handleOpenService = () => setOpenService(true);
    const handleCloseService = () => setOpenService(false);
    const tokenData = useTokenData();
    //Lưu chỉ số vào bảng điện nước
    const [addElectricWater, addElectricWaterReslut] = useAddElectricWatersMutation();
    const [formDataELecWater, setFormDataELecWater] =
        useState<Omit<ElectricWater, 'id'>>(intialStateElecWater);

    // console.log(tokenData);
    const [formData, setFormData] = useState<Omit<Contract, 'id' | 'liquidate_day'>>(intialState);
    const [addContract, addContractReslut] = useAddContractsMutation();
    const contractId = useSelector((state: RootState) => state.contract.id);
    console.log('motel id', contractId);
    const { data: contractData } = useGetContractQuery(contractId, { skip: !contractId });
    const { data: staffData } = useGetStaffsByLandlordQuery(tokenData?.userID);

    //Lấy danh sách phòng
    const { data: dataBedsitLandlord } = useGetBedsitsByLandLordQuery(tokenData?.userID);
    const { data: dataBedsitStaff } = useGetBedsitsByStaffQuery(tokenData?.userID);
    const [bedsitData, setBedsitData] = useState<BedsitsResponse | undefined>();
    useEffect(() => {
        if (tokenData?.userType === 'landlord') {
            setBedsitData(dataBedsitLandlord as BedsitsResponse);
        } else if (tokenData?.userType === 'staff') {
            setBedsitData(dataBedsitStaff as BedsitsResponse);
        }
    }, [dataBedsitLandlord, tokenData]);

    //Lấy danh sách khách trọ
    const { data: dataTenantLandlord } = useGetTenantsByLandLordQuery(tokenData?.userID);
    const { data: dataTenantStaff } = useGetTenantsByStaffQuery(tokenData?.userID);
    const [tenantData, setTenantData] = useState<TenantsResponse | undefined>();
    useEffect(() => {
        if (tokenData?.userType === 'landlord') {
            setTenantData(dataTenantLandlord as TenantsResponse);
        } else if (tokenData?.userType === 'staff') {
            setTenantData(dataTenantStaff as TenantsResponse);
        }
    }, [dataTenantLandlord, tokenData]);
    const [tenants, setTenant] = useState<TenantsResponse | undefined>();
    useEffect(() => {
        if (tenantData) setTenant(tenantData);
    }, [tenantData]);
    const [getTenants, setGetTenant] = useState<TenantsResponse | undefined>();
    const [selectedTenant, setSelectedTenant] = useState<string>('');
    const handleChangeSelectTenant = (e: SelectChangeEvent) => {
        const selectedTenantId = parseInt(e.target.value); // Lấy giá trị từ MenuItem được chọn
        setSelectedTenant(selectedTenantId.toString()); // Cập nhật giá trị của selectedTenant
    };
    const handleAddTenant = () => {
        const selectedTenantIndex = tenants?.result.findIndex(
            (item) => String(item.id) === selectedTenant
        );

        if (selectedTenantIndex !== undefined && selectedTenantIndex !== -1) {
            const updatedTenants = tenants?.result.slice() || [];
            const removedTenant = updatedTenants?.splice(selectedTenantIndex, 1) || [];
            setGetTenant({
                result: getTenants?.result
                    ? [...getTenants.result, ...removedTenant]
                    : [...removedTenant],
            });
            setTenant({
                result: updatedTenants,
            });
            setSelectedTenant('');
        }
    };
    const handleRemoveTenant = (removedTenantId: string) => {
        const removedTenantIndex = getTenants?.result.findIndex(
            (item) => String(item.id) === removedTenantId
        );
        if (removedTenantIndex !== undefined && removedTenantIndex !== -1) {
            const updatedGetTenants = getTenants?.result.slice() || [];
            const removedTenant = updatedGetTenants?.splice(removedTenantIndex, 1) || [];
            setTenant({
                result: tenants?.result
                    ? [...tenants.result, ...removedTenant]
                    : [...removedTenant],
            });
            setGetTenant({
                result: updatedGetTenants,
            });
        }
    };
    console.log('infodata tenantData', tenantData?.result);

    //Lấy danh sách dịch vụ nhà trọ sử dụng
    const { data: servicesData } = useGetServicesByLandLordQuery(tokenData?.userID);
    const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = event.target;
        const itemId = Number(id);

        setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            [itemId]: checked,
        }));

        if (checked) {
            // Nếu checkbox được đánh dấu, thêm itemId vào mảng selectedItems
            setSelectedItems((prevSelectedItems) => [...prevSelectedItems, itemId]);
        } else {
            // Nếu checkbox bị hủy đánh dấu, loại bỏ itemId khỏi mảng selectedItems
            setSelectedItems((prevSelectedItems) =>
                prevSelectedItems.filter((item) => item !== itemId)
            );
        }
    };
    const [updateContract, updateContractResult] = useUpdateContractsMutation();

    // console.log('infodata', motelData?.result);
    // console.log('infodata staff ', staffData?.result);

    useEffect(() => {
        if (contractData) {
            setFormData(contractData?.result as any);
        }
    }, [contractData]);
    useEffect(() => {
        if (tokenData) {
            const newFormData = {
                ...intialState,
                landlord_id: tokenData.userID || 0,
            };
            setFormData(newFormData);
        }
    }, [tokenData]);
    //lấy bedsit_id cho bảng điện nước
    useEffect(() => {
        const currentDate = new Date();
        console.log('current date: ' + currentDate);
        const formattedDate = currentDate.toISOString().split('T')[0];
        const newFormData = {
            ...intialStateElecWater,
            bedsit_id: formData.bedsit_id,
            record_day: formattedDate,
        };
        setFormDataELecWater(newFormData);
    }, [formData.bedsit_id]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    //Thay đổi nội dung bảng điện nước
    const handleChangeElecWater = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormDataELecWater((prevFormData) => ({
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
        //Xóa id người đại diện ra khỏi danh sách tenant
        // setTenant((prevTenants) => {
        //     if (!prevTenants?.result) {
        //         // Trường hợp tenants chưa được khởi tạo
        //         return prevTenants;
        //     }
        //     const removedTenantIndex = prevTenants.result.findIndex(
        //         (item) => String(item.id) === value
        //     );
        //     if (removedTenantIndex !== undefined && removedTenantIndex !== -1) {
        //         const updatedTenants = prevTenants.result.slice();
        //         updatedTenants.splice(removedTenantIndex, 1);

        //         return {
        //             ...prevTenants,
        //             result: updatedTenants,
        //         };
        //     }
        //     return prevTenants;
        // });
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (contractId) {
            await updateContract({
                body: formData as Contract,
                id: contractId,
            }).unwrap();
        } else {
            console.log('formData', formData);
            await addContract(formData).unwrap();
            console.log('thành công');
        }
        setFormData(intialState);
        //Lưu Danh sách khách trọ và database
        const tenantList = getTenants?.result || [];
        const bedsitId = formData.bedsit_id;
        const token = window.localStorage.getItem('token');
        const promises = tenantList.map(async (tenant) => {
            const tenantId = tenant.id;
            const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/bedsit/add-bedsit-tenant`;

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token && { Authorization: `Bearer ${token}` }),
                    },
                    body: JSON.stringify({ bedsit_id: bedsitId, tenant_id: tenantId }),
                });

                if (response.ok) {
                    console.log(`Successfully added tenant ${tenantId} to bedsit ${bedsitId}`);
                } else {
                    console.error(
                        `Error adding tenant ${tenantId} to bedsit ${bedsitId}. Status: ${response.status}`
                    );
                }
            } catch (error) {
                console.error(`Error for tenant ${tenantId}:`, error);
            }
        });

        // try {
        //     await Promise.all(promises);
        //     console.log('All requests completed successfully');
        // } catch (error) {
        //     console.error('Error in one or more requests:', error);
        // }

        //Lưu dịch vụ vào CSDL
        //Lưu Danh sách khách trọ và database
        const promisesService = selectedItems.map(async (service) => {
            const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/bedsit/add-bedsit-service`;

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token && { Authorization: `Bearer ${token}` }),
                    },
                    body: JSON.stringify({ bedsit_id: bedsitId, service_id: service }),
                });

                if (response.ok) {
                    console.log(`Successfully added tenant ${service} to bedsit ${bedsitId}`);
                } else {
                    console.error(
                        `Error adding tenant ${service} to bedsit ${bedsitId}. Status: ${response.status}`
                    );
                }
            } catch (error) {
                console.error(`Error for tenant ${service}:`, error);
            }
        });
        //Lưu chỉ số điện nước

        const result = await addElectricWater(formDataELecWater).unwrap();
        setFormDataELecWater(intialStateElecWater);
        console.log('recorđay', formDataELecWater);
        console.log('thành công', result);
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
            {contractId !== undefined && contractId !== 0 && (
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
                    Cập nhật hợp đồng
                </Typography>
            )}
            {!Boolean(contractId) && (
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
                    Tạo hợp đồng
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
                            <InputLabel id="demo-simple-select-label">Phòng</InputLabel>
                            <Select
                                name="bedsit_id"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={handleChangeSelect}
                                label="Phòng"
                                value={String(formData.bedsit_id)}
                                fullWidth
                            >
                                {bedsitData?.result.map((item) => (
                                    <MenuItem value={item.id} key={item.id}>
                                        {`Phòng: ${item.bedsit_name}. Dãy/Tầng: ${item.block_motel_name}. Nhà: ${item.motel_name}`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth variant="outlined" color="secondary">
                            <InputLabel id="demo-simple-select-label">
                                Khách trọ đại diện
                            </InputLabel>
                            <Select
                                name="tenant_represent_id"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={handleChangeSelect}
                                label="Khách trọ đại diện"
                                value={String(formData.tenant_represent_id)}
                                fullWidth
                            >
                                {tenantData?.result.map((item) => (
                                    <MenuItem value={item.id} key={item.id}>
                                        {item.tenant_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name="start_day"
                            type="date"
                            variant="outlined"
                            color="secondary"
                            label="Ngày bắt đầu"
                            onChange={handleChange}
                            value={formData.start_day}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name="end_day"
                            type="date"
                            variant="outlined"
                            color="secondary"
                            label="Ngày kết thúc"
                            onChange={handleChange}
                            value={formData.end_day}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name="deposits"
                            type="number"
                            variant="outlined"
                            color="secondary"
                            label="Tiền đặt cọc"
                            onChange={handleChange}
                            value={formData.deposits}
                            required
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Divider
                    sx={{
                        margin: '3% auto 3% auto',
                        width: '50%',
                        border: '1px solid #d3c8c8',
                        // width: { xs: '100%', sm: '80%' },
                        // textAlign: 'center',
                        // mx: 'auto',
                    }}
                />
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{}}>
                    <Typography sx={{ fontWeight: 'bold', color: '#1c1c1c' }}>
                        Thêm khách trọ
                    </Typography>{' '}
                    <Button
                        onClick={handleOpenTenant}
                        sx={{ textTransform: 'capitalize', bgcolor: '#efcbcb' }}
                    >
                        Thêm mới
                    </Button>
                    <Modal
                        open={openTenant}
                        // onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Stack sx={style}>
                            {' '}
                            {<AddTenant handleCloseModal={handleCloseTenant} />}
                        </Stack>
                    </Modal>
                </Stack>
                <Stack direction="row">
                    <FormControl
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        sx={{ width: { xs: '100%', md: '48%' } }}
                    >
                        <InputLabel id="demo-simple-select-label">Khách phòng trọ</InputLabel>
                        <Select
                            name="staff_id"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={handleChangeSelectTenant}
                            label="Khách trọ"
                            value={selectedTenant}
                            fullWidth
                        >
                            {tenants?.result.map((item) => (
                                <MenuItem value={item.id} key={item.id}>
                                    {item.tenant_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button sx={{ textTransform: 'capitalize' }} onClick={handleAddTenant}>
                        Chọn
                    </Button>
                </Stack>
                <Stack direction="row" sx={{ flexWrap: 'wrap', gap: '15px' }}>
                    {getTenants?.result.map((item) => (
                        <Stack direction="row" key={item.id} sx={{ alignItems: 'center' }}>
                            <Typography sx={{}}> {item.tenant_name}</Typography>
                            <Button sx={{}} onClick={() => handleRemoveTenant(String(item.id))}>
                                <RemoveCircleOutlineIcon />
                            </Button>
                        </Stack>
                    ))}
                </Stack>
                <Divider
                    sx={{
                        margin: '3% auto 3% auto',
                        width: '50%',
                        border: '1px solid #d3c8c8',
                    }}
                />
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{}}>
                    <Typography sx={{ fontWeight: 'bold', color: '#1c1c1c' }}>
                        Chọn dịch vụ
                    </Typography>{' '}
                    <Button
                        onClick={handleOpenService}
                        sx={{ textTransform: 'capitalize', bgcolor: '#efcbcb' }}
                    >
                        Thêm mới
                    </Button>
                    <Modal
                        open={openService}
                        // onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Stack sx={style}>
                            {' '}
                            {<AddService handleCloseModal={handleCloseService} />}
                        </Stack>
                    </Modal>
                </Stack>
                <Stack direction="row" sx={{ flexWrap: 'wrap' }}>
                    {servicesData?.result.map((item) => (
                        <FormGroup key={item.id}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color="primary"
                                        id={String(item.id)}
                                        checked={checkedItems[item.id] || false}
                                        onChange={handleCheckboxChange}
                                    />
                                }
                                label={item.service_name}
                            />
                        </FormGroup>
                    ))}
                </Stack>
                <Divider
                    sx={{
                        margin: '3% auto 3% auto',
                        width: '50%',
                        border: '1px solid #d3c8c8',
                    }}
                />
                <Stack>
                    <Typography sx={{ fontWeight: 'bold', color: '#1c1c1c', marginBottom: '20px' }}>
                        Chỉ số đồng hồ điện, đồng hồ nước
                    </Typography>
                    {/* <FormELectricWater
                        ref={formElectricWaterRef}
                        handleCloseModal={handleCloseService}
                        bedsitId={formData.bedsit_id}
                    /> */}{' '}
                    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="index_electricity"
                                type="number"
                                variant="outlined"
                                color="secondary"
                                label="Chỉ số điện"
                                onChange={handleChangeElecWater}
                                value={formDataELecWater.index_electricity}
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
                                onChange={handleChangeElecWater}
                                value={formDataELecWater.index_water}
                                fullWidth
                                required
                            />
                        </Grid>
                    </Grid>
                </Stack>
                {contractId !== undefined && contractId !== 0 && (
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
                {!Boolean(contractId) && (
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
