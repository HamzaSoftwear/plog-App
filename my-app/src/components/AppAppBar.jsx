import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ColorModeIconDropdown from '.././theme/ColorModelconDropdown'
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

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

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
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
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
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button 
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
                Features
              </Button>
              <Button 
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
                Testimonials
              </Button>
              <Button 
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
                Highlights
              </Button>
              <Button 
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
                Pricing
              </Button>
              <Button 
                variant="text" 
                size="medium" 
                sx={{ 
                  minWidth: 0,
                  color: 'text.primary',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                    color: 'primary.main',
                  },
                }}
              >
                FAQ
              </Button>
              <Button 
                variant="text" 
                size="medium" 
                sx={{ 
                  minWidth: 0,
                  color: 'text.primary',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                    color: 'primary.main',
                  },
                }}
              >
                Blog
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            {!user ? (
            <Button 
              variant="text" 
              size="small"
              sx={{
                color: 'text.primary',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'action.hover',
                  color: 'primary.main',
                },
              }}
              onClick={() => navigate('/login')}
            >
              Sign in
            </Button>
            ) : (
            <Button 
              variant="text" 
              size="small"
              sx={{
                color: 'text.primary',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'action.hover',
                  color: 'primary.main',
                },
              }}
              onClick={() => navigate('/profile')}
            >
              {user.name || 'Profile'}
            </Button>
            )}
            {!user ? (
            <Button 
              variant="contained" 
              size="small"
              sx={{
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                fontWeight: 600,
                borderRadius: 2,
                px: 3,
                '&:hover': {
                  backgroundColor: 'primary.dark',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
              onClick={() => navigate('/register')}
            >
              Sign up
            </Button>
            ) : (
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
                transition: 'all 0.2s ease-in-out',
              }}
              onClick={logout}
            >
              Sign out
            </Button>
            )}
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <MenuItem sx={{ 
                  py: 1.5, 
                  '&:hover': { backgroundColor: 'action.hover' },
                  borderRadius: 1,
                  mx: 1,
                }}>
                  Features
                </MenuItem>
                <MenuItem sx={{ 
                  py: 1.5, 
                  '&:hover': { backgroundColor: 'action.hover' },
                  borderRadius: 1,
                  mx: 1,
                }}>
                  Testimonials
                </MenuItem>
                <MenuItem sx={{ 
                  py: 1.5, 
                  '&:hover': { backgroundColor: 'action.hover' },
                  borderRadius: 1,
                  mx: 1,
                }}>
                  Highlights
                </MenuItem>
                <MenuItem sx={{ 
                  py: 1.5, 
                  '&:hover': { backgroundColor: 'action.hover' },
                  borderRadius: 1,
                  mx: 1,
                }}>
                  Pricing
                </MenuItem>
                <MenuItem sx={{ 
                  py: 1.5, 
                  '&:hover': { backgroundColor: 'action.hover' },
                  borderRadius: 1,
                  mx: 1,
                }}>
                  FAQ
                </MenuItem>
                <MenuItem sx={{ 
                  py: 1.5, 
                  '&:hover': { backgroundColor: 'action.hover' },
                  borderRadius: 1,
                  mx: 1,
                }}>
                  Blog
                </MenuItem>
                <Divider sx={{ my: 3 }} />
                <MenuItem>
                  <Button 
                    variant="contained" 
                    fullWidth
                    sx={{
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      fontWeight: 600,
                      borderRadius: 2,
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      },
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    Sign up
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button 
                    variant="outlined" 
                    fullWidth
                    sx={{
                      color: 'text.primary',
                      borderColor: 'divider',
                      fontWeight: 500,
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: 'action.hover',
                        borderColor: 'primary.main',
                        color: 'primary.main',
                      },
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    Sign in
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}