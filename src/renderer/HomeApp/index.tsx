import Grid from '@mui/material/Grid2';
import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import SpeedIcon from '@mui/icons-material/Speed';
import { Link } from 'react-router-dom';
import MyBreadcrumbs, { TitleKind } from '../components/MyBreadcrumbs';

function HomeApp() {
  return (
    <Grid container sx={{ height: 'calc(100vh - 120px)' }}>
      <Grid size={12}>
        <MyBreadcrumbs title={TitleKind.NONE} />
      </Grid>
      <Grid container size={12} p={2} spacing={2}>
        <Grid size={4} spacing={2}>
          <Link to="/myKeyboardApp">
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <Stack>
                      <Typography
                        sx={{ color: 'text.primary' }}
                        align="center"
                        variant="h5"
                      >
                        <KeyboardIcon sx={{ fontSize: 80 }} />
                      </Typography>
                      <Typography
                        sx={{ color: 'text.primary' }}
                        align="center"
                        variant="h5"
                      >
                        Mon Clavier
                      </Typography>
                    </Stack>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
        <Grid size={4} spacing={2}>
          <Link to="/typingApp">
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <Stack>
                      <Typography
                        sx={{ color: 'text.primary' }}
                        align="center"
                        variant="h5"
                      >
                        <SpellcheckIcon sx={{ fontSize: 80 }} />
                      </Typography>
                      <Typography
                        sx={{ color: 'text.primary' }}
                        align="center"
                        variant="h5"
                      >
                        Aide à la frappe
                      </Typography>
                    </Stack>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
        <Grid size={4} spacing={2}>
          <Link to="/speedTypingApp">
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <Stack>
                      <Typography
                        sx={{ color: 'text.primary' }}
                        align="center"
                        variant="h5"
                      >
                        <SpeedIcon sx={{ fontSize: 80 }} />
                      </Typography>
                      <Typography
                        sx={{ color: 'text.primary' }}
                        align="center"
                        variant="h5"
                      >
                        Ma vitesse de frappe
                      </Typography>
                    </Stack>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default HomeApp;
