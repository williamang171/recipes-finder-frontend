import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/finder-text'
      },
      authorizationParams: {
        prompt: 'login'
      }
    });
  };

  return (
    <Button variant="contained" onClick={handleLogin}>
      Log In
    </Button>
  );
};
