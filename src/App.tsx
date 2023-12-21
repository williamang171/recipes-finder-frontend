import { Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from 'notistack';

import FinderPage from 'pages/FinderPage';
import FinderImagePage from 'pages/FinderImagePage';
import IndexPage from 'pages/IndexPage';
import SettingsPage from 'pages/SettingsPage';
import ToggleColorMode from 'components/ToggleColorMode';
import LinksPage from 'pages/LinksPage';
import FAQPage from 'pages/FAQPage';
import DebugAuthPage from 'pages/DebugAuth';
import { AuthContextProvider } from 'contexts/AuthContext';
import { GlobalLoadingContextProvider } from 'contexts/GlobalLoadingContext';
import GlobalLoader from 'components/GlobalLoader';
import { AuthenticationGuard } from 'components/WithAuthenticationGuard';

function App() {
  return (
    <ToggleColorMode>
      <SnackbarProvider autoHideDuration={3000} maxSnack={1}>
        <CssBaseline />
        <GlobalLoadingContextProvider>
          <AuthContextProvider>
            <GlobalLoader />
            <Routes>
              <Route path="/" element={<IndexPage />} />
              <Route path="/finder-text" element={<AuthenticationGuard component={FinderPage} />} />
              <Route
                path="/finder-image"
                element={<AuthenticationGuard component={FinderImagePage} />}
              />
              <Route
                path="/debug-auth"
                element={<AuthenticationGuard component={DebugAuthPage} />}
              />
              <Route path="/settings" element={<AuthenticationGuard component={SettingsPage} />} />
              <Route path="/links" element={<AuthenticationGuard component={LinksPage} />} />
              <Route path="/faq" element={<AuthenticationGuard component={FAQPage} />} />
            </Routes>
          </AuthContextProvider>
        </GlobalLoadingContextProvider>
      </SnackbarProvider>
    </ToggleColorMode>
  );
}

export default App;
