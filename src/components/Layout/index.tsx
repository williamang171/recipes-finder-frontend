import * as React from 'react';
import { GlobalStyles, useTheme } from "@mui/material";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';

import SideNav from './SideNav';
import Header from './Header';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from 'components/ErrorFallback';

const drawerWidth = 240;

const SidebarGlobalStyles = () => {
    const theme = useTheme();
    const currentModeIsDark = theme.palette.mode === 'dark';
    return (
        <GlobalStyles
            styles={{
                ".sidebar-nav-item": {
                    color: "unset",
                    textDecoration: "none",
                },
                ".sidebar-nav-item--active": currentModeIsDark ? {} : {
                    color: theme.palette.primary.dark,

                    '.MuiListItemIcon-root': {
                        color: theme.palette.primary.dark,
                    }
                }
            }}
        />
    );
};
const SidebarGlobalStylesMemo = React.memo(SidebarGlobalStyles);

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    children?: React.ReactNode,
    window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
    const { window, children } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>

            <SidebarGlobalStylesMemo />
            <Header handleDrawerToggle={handleDrawerToggle} />
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { lg: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    <SideNav />
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    <SideNav />
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, pl: 3, pr: 3, pt: 2, pb: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <ErrorBoundary FallbackComponent={ErrorFallback} >
                    {children || null}
                </ErrorBoundary>
            </Box>
        </Box>
    );
}
