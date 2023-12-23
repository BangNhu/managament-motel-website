import { SimpleLayout } from '@/components/common/layout/main/simple-layout';
import { useState, ChangeEvent, useEffect, Fragment } from 'react';
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
import { TenantsResponse, useGetTenantsByLandLordQuery } from '@/services/tenant.services';
import { useGetServicesByLandLordQuery } from '@/services/services.services';
import { useGetBedsitsByLandLordQuery } from '@/services/bedsit.services';

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

export default function AddContract(props: IAddContractProps) {
    const tokenData = useTokenData();
    // console.log(tokenData);
    const [formData, setFormData] = useState<Omit<Contract, 'id' | 'liquidate_day'>>(intialState);
    const [addContract, addContractReslut] = useAddContractsMutation();
    const contractId = useSelector((state: RootState) => state.contract.id);
    console.log('motel id', contractId);
    const { data: contractData } = useGetContractQuery(contractId, { skip: !contractId });
    const { data: staffData } = useGetStaffsByLandlordQuery(tokenData?.userID);

    //Lấy phòng
    const { data: bedsitData } = useGetBedsitsByLandLordQuery(tokenData?.userID);

    //Lấy danh sách khách trọ
    const { data: tenantData } = useGetTenantsByLandLordQuery(tokenData?.userID);
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
                        // Include any necessary headers or authentication tokens
                    },
                    body: JSON.stringify({ bedsit_id: bedsitId, tenant_id: tenantId }),
                });

                if (response.ok) {
                    console.log(`Successfully added tenant ${tenantId} to bedsit ${bedsitId}`);
                } else {
                    console.error(
                        `Error adding tenant ${tenantId} to bedsit ${bedsitId}. Status: ${response.status}`
                    );
                    // Handle non-successful response here
                    // throw new Error('Custom error message'); // Uncomment this line if you want to stop execution on error
                }
            } catch (error) {
                console.error(`Error for tenant ${tenantId}:`, error);
                // Handle the error - log it, display a message, etc.
                // throw new Error('Custom error message'); // Uncomment this line if you want to stop execution on error
            }
        });

        try {
            await Promise.all(promises);
            console.log('All requests completed successfully');
        } catch (error) {
            console.error('Error in one or more requests:', error);
            // Handle the error - log it, display a message, etc.
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
                    Cập nhật nhà trọ
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
                            <InputLabel id="demo-simple-select-label">Khách trọ</InputLabel>
                            <Select
                                name="tenant_represent_id"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={handleChangeSelect}
                                label="Khách trọ"
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
                            label="Ngày tính"
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
                <Typography sx={{ fontWeight: 'bold', color: '#1c1c1c' }}>
                    Thêm khách trọ
                </Typography>
                <Stack direction="row">
                    <FormControl fullWidth variant="outlined" color="secondary">
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

                    <Button onClick={handleAddTenant}>Thêm</Button>
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
                        // width: { xs: '100%', sm: '80%' },
                        // textAlign: 'center',
                        // mx: 'auto',
                    }}
                />
                <Typography sx={{ fontWeight: 'bold', color: '#1c1c1c' }}>Chọn dịch vụ</Typography>
                <Stack direction="row" sx={{ flexWrap: 'wrap' }}>
                    {servicesData?.result.map((item) => (
                        <FormGroup key={item.id}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color="primary"
                                        // id="32"
                                        // checked={checkboxStates?.['32'] || false}
                                        // onChange={handleCheckboxChange}
                                    />
                                }
                                label={item.service_name}
                            />
                        </FormGroup>
                    ))}
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
