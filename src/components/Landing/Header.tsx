import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { SignupButton } from './HeaderActions/SignupButton';
import { LoginButton } from './HeaderActions/LoginButton';

export default function Header() {
  return (
    <Toolbar>
      <Box color="inherit" />
      <Typography component="h2" variant="h6" color="text.primary" noWrap sx={{ flex: 1, ml: 1 }}>
        Recipes Finder
      </Typography>
      <SignupButton />
      <Box sx={{ width: '16px' }} />
      <LoginButton />
    </Toolbar>
  );
}
