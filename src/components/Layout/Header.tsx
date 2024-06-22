import * as React from 'react';
import AppBar from '@mui/material/AppBar';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import AuthItem from './AuthItem';
import ColorMode from './ColorMode';
import { useTheme } from '@emotion/react';

interface Props {
  handleDrawerToggle(): any;
}

export default function Header(props: Props) {
  const { handleDrawerToggle } = props;
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" noWrap component="div" sx={{ ml: 1 }}>
            Recipes Finder
          </Typography>
        </Box>

        <Box sx={{ display: 'flex' }}>
          <ColorMode />
          <AuthItem handleClose={handleClose} anchorEl={anchorEl} handleMenu={handleMenu} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
