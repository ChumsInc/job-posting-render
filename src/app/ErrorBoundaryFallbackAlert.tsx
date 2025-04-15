import React from 'react';
import {FallbackProps} from "react-error-boundary";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Typography from "@mui/material/Typography";

export default function ErrorBoundaryFallbackAlert({error, resetErrorBoundary}: FallbackProps) {
    return (
        <Alert severity="error" onClose={resetErrorBoundary}>
            <AlertTitle>Something went wrong!</AlertTitle>
            <Typography variant="body2">
                {error.message}
            </Typography>
        </Alert>
    )
}
