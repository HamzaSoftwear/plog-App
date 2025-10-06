import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Container,
  Divider,
  MenuItem,
  Drawer,
  Typography,
  Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ColorModeIconDropdown from '../theme/ColorModelconDropdown';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => setOpen(newOpen);

  const displayName =
    user?.name || (user?.email ? user.email.split('@')[0] : 'Profile');
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h6"
              component="h1"
              sx={(theme) => ({
                fontSize: 'inherit',
                color: 'secondary.main',
                fontWeight: 'bold',
                ...theme.applyStyles('dark', {
                  color: 'primary.light',
                }),
              })}
            >
              Hamza
            </Typography>

            {/* روابط التنقل */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 3 }}>
              {['Features', 'Testimonials', 'Highlights', 'Pricing', 'FAQ', 'Blog'].map(
                (item) => (
                  <Button
                    key={item}
                    variant="text"
                    size="medium"
                    sx={{
                      color: 'text.primary',
                      fontWeight: 500,
                      '&:hover': {
                        backgroundColor: 'action.hover',
                        color: 'primary.main',
                      },
                    }}
                  >
                    {item}
                  </Button>
                )
              )}
            </Box>
          </Box>

          {/* المستخدم */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
            {!user ? (
              <>
                <Button
                  variant="text"
                  size="small"
                  sx={{
                    color: 'text.primary',
                    fontWeight: 500,
                    '&:hover': { backgroundColor: 'action.hover', color: 'primary.main' },
                  }}
                  onClick={() => navigate('/login')}
                >
                  Sign in
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    fontWeight: 600,
                    borderRadius: 2,
                    px: 3,
                    '&:hover': {
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                  onClick={() => navigate('/register')}
                >
                  Sign up
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="text"
                  size="small"
                  sx={{
                    color: 'text.primary',
                    fontWeight: 500,
                    '&:hover': { backgroundColor: 'action.hover', color: 'primary.main' },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                  onClick={() => navigate('/profile')}
                >
                  <Avatar
                    src={user.photoURL || undefined}
                    sx={{ width: 30, height: 30 }}
                  >
                    {!user.photoURL ? initial : null}
                  </Avatar>
                  {displayName}
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    color: 'text.primary',
                    borderColor: 'divider',
                    fontWeight: 500,
                    px: 3,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      borderColor: 'primary.main',
                      color: 'primary.main',
                    },
                  }}
                  onClick={logout}
                >
                  Sign out
                </Button>
              </>
            )}
            <ColorModeIconDropdown />
          </Box>

          {/* نسخة الموبايل */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{ sx: { top: 'var(--template-frame-height, 0px)' } }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                {['Features', 'Testimonials', 'Highlights', 'Pricing', 'FAQ', 'Blog'].map(
                  (item) => (
                    <MenuItem key={item} sx={{ py: 1.5 }}>
                      {item}
                    </MenuItem>
                  )
                )}

                <Divider sx={{ my: 3 }} />

                {!user ? (
                  <>
                    <MenuItem>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          py: 1.5,
                          fontWeight: 600,
                          borderRadius: 2,
                        }}
                        onClick={() => navigate('/register')}
                      >
                        Sign up
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button
                        variant="outlined"
                        fullWidth
                        sx={{
                          py: 1.5,
                          fontWeight: 500,
                        }}
                        onClick={() => navigate('/login')}
                      >
                        Sign in
                      </Button>
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem>
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{ py: 1.5, fontWeight: 500 }}
                      onClick={logout}
                    >
                      Sign out
                    </Button>
                  </MenuItem>
                )}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
