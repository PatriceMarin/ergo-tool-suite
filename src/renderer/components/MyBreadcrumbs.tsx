import { Box, Breadcrumbs, Link, Typography } from '@mui/material';

function MyBreadcrumbs({ title }: { title: string }) {
  return (
    <Box p={2}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Apps
        </Link>
        <Typography sx={{ color: 'text.primary' }}>{title}</Typography>
      </Breadcrumbs>
    </Box>
  );
}

export default MyBreadcrumbs;
