import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Stack, Avatar } from '@mui/material';
import AppTheme from '../theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from '../components/AppAppBar';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');

  const onSubmit = (e) => {
    e.preventDefault();
    updateProfile({ name, avatarUrl });
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Container maxWidth="sm" sx={{ mt: 12 }}>
        <Stack spacing={3}>
          <Stack spacing={1} alignItems="center">
            <Avatar src={avatarUrl} sx={{ width: 72, height: 72 }} />
            <Typography variant="h4">Your profile</Typography>
          </Stack>
          <Box component="form" onSubmit={onSubmit}>
            <Stack spacing={2}>
              <TextField label="Display name" value={name} onChange={(e) => setName(e.target.value)} fullWidth required />
              <TextField label="Avatar URL" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} fullWidth />
              <Button type="submit" variant="contained">Save</Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </AppTheme>
  );
}





