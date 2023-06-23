import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { Typography, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


import { AuthContext } from "contexts/AuthContext";

export default function RequireNotAuth() {
    const { isAuthenticated } = React.useContext(AuthContext);

    if (isAuthenticated === null) {
        return <Box sx={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", flexDirection: "column" }}>
            <CircularProgress color="inherit" />
            <Box sx={{ textAlign: "center", width: "100%", mt: 2 }}>
                <Typography variant="body1" color='inherit'>Loading...</Typography>
            </Box>
        </Box>
    }

    if (isAuthenticated === false) {
        return <Navigate to="/auth/sign-in" />
    }

    return (
        <Outlet />
    )
}