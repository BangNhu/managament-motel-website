import useTokenData from '@/services/auth/token-data-loader';
import { useAddMotelsMutation, useUpdateMotelsMutation } from '@/services/motel.services';
import { useGetPermissionsQuery, useGetStaffQuery } from '@/services/staff.services';
import { RootState } from '@/store';
import {
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    FormGroup,
    Stack,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export interface IFormDecentralizeProps {
    handleCloseModal: () => void;
}
interface CheckboxStates {
    [key: string]: boolean;
}
interface Permission {
    permission_id: number;
}
export default function FormDecentralize(props: IFormDecentralizeProps) {
    const tokenData = useTokenData();
    let token: string | null;

    // Check if window is defined (browser environment)
    if (typeof window !== 'undefined') {
        token = window.localStorage.getItem('token');
    }
    const staffId = useSelector((state: RootState) => state.staff.id);
    console.log('motel id', staffId);

    const { data: staffData } = useGetStaffQuery(staffId, { skip: !staffId });
    console.log('data của staff', staffData);
    //lấy danh sách quyền
    const { data: staffPermissions } = useGetPermissionsQuery(staffId, { skip: !staffId });
    console.log('data của staff danh sách', staffPermissions);
    // const { data: staffData } = useGetStaffsByLandlordQuery(tokenData?.userID);

    const [checkboxStates, setCheckboxStates] = useState<{ [key: number]: boolean }>({});
    const [permissions, setPermissions] = useState<Permission[]>([]);

    useEffect(() => {
        if (staffPermissions && staffPermissions.result) {
            const initialCheckboxStates = staffPermissions.result.reduce(
                (acc: { [x: string]: boolean }, permission: { permission_id: string | number }) => {
                    acc[permission.permission_id.toString()] = true;
                    return acc;
                },
                {} as { [key: string]: boolean }
            );
            setPermissions(staffPermissions.result);
            setCheckboxStates(initialCheckboxStates);
        }
    }, [staffPermissions]);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checkboxId = parseInt(event.target.id, 10);
        const isChecked = event.target.checked;
        setCheckboxStates((prevStates) => ({ ...prevStates, [checkboxId]: isChecked }));
    };
    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        console.log('datacheck', checkboxStates);
        // Loop through checkboxStates and call the appropriate API
        for (const [checkboxId, isChecked] of Object.entries(checkboxStates)) {
            console.log('checkboxId', checkboxId);
            const apiUrl = isChecked
                ? `${process.env.NEXT_PUBLIC_API_URL}/staff/add-permission`
                : `${process.env.NEXT_PUBLIC_API_URL}/staff/remove-permission`;

            try {
                const response = await fetch(apiUrl, {
                    method: isChecked ? 'POST' : 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token && { Authorization: `Bearer ${token}` }),
                        // Include any necessary headers or authentication tokens
                    },
                    // Include any necessary request body for POST requests
                    body: JSON.stringify({ staff_id: staffId, permission_id: checkboxId }),
                });

                if (response.ok) {
                    console.log(
                        `${isChecked ? 'Inserted' : 'Deleted'} data for checkbox ${checkboxId}`
                    );
                    if (props.handleCloseModal) {
                        props.handleCloseModal();
                    }
                } else {
                    console.log(
                        `Failed to ${
                            isChecked ? 'insert' : 'delete'
                        } data for checkbox ${checkboxId}`
                    );
                    console.error(
                        `Failed to ${
                            isChecked ? 'insert' : 'delete'
                        } data for checkbox ${checkboxId}`
                    );
                }
            } catch (error) {
                console.error('Error:', error);
                console.log('huhuh');
            }
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
                    Phân quyền
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
                <Stack sx={{ border: '2px solid #737373', padding: '5px' }}>
                    <Stack direction="row">
                        <Typography
                            sx={{ width: { md: '30%', display: 'flex', alignItems: 'center' } }}
                        >
                            Xem thống kê
                        </Typography>
                        <Stack sx={{ width: { md: '70%', flexWrap: 'wrap' } }}>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            id="29"
                                            checked={checkboxStates?.['29'] ?? false}
                                            onChange={handleCheckboxChange}
                                        />
                                    }
                                    label="Xem"
                                />
                            </FormGroup>
                        </Stack>
                    </Stack>
                    <Divider sx={{ border: '1px solid #a8a8a8' }} />
                    <Stack direction="row">
                        <Typography
                            sx={{ width: { md: '30%', display: 'flex', alignItems: 'center' } }}
                        >
                            Quản lý dãy/tầng trọ
                        </Typography>
                        <Stack direction="row" sx={{ width: { md: '70%', flexWrap: 'wrap' } }}>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            id="7"
                                            checked={checkboxStates?.['7'] || false}
                                            onChange={handleCheckboxChange}
                                        />
                                    }
                                    label="Thêm"
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            id="8"
                                            checked={checkboxStates?.['8'] || false}
                                            onChange={handleCheckboxChange}
                                        />
                                    }
                                    label="Sửa"
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            id="9"
                                            checked={checkboxStates?.['9'] || false}
                                            onChange={handleCheckboxChange}
                                        />
                                    }
                                    label="Xóa"
                                />
                            </FormGroup>
                        </Stack>
                    </Stack>
                    <Stack direction="row">
                        <Typography
                            sx={{ width: { md: '30%', display: 'flex', alignItems: 'center' } }}
                        >
                            Quản lý phòng trọ
                        </Typography>
                        <Stack direction="row" sx={{ width: { md: '70%', flexWrap: 'wrap' } }}>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            id="10"
                                            checked={checkboxStates?.['10'] || false}
                                            onChange={handleCheckboxChange}
                                        />
                                    }
                                    label="Thêm"
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            id="11"
                                            checked={checkboxStates?.['11'] || false}
                                            onChange={handleCheckboxChange}
                                        />
                                    }
                                    label="Sửa"
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            id="12"
                                            checked={checkboxStates?.['12'] || false}
                                            onChange={handleCheckboxChange}
                                        />
                                    }
                                    label="Xóa"
                                />
                            </FormGroup>
                        </Stack>
                    </Stack>{' '}
                    <Divider sx={{ border: '1px solid #a8a8a8' }} />
                    <Stack direction="row">
                        <Typography
                            sx={{ width: { md: '30%', display: 'flex', alignItems: 'center' } }}
                        >
                            Cấu hình bảng giá
                        </Typography>
                        <Stack direction="row" sx={{ width: { md: '70%', flexWrap: 'wrap' } }}>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            id="13"
                                            checked={checkboxStates?.['13'] || false}
                                            onChange={handleCheckboxChange}
                                        />
                                    }
                                    label="Thêm"
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            id="14"
                                            checked={checkboxStates?.['14'] || false}
                                            onChange={handleCheckboxChange}
                                        />
                                    }
                                    label="Sửa"
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            id="15"
                                            checked={checkboxStates?.['15'] || false}
                                            onChange={handleCheckboxChange}
                                        />
                                    }
                                    label="Xóa"
                                />
                            </FormGroup>
                        </Stack>
                    </Stack>{' '}
                    <Divider sx={{ border: '1px solid #a8a8a8' }} />
                    <Stack direction="row">
                        <Typography
                            sx={{ width: { md: '30%', display: 'flex', alignItems: 'center' } }}
                        >
                            Quản lý người ở trọ
                        </Typography>
                        <Stack direction="row" sx={{ width: { md: '70%', flexWrap: 'wrap' } }}>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            id="16"
                                            checked={checkboxStates?.['16'] || false}
                                            onChange={handleCheckboxChange}
                                        />
                                    }
                                    label="Tạo hợp đồng"
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            id="17"
                                            checked={checkboxStates?.['17'] || false}
                                            onChange={handleCheckboxChange}
                                        />
                                    }
                                    label="Sửa hợp đồng"
                                />
                            </FormGroup>
                            {/* <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox color="primary" />}
                                    label="Thêm giữ chỗ"
                                />
                            </FormGroup> */}
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            id="30"
                                            checked={checkboxStates?.['30'] || false}
                                            onChange={handleCheckboxChange}
                                        />
                                    }
                                    label="Thêm khách trọ"
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            id="31"
                                            checked={checkboxStates?.['31'] || false}
                                            onChange={handleCheckboxChange}
                                        />
                                    }
                                    label="Cập nhật khách trọ"
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            id="32"
                                            checked={checkboxStates?.['32'] || false}
                                            onChange={handleCheckboxChange}
                                        />
                                    }
                                    label="Xóa khách trọ"
                                />
                            </FormGroup>
                        </Stack>
                    </Stack>{' '}
                    <Divider sx={{ border: '1px solid #a8a8a8' }} />
                    <Stack direction="row">
                        <Typography
                            sx={{ width: { md: '30%', display: 'flex', alignItems: 'center' } }}
                        >
                            Quản lý thu chi, thanh toán
                        </Typography>
                        <Stack direction="row" sx={{ width: { md: '70%', flexWrap: 'wrap' } }}>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            id="21"
                                            checked={checkboxStates?.['21'] || false}
                                            onChange={handleCheckboxChange}
                                        />
                                    }
                                    label="Tạo hóa đơn"
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            id="19"
                                            checked={checkboxStates?.['19'] || false}
                                            onChange={handleCheckboxChange}
                                        />
                                    }
                                    label="Thêm phiếu thu chi"
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            id="20"
                                            checked={checkboxStates?.['20'] || false}
                                            onChange={handleCheckboxChange}
                                        />
                                    }
                                    label="Xem thu chi"
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            id="22"
                                            checked={checkboxStates?.['22'] || false}
                                            onChange={handleCheckboxChange}
                                        />
                                    }
                                    label="Chốt điện nước"
                                />
                            </FormGroup>
                        </Stack>
                    </Stack>{' '}
                    <Divider sx={{ border: '1px solid #a8a8a8' }} />
                    <Stack direction="row">
                        <Typography
                            sx={{ width: { md: '30%', display: 'flex', alignItems: 'center' } }}
                        >
                            Báo cáo
                        </Typography>
                        <Stack direction="row" sx={{ width: { md: '70%', flexWrap: 'wrap' } }}>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            id="28"
                                            checked={checkboxStates?.['28'] || false}
                                            onChange={handleCheckboxChange}
                                        />
                                    }
                                    label="Xem"
                                />
                            </FormGroup>
                        </Stack>
                    </Stack>
                </Stack>{' '}
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
