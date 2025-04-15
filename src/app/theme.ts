import {createTheme} from "@mui/material/styles";

export const theme = createTheme({
    colorSchemes: {
        dark: true,
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    }
});

theme.typography.h1 = {
    fontSize: '2rem',
    [theme.breakpoints.up('md')]: {
        fontSize: '2.5rem',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '3rem',
    },
}

theme.typography.h2 = {
    fontSize: '1.5rem',
    [theme.breakpoints.up('md')]: {
        fontSize: '2rem',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '2.6rem',
    },
}

theme.typography.h3 = {
    fontSize: '1.25rem',
    marginTop: '1rem',
    [theme.breakpoints.up('md')]: {
        marginTop: '1.5rem',
        fontSize: '1.5rem',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '2rem',
        marginTop: '2rem',
    },
}
