import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Header from 'components/Landing/Header';
import Hero from 'components/Landing/Hero';

import Main from 'components/Landing/Main';
import useHello from 'hooks/useHttpAPI/useHello';
import { useEffect } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#439A97'
    },
  }
});

const useWakeUpDb = () => {
  const { wakeUpDb } = useHello();
  useEffect(() => {
    try {
      wakeUpDb();
    } catch (error) {
      console.log(error);
    }
  }, [wakeUpDb]);
};

export default function IndexPage() {
  // useWakeUpDb();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minWidth: '360px' }}>
        <Header />
        <Main>
          <Hero />
        </Main>
        {/* <Section>
          <Highlights />
        </Section> */}
      </Box>
    </ThemeProvider>
  );
}
