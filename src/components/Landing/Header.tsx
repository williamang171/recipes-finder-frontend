import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import constants from './styles';

export default function Header() {
  return (
    <Toolbar sx={{ background: constants.color.main }}>
      <Box color="inherit" />
      📔
      <Typography
        component="h2"
        variant="h6"
        color="text.primary"
        noWrap
        sx={{ flex: 1, ml: 1 }}
      >
        Recipes Finder
      </Typography>
      <Button
        component="a"
        href="/finder-text"
        variant="contained"
        size="small"
      >
        Open App
      </Button>
    </Toolbar>
  );
}
