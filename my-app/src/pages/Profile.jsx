import React, { useState } from 'react';
import {
  Box, Button, Container, TextField,
  Typography, Stack
} from '@mui/material';
import AppTheme from '../theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from '../components/AppAppBar';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const navigate = useNavigate();



const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await updateProfile({ name }); 
    navigate('/');                
  } catch (err) {
    console.error('Update error:', err.message);
  }
};
















  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Container maxWidth="sm" sx={{ mt: 12 }}>
        <Stack spacing={3}>
          <Typography variant="h4" align="center">Your profile</Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
              helperText="Edit Your Name"
                label="Display name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
              />
              <Button type="submit" variant="contained">
                Save & Go Home
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </AppTheme>
  );
}

