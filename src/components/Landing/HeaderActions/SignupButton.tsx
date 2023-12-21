import Button from '@mui/material/Button';
import { useAuth0 } from '@auth0/auth0-react';

export const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/finder-text'
      },
      authorizationParams: {
        prompt: 'login',
        screen_hint: 'signup'
      }
    });
  };

  return (
    <Button variant="outlined" onClick={handleSignUp}>
      Sign Up
    </Button>
  );
};
