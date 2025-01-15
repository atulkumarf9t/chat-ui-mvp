import {useState,useMemo} from 'react';
import { extendTheme } from '@mui/material/styles';
import ChatIcon from '@mui/icons-material/Chat';
import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const NAVIGATION: Navigation = [
  {
    segment: 'chat',
    title: 'Chat',
    icon: <ChatIcon />,
  }
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

const useDemoRouter=(initialPath: string): Router=> {
  const [pathname, setPathname] = useState(initialPath);

  const router = useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const DemoPageContent=({ pathname }: { pathname: string }) =>{
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

export const Container=()=> {
  const router = useDemoRouter('/chat');

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: 'CognifyEV',
      }}
    >
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}
