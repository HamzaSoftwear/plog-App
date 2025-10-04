import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography, Stack, Avatar } from '@mui/material';
import AppTheme from '../theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from '../components/AppAppBar';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    login(email, password);
    navigate('/');
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
              <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required />
              <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth required />
              <Button type="submit" variant="contained">Sign in</Button>
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



