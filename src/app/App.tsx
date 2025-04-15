import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "./configureStore";
import {loadJobPostings} from "@/ducks/jobs/actions";
import JobPostingsList from "@/components/JobPostingsList";
import AppAlertList from "./AppAlertList";
import {selectPreview} from "@/ducks/jobs";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import useMediaQuery from '@mui/material/useMediaQuery';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {theme} from "@/app/theme";


export default function App() {
    const dispatch = useAppDispatch();
    const preview = useAppSelector(selectPreview);
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const preview = searchParams.get("preview");
        const id = searchParams.get("id");
        dispatch(loadJobPostings({id, preview: preview === '1'}));
    }, [window.location]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppAlertList/>
            {preview && (
                <Alert variant="outlined" severity="info" sx={{my: 3}}>
                    <AlertTitle>Job Posting Preview</AlertTitle>
                    This is just a preview and could possibly have errors or is not a live posting.
                </Alert>
            )}
            <JobPostingsList/>
        </ThemeProvider>
    )
}
