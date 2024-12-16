import { Box, Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export enum TitleKind {
  NONE,
}

interface MyBreadcrumbsProps {
  title: string | TitleKind;
}

function MyBreadcrumbs({ title }: MyBreadcrumbsProps) {
  return (
    <Box p={2}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/">
          <Typography sx={{ color: 'text.primary' }}>Apps</Typography>
        </Link>
        {title !== TitleKind.NONE && (
          <Typography sx={{ color: 'text.primary' }}>{title}</Typography>
        )}
      </Breadcrumbs>
    </Box>
  );
}

export default MyBreadcrumbs;
