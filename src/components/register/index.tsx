import { TextField, Button, Container, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
export interface IRegisterFormProps {}

export function RegisterForm(props: IRegisterFormProps) {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [dateOfBirth, setDateOfBirth] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(firstName, lastName, email, dateOfBirth, password);
    };
    return (
        <Stack
            sx={{
                width: { xs: '90%', md: '50%' },
                margin: { xs: '20% auto', md: '5% auto' },
                borderRadius: '8px',
                // border: '2px solid #A61713',
                padding: '2% 5%',
                boxShadow: '4px 4px 16px rgba(0, 0, 0, 0.25)',
            }}
        >
            <Typography
                variant="h1"
                sx={{
                    fontSize: '32px',
                    fontFamily: 'Verdana',
                    marginBottom: { xs: '10px', md: '20px' },
                    textAlign: 'center',
                    // textTransform: 'uppercase',
                }}
            >
                Đăng ký phần mềm quản lý nhà trọ{' '}
                <Typography
                    component="span"
                    sx={{ color: '#A61713', fontSize: '32px', fontFamily: 'Verdana' }}
                >
                    NhuTK
                </Typography>
            </Typography>
            <form onSubmit={handleSubmit} action="/login">
                <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Last Name"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            type="email"
                            variant="outlined"
                            color="secondary"
                            label="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            type="password"
                            variant="outlined"
                            color="secondary"
                            label="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            type="date"
                            variant="outlined"
                            color="secondary"
                            label="Date of Birth"
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            value={dateOfBirth}
                            fullWidth
                            required
                            sx={{ mb: 4 }}
                        />
                    </Grid>
                </Grid>
                <Button variant="outlined" color="secondary" type="submit">
                    Register
                </Button>
            </form>
            <small>
                Already have an account? <Link href="/login">Login Here</Link>
            </small>
        </Stack>
    );
}
