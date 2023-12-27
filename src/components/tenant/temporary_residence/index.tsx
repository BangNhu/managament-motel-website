import * as React from 'react';
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
export interface ITemporaryResidenceProps {
    handleCloseModal: () => void;
}

export function TemporaryResidence(props: ITemporaryResidenceProps) {
    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

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
                Khai báo tạm trú
            </Typography>{' '}
            <Divider
                sx={{
                    margin: '0 0 5% 0',
                    border: '1px solid #cb5656',
                    // width: { xs: '100%', sm: '80%' },
                    // textAlign: 'center',
                    // mx: 'auto',
                }}
            />{' '}
            {/* <Stack
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
            </Stack> */}
            <form onSubmit={handleSubmit} action="/login">
                <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Nghề nghiệp"
                            // onChange={handleChange}
                            // value={formData.tenant_name}
                            fullWidth
                            required
                        />
                    </Grid>{' '}
                    <Grid item xs={12} md={6}>
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Nghề nghiệp"
                            // onChange={handleChange}
                            // value={formData.tenant_name}
                            fullWidth
                            required
                        />
                    </Grid>{' '}
                    <Grid item xs={12} md={6}>
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Địa chỉ tạm trú"
                            // onChange={handleChange}
                            // value={formData.tenant_name}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Tên chủ hộ"
                            // onChange={handleChange}
                            // value={formData.tenant_name}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="CCCD chủ hộ"
                            // onChange={handleChange}
                            // value={formData.tenant_name}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Quan hệ với chủ hộ"
                            // onChange={handleChange}
                            // value={formData.tenant_name}
                            fullWidth
                            required
                        />
                    </Grid>
                </Grid>

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
            </form>
        </Stack>
    );
}
