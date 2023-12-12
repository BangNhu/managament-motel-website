import { SimpleLayout } from '@/components/common/layout/main/simple-layout';
import { useState, ChangeEvent } from 'react';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, Stack } from '@mui/material';
import { useRouter } from 'next/router';

export interface IRegisterProps {
    landlord_name: string;
    email: string;
    number_phone: string;
    password: string;
    birthday: string;
    gender: number;
}

export default function Register(props: IRegisterProps) {
    const router = useRouter();
    const [formData, setFormData] = useState<IRegisterProps>({
        landlord_name: '',
        email: '',
        number_phone: '',
        password: '',
        birthday: '',
        gender: 0,
    });
    const handleChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('User signed up successfully!');
                // Redirect to the login page after successful signup
                console.log(formData);
                router.push('/login');
            } else {
                console.error('Failed to sign up');
            }
        } catch (error) {
            console.error('Error during signup:', error);
            if (error instanceof Response) {
                const errorMessage = await error.text();
                console.error('Server error:', errorMessage);
            }
        }
    };

    return (
        <Stack>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Landlord Name"
                    type="text"
                    name="landlord_name"
                    value={formData.landlord_name}
                    onChange={handleChange}
                />
                <br />
                <TextField
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <br />
                <TextField
                    label="Phone Number"
                    type="tel"
                    name="number_phone"
                    value={formData.number_phone}
                    onChange={handleChange}
                />
                <br />
                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <br />
                <TextField
                    label="Birthday"
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                />
                <br />
                <FormControl>
                    <InputLabel>Gender</InputLabel>
                    <Select name="gender" value={formData.gender} onChange={handleChange}>
                        <MenuItem value="1">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </Select>
                </FormControl>
                <br />
                <Button variant="contained" onClick={handleSubmit}>
                    Signup
                </Button>
            </form>
        </Stack>
    );
}
Register.Layout = SimpleLayout;
