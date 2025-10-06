import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography, Stack, Avatar } from '@mui/material';
import AppTheme from '../theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from '../components/AppAppBar';
import { useAuth } from '../context/AuthContext';
import GoogleIcon from '@mui/icons-material/Google';

export default function Login() {
  // ✅ ضيف loginWithGoogle هنا
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    try {
      await login(email, password);   // ✅ انتظر تسجيل الدخول
      navigate('/');                  // ✅ بعد النجاح روح للهوم
    } catch (err) {
      console.error('Login error:', err.message);
    }
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Container maxWidth="sm" sx={{ mt: 12 }}>
        <Stack spacing={3}>
          <Stack spacing={1} alignItems="center">
            <Avatar />
            <Typography variant="h4">Sign in</Typography>
          </Stack>
          <Box component="form" onSubmit={onSubmit}>
            <Stack spacing={2}>
              
              <TextField helperText="Email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required />
              <TextField helperText="Password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth required />
              <Button type="submit" variant="contained">Sign in</Button>

              <Button
                variant="outlined"
                startIcon={<GoogleIcon />}
                onClick={async () => {
                  try {
                    await loginWithGoogle(); // ✅ تسجيل دخول بجوجل
                    navigate('/');           // ✅ مباشرة للهوم
                  } catch (err) {
                    console.error('Google sign-in error:', err.message);
                  }
                }}
              >
                Sign in with Google
              </Button>

              <Typography variant="body2">
                No account? <Link to="/register">Create one</Link>
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </AppTheme>
  );
}
