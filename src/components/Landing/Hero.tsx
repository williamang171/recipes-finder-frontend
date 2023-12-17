import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function Hero() {
  const theme = useTheme();
  const overSm = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box
      sx={{
        pb: 6,
        pl: 3,
        pr: 3
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant={overSm ? 'h2' : 'h4'}
          align="center"
          color="text.primary"
          gutterBottom
        >
          Find and Save Recipes
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          Find recipes by providing text based queries, image urls, or uploading images
        </Typography>
        <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
          <Button variant="contained" component="a" href="/auth/sign-in">
            Get Started
          </Button>
          <Button
            component="a"
            target="_blank"
            href="https://github.com/williamang171/recipes-finder"
            variant="outlined"
            startIcon={<GitHubIcon />}
          >
            GitHub
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
