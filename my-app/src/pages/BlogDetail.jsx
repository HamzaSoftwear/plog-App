import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Stack,
  Chip,
  Avatar,
  Divider,
  Paper,
  IconButton
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  AccessTime as AccessTimeIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';
import { strapiService } from '../services/strapiApi';
import AppTheme from '../theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from '../components/AppAppBar';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PrintIcon from '@mui/icons-material/Print';
import { usePostPrefs } from '../context/PostPrefsContext';

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogPost, setBlogPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', comment: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLiked, isBookmarked, toggleLike, toggleBookmark } = usePostPrefs();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const post = await strapiService.getPostById(id);
        if (post) {
          setBlogPost(post);
          // Load comments from localStorage for this post
          const savedComments = localStorage.getItem(`blogPost_${id}_comments`);
          if (savedComments) {
            setComments(JSON.parse(savedComments));
          }
        } else {
          setError('Post not found');
        }
      } catch (err) {
        console.error('Failed to fetch post:', err);
        setError('Failed to load blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    const onScroll = () => {
      const content = document.getElementById('post-content');
      if (!content) return;
      const rect = content.getBoundingClientRect();
      const viewport = window.innerHeight || document.documentElement.clientHeight;
      const total = rect.height;
      const visible = Math.min(Math.max(viewport - Math.max(0, rect.top), 0), total);
      const pct = total > 0 ? Math.round((visible / total) * 100) : 0;
      setProgress(Math.max(0, Math.min(100, pct)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [blogPost]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.name.trim() && newComment.comment.trim()) {
      const comment = {
        id: Date.now(),
        name: newComment.name.trim(),
        comment: newComment.comment.trim(),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      const updatedComments = [...comments, comment];
      setComments(updatedComments);
      
      // Save comments to localStorage for persistence
      localStorage.setItem(`blogPost_${id}_comments`, JSON.stringify(updatedComments));
      
      setNewComment({ name: '', comment: '' });
    }
  };

  const handleInputChange = (field) => (e) => {
    setNewComment({ ...newComment, [field]: e.target.value });
  };

  const goBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <AppTheme>
        <CssBaseline enableColorScheme />
        <AppAppBar />
        <Container sx={{ mt: 10, textAlign: 'center' }}>
          <Typography variant="h4">Loading blog post...</Typography>
        </Container>
      </AppTheme>
    );
  }

  if (error || !blogPost) {
    return (
      <AppTheme>
        <CssBaseline enableColorScheme />
        <AppAppBar />
        <Container sx={{ mt: 10, textAlign: 'center' }}>
          <Typography variant="h4" color="error">
            {error || 'Blog post not found'}
          </Typography>
          <Button onClick={goBack} sx={{ mt: 2 }}>
            <ArrowBackIcon sx={{ mr: 1 }} />
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
      
      <Container maxWidth="md" sx={{ mt: 10, mb: 4 }}>
        {/* Back Button */}
        <Button
          onClick={goBack}
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3 }}
          variant="outlined"
        >
          Back to Blog
        </Button>

        {/* Blog Post Header */}
        <Box sx={{ mb: 4 }}>
          <Chip
            label={blogPost.type}
            color="primary"
            sx={{ mb: 2 }}
          />
          
          <Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight: 'bold' }}>
            {blogPost.title}
          </Typography>
          
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            {blogPost.description}
          </Typography>

          {/* Meta Information */}
          <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <PersonIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {blogPost.author}
              </Typography>
            </Stack>
            
            <Stack direction="row" alignItems="center" spacing={1}>
              <CalendarIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {blogPost.date}
              </Typography>
            </Stack>
            
            <Stack direction="row" alignItems="center" spacing={1}>
              <AccessTimeIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {blogPost.readTime}
              </Typography>
            </Stack>
          </Stack>

          {/* Featured Image */}
          {blogPost.image && (
            <Box
              component="img"
              src={blogPost.image}
              alt={blogPost.title}
              sx={{
                width: '100%',
                height: { xs: 250, sm: 400 },
                objectFit: 'cover',
                borderRadius: 2,
                mb: 4
              }}
            />
          )}
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              size="small"
              startIcon={isLiked(id) ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
              onClick={() => toggleLike(id)}
            >
              {isLiked(id) ? 'Liked' : 'Like'}
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={isBookmarked(id) ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
              onClick={() => toggleBookmark(id)}
            >
              {isBookmarked(id) ? 'Bookmarked' : 'Bookmark'}
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<PrintIcon />}
              onClick={() => window.print()}
            >
              Print
            </Button>
          </Stack>
        </Box>

        {/* Reading progress bar */}
        <Box sx={{ position: 'sticky', top: 64, zIndex: 1, mb: 1 }}>
          <Box sx={{ height: 4, bgcolor: 'divider', borderRadius: 2 }}>
            <Box sx={{ height: 4, width: `${progress}%`, bgcolor: 'primary.main', borderRadius: 2 }} />
          </Box>
        </Box>

        {/* Blog Content */}
        <Paper elevation={0} sx={{ p: 4, mb: 4, backgroundColor: 'background.paper' }}>
          <Box
            id="post-content"
            sx={{
              '& h2': {
                fontSize: '1.8rem',
                fontWeight: 'bold',
                mt: 4,
                mb: 2,
                color: 'text.primary'
              },
              '& h3': {
                fontSize: '1.4rem',
                fontWeight: 'bold',
                mt: 3,
                mb: 1.5,
                color: 'text.primary'
              },
              '& h4': {
                fontSize: '1.2rem',
                fontWeight: 'bold',
                mt: 2,
                mb: 1,
                color: 'text.primary'
              },
              '& p': {
                fontSize: '1.1rem',
                lineHeight: 1.7,
                mb: 2,
                color: 'text.primary'
              },
              '& ul, & ol': {
                pl: 3,
                mb: 2
              },
              '& li': {
                fontSize: '1.1rem',
                lineHeight: 1.7,
                mb: 0.5
              },
              '& strong': {
                fontWeight: 'bold'
              },
              '@media print': {
                boxShadow: 'none',
                p: 0
              }
            }}
            dangerouslySetInnerHTML={{ 
              __html: blogPost.content || '<p>No content available</p>'
            }}
          />
        </Paper>

        {/* Comments Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
            Comments ({comments.length})
          </Typography>

          {/* Comment Form */}
          <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
            <form onSubmit={handleCommentSubmit}>
              <Stack spacing={2}>
                <TextField
                  
                  placeholder='your name'
                  value={newComment.name}
                  onChange={handleInputChange('name')}
                  required
                  fullWidth
                  variant="outlined"
                />
                <TextField
                placeholder='Write a comment'
                  
                  value={newComment.comment}
                  onChange={handleInputChange('comment')}
                  required
                  
                  rows={4}
                  fullWidth
                  variant="outlined"
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ alignSelf: 'flex-start', px: 4 }}
                >
                  Post Comment
                </Button>
              </Stack>
            </form>
          </Paper>

          {/* Comments List */}
          <Stack spacing={2}>
            {comments.length === 0 ? (
              <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No comments yet. Be the first to comment!
              </Typography>
            ) : (
              comments.map((comment) => (
                <Card key={comment.id} elevation={1}>
                  <CardContent>
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {comment.name.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {comment.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {comment.date} at {comment.time}
                          </Typography>
                        </Stack>
                        <Typography variant="body1">
                          {comment.comment}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              ))
            )}
          </Stack>
        </Box>
      </Container>
    </AppTheme>
  );
}

