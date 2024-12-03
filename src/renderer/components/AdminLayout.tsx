import { CssBaseline, Box, Toolbar, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import MyDrawer from './MyDrawer';

const drawerWidth = 240;

function AdminLayout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <MyDrawer />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Container maxWidth={false} disableGutters>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}

export default AdminLayout;
