import { Button, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import * as React from 'react';

export interface IProblemProps {
    handleCloseModal: () => void;
}

export function Problem(props: IProblemProps) {
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
                Báo cáo sự cố
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
            <Grid item xs={12} md={6}>
                <TextField
                    type="text"
                    variant="outlined"
                    color="secondary"
                    label="Mô tả sự cố"
                    // onChange={handleChange}
                    // value={formData.tenant_name}
                    fullWidth
                    required
                />
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
        </Stack>
    );
}
