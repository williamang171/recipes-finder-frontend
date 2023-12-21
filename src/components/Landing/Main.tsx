import React from 'react';
import { Box } from '@mui/material';

import constants from './styles';

interface MainProps {
  children: React.ReactNode;
}

export default function Main(props: MainProps) {
  return (
    <Box
      component="main"
      sx={{
        position: 'relative',
        height: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: constants.color.main
      }}
    >
      {props.children}
    </Box>
  );
}
