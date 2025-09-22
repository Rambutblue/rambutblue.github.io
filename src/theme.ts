import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#FFD700', // Gold
        },
        secondary: {
            main: '#FF4500', // OrangeRed
        },
        background: {
            default: '#0A0A0A',
            paper: 'rgba(10, 10, 10, 0.7)',
        },
    },
    typography: {
        fontFamily: '"Fusion Pixel 12px Proportional SC", cursive',
        h1: {
            fontSize: '3rem',
            fontWeight: 400,
            textShadow: '2px 2px #000',
        },
        h2: {
            fontSize: '1.5rem',
            fontWeight: 400,
            textShadow: '2px 2px #000',
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 400,
            textShadow: '1px 1px #000',
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 400,
            textShadow: '1px 1px #000',
        },
        body1: {
            fontFamily: 'monospace',
            fontSize: '1rem',
        },
        body2: {
            fontFamily: 'monospace',
            fontSize: '0.875rem',
        },
    },
});

export default theme;