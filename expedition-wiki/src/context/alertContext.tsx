import React, { createContext, useContext, useState } from 'react';
import { Snackbar } from '@mui/material';
import Alert, { type AlertColor } from '@mui/material/Alert';

const AlertContext = createContext((_message: string, _severity: AlertColor) => {});

export const useAlert = () => {

    const context = useContext(AlertContext);

    return context;
}

interface ProviderProps
{
    children?: React.ReactNode;
}

export const AlertProvider = ({ children }:ProviderProps) => {

    const [open, setOpen]         = useState<boolean>(false);
    const [message, setMessage]   = useState<string>('');
    const [severity, setSeverity] = useState<AlertColor>('info');

    const showAlert = (message: string, severity: AlertColor) => {

        setMessage(message);
        setSeverity(severity);
        setOpen(true);
    }

    const hideAlert = () => {
        setOpen(false);
    }

    return (
        <AlertContext value={showAlert}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={hideAlert}
                message={message}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}       
            >
                <Alert severity={severity}>{message}</Alert>
            </Snackbar>
        </AlertContext>
    );
}
