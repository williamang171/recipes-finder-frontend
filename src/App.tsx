import { Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from 'notistack';

import SavedRecipesPage from 'pages/SavedRecipesPage';
import FinderPage from 'pages/FinderPage';
import FinderImagePage from 'pages/FinderImagePage';
import IndexPage from 'pages/IndexPage';
import SettingsPage from 'pages/SettingsPage';
import ToggleColorMode from 'components/ToggleColorMode';
import SignUp from 'pages/SignUp';
import SignIn from 'pages/SignIn';
import LinksPage from 'pages/LinksPage';
import FAQPage from 'pages/FAQPage';
import { AuthContextProvider } from 'contexts/AuthContext';
import { GlobalLoadingContextProvider } from 'contexts/GlobalLoadingContext';
import GlobalLoader from 'components/GlobalLoader';
import LoadCurrentUser from 'components/LoadCurrentUser';
import RequireNotAuth from 'components/RequireNotAuth';
import RequireAuth from 'components/RequireAuth';

function App() {
  return (
    <ToggleColorMode>
      <SnackbarProvider autoHideDuration={3000} maxSnack={1}>
        <CssBaseline />
        <GlobalLoadingContextProvider>
          <AuthContextProvider>
            <LoadCurrentUser />
            <GlobalLoader />
            <Routes>
              <Route path="/" element={<IndexPage />} />
              <Route element={<RequireAuth />}>
                <Route path="/finder-text" element={<FinderPage />} />
                <Route path="/finder-image" element={<FinderImagePage />} />
                {/* <Route path="/saved-recipes" element={<SavedRecipesPage />} /> */}
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/links" element={<LinksPage />} />
                <Route path="/faq" element={<FAQPage />} />
              </Route>
              <Route element={<RequireNotAuth />}>
                <Route path="/auth/sign-up" element={<SignUp />} />
                <Route path="/auth/sign-in" element={<SignIn />} />
              </Route>
            </Routes>
          </AuthContextProvider>
        </GlobalLoadingContextProvider>
      </SnackbarProvider>
    </ToggleColorMode>
  );
}

export default App;
