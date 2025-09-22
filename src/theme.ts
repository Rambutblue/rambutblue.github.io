import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#00bcd4',
        },
        secondary: {
            main: '#f50057',
        },
        background: {
            default: '#0A0A0A',
            paper: 'rgba(10, 10, 10, 0.5)',
        },
    },
    typography: {
        fontFamily: 'Inter, sans-serif',
        h1: {
            fontSize: '4rem',
            fontWeight: 800,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 700,
        },
    },
});

export default theme;