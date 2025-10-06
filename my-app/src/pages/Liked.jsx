// src/pages/Liked.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Stack,
  Chip,
  CircularProgress,
  Alert,
  Grid
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  AccessTime as AccessTimeIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Favorite as FavoriteIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { usePostInteractions } from '../context/PostInteractionsContext';
import { strapiService } from '../services/strapiApi';
import AppTheme from '../theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from '../components/AppAppBar';
import { getMyLikedPosts } from '../lib/postInteractions';

export default function Liked() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toggleLike } = usePostInteractions();

  const [likedPosts, setLikedPosts] = useState([]);
  const [busyMap, setBusyMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sameId = (a, b) => String(a) === String(b);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadLikedPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate]);

  const loadLikedPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1) IDs from Firestore
      const likedPostIds = await getMyLikedPosts(user.uid);

      if (likedPostIds.length === 0) {
        setLikedPosts([]);
        return;
      }

      // 2) Fetch details from Strapi
      const postPromises = likedPostIds.map(async (postId) => {
        try {
          // احرص على أن الخدمة تتعامل مع الـ id كسلسلة/رقم
          const post = await strapiService.getPostById(String(postId));
          return post;
        } catch (err) {
          console.error(`Failed to fetch post ${postId}:`, err);
          return null;
        }
      });

      const posts = await Promise.all(postPromises);
      const validPosts = posts.filter(Boolean);

      setLikedPosts(validPosts);
    } catch (err) {
      console.error('Failed to load liked posts:', err);
      setError('Failed to load liked posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleUnlikePost = async (postId) => {
    const id = String(postId);
    if (busyMap[id]) return;

    try {
      // منع النقر المزدوج
      setBusyMap((m) => ({ ...m, [id]: true }));

      // تحديث تفاؤلي: اشطب البوست من القائمة فورًا
      setLikedPosts((prev) => prev.filter((p) => !sameId(p.id, id)));

      // نفّذ على Firestore (سيحذف وثيقة اللايك إن وُجدت)
      await toggleLike(id);

      // لا نعيد التحميل هنا لتجربة أسرع. لو ودّك تضمن تزامن كامل:
      // await loadLikedPosts();
    } catch (error) {
      console.error('Error unliking post:', error);
      // تراجع: لو صار خطأ، أعد التحميل لإرجاع الحالة الصحيحة
      await loadLikedPosts();
      alert('Failed to unlike post. Please try again.');
    } finally {
      setBusyMap((m) => ({ ...m, [id]: false }));
    }
  };

  const goBack = () => {
    navigate('/');
  };

  if (!user) return null; // Will redirect to login

  if (loading) {
    return (
      <AppTheme>
        <CssBaseline enableColorScheme />
        <AppAppBar />
        <Container sx={{ mt: 10, textAlign: 'center' }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading your liked posts...
          </Typography>
        </Container>
      </AppTheme>
    );
  }

  if (error) {
    return (
      <AppTheme>
        <CssBaseline enableColorScheme />
        <AppAppBar />
        <Container sx={{ mt: 10 }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
          <Button onClick={goBack} startIcon={<ArrowBackIcon />}>
            Back to Home
          </Button>
        </Container>
      </AppTheme>
    );
  }

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <AppAppBar />

      <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            onClick={goBack}
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 3 }}
            variant="outlined"
          >
            Back to Blog
          </Button>

          <Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight: 'bold' }}>
            <FavoriteIcon sx={{ mr: 2, verticalAlign: 'middle', color: 'error.main' }} />
            Liked Posts
          </Typography>

          <Typography variant="h6" color="text.secondary">
            {likedPosts.length} {likedPosts.length === 1 ? 'post' : 'posts'} liked
          </Typography>
        </Box>

        {/* Liked Posts Grid */}
        {likedPosts.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <FavoriteIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
              No liked posts yet
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Start exploring and like posts you enjoy!
            </Typography>
            <Button variant="contained" onClick={() => navigate('/')} size="large">
              Explore Posts
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {likedPosts.map((post) => {
              const id = String(post.id);
              const isBusy = !!busyMap[id];

              return (
                <Grid item xs={12} sm={6} md={4} key={id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4
                      }
                    }}
                  >
                    {post.image && (
                      <CardMedia
                        component="img"
                        height="200"
                        image={post.image}
                        alt={post.title}
                        sx={{ objectFit: 'cover' }}
                      />
                    )}

                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ mb: 2 }}>
                        <Chip label={post.type} color="primary" size="small" sx={{ mb: 1 }} />
                      </Box>

                      <Typography
                        variant="h6"
                        component="h2"
                        sx={{
                          mb: 1,
                          fontWeight: 'bold',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {post.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          flexGrow: 1
                        }}
                      >
                        {post.description}
                      </Typography>

                      {/* Meta Information */}
                      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <PersonIcon fontSize="small" color="action" />
                          <Typography variant="caption" color="text.secondary">
                            {post.author}
                          </Typography>
                        </Stack>

                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <CalendarIcon fontSize="small" color="action" />
                          <Typography variant="caption" color="text.secondary">
                            {post.date}
                          </Typography>
                        </Stack>
                      </Stack>

                      <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 2 }}>
                        <AccessTimeIcon fontSize="small" color="action" />
                        <Typography variant="caption" color="text.secondary">
                          {post.readTime}
                        </Typography>
                      </Stack>

                      {/* Action Buttons */}
                      <Stack direction="row" spacing={1} sx={{ mt: 'auto' }}>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => navigate(`/blog/${id}`)}
                          sx={{ flexGrow: 1 }}
                        >
                          Read More
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<FavoriteIcon />}
                          onClick={() => handleUnlikePost(id)}
                          color="error"
                          disabled={isBusy}
                        >
                          {isBusy ? 'Unliking...' : 'Liked'}
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </AppTheme>
  );
}
