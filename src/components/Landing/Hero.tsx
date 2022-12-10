import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Hero() {
    return <Box
        sx={{
            pb: 6,
        }}
    >
        <Container maxWidth="sm">
            <Typography
                component="h1"
                variant="h3"
                align="center"
                color="text.primary"
                gutterBottom
            >
                Find Recipes with Images or Text Based Queries
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Find recipes by providing image url, uploading image, or providing text based queries and filtering
            </Typography>
            <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
            >
                <Button variant="contained" component="a" href="/auth/sign-in">Get Started</Button>
                <Button component="a" target="_blank" href="https://github.com/williamang171/recipes-finder" variant="outlined" startIcon={<GitHubIcon />}>GitHub</Button>
            </Stack>
        </Container>
    </Box>
}