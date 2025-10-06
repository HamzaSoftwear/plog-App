import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography, Stack, Avatar } from '@mui/material';
import AppTheme from '../theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from '../components/AppAppBar';
import { useAuth } from '../context/AuthContext';


export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await register(name, email, password);
    navigate('/'); // ← توجيه للصفحة الرئيسية بعد التسجيل
  } catch (error) {
    console.error('Registration error:', error.message);
  }
};


  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
     
      <Container maxWidth="sm" sx={{ mt: 12 }}>
        <Stack spacing={3}>
          <Stack spacing={1} alignItems="center">
            <Avatar />
            <Typography variant="h4">Create account</Typography>
          </Stack>
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField helperText="Name" label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth required />
              <TextField helperText="Email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required />
              <TextField helperText="Password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth required />
              <Button type="submit" variant="contained">Register</Button>
              <Typography variant="body2">
                Have an account? <Link to="/login">Sign in</Link>
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </AppTheme>
  );
}



