import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function Hero() {
  const theme = useTheme();
  const overSm = useMediaQuery(theme.breakpoints.up('sm'));
  const underLg = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box
      sx={{
        pb: 6,
        pl: 3,
        pr: 3,
      }}
    >
      <Container maxWidth={'lg'}>
        <Grid container>
          <Grid xs={12} lg={6} sx={{ pr: 5, mb: underLg ? 6 : 0 }} >
            <Typography
              component="h1"
              variant={overSm ? 'h2' : 'h4'}
              color="text.primary"
              gutterBottom
            >
              Recipes Finder
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              Find recipes by providing text based queries, image urls, or uploading images
            </Typography>
            <Stack sx={{ pt: 2 }} direction="row" spacing={2}>
              <Button variant="contained" component="a" href="/finder-text">
                Get Started
              </Button>
            </Stack>
          </Grid>
          <Grid xs={12} lg={6}>
            <Box style={{ display: 'flex', justifyContent: underLg ? 'center' : 'flex-end' }}>
              <img style={{ maxWidth: '100%' }} src="/undraw_search.svg" alt="search-svg" />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
