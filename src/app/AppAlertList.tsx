import React from 'react';
import {useAppDispatch, useAppSelector} from "./configureStore";
import {dismissAlert, selectAllAlerts, StyledErrorAlert} from "@chumsinc/alert-list";
import {Stack} from "@mui/material";
import Alert from "@mui/material/Alert";

export default function AppAlertList() {
    const dispatch = useAppDispatch();
    const list = useAppSelector(selectAllAlerts);
    const dismissHandler = (alert: StyledErrorAlert) => {
        dispatch(dismissAlert(alert));
    }
    return (
        <Stack direction="row" spacing={2}>
            {list.map(alert => (
                <Alert key={alert.id}
                       severity="warning" variant="filled"
                       onClose={() => dismissHandler(alert)}>
                    {alert.message}
                </Alert>
            ))}
        </Stack>
    )
}
