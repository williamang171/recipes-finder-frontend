import { Navigate, Outlet } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { useAuth0 } from '@auth0/auth0-react';

export default function RequireNotAuth() {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return (
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          flexDirection: 'column'
        }}
      >
        <CircularProgress color="inherit" />
        <Box sx={{ textAlign: 'center', width: '100%', mt: 2 }}>
          <Typography variant="body1" color="inherit">
            Loading...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (isAuthenticated === true) {
    return <Navigate to="/finder-text" />;
  }

  return <Outlet />;
}
