import { createTheme } from '@mui/material';

const theme = createTheme({
    typography: {
        subtitle1: {
            fontSize: '16px',
            '@media (min-width:600px)': {
                fontSize: '18px',
            },
            '@media (min-width:900px)': {
                fontSize: '18px',
            },
        },
        subtitle2: {
            fontSize: '16px',
            '@media (min-width:600px)': {
                fontSize: '18px',
            },
            '@media (min-width:900px)': {
                fontSize: '18px',
            },
        },
        // Các cấu hình khác cho các variant khác
        body1: {
            fontWeight: 500,
        },
        button: {
            fontStyle: 'italic',
        },
        h1: {
            fontFamily: 'Verdana',
            fontSize: '32px',
            '@media (min-width:600px)': {
                fontSize: '18px',
            },
            '@media (min-width:900px)': {
                fontSize: '18px',
            },
        },
    },
});

export default theme;
