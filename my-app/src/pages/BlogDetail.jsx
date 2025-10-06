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
import { usePostInteractions } from '../context/PostInteractionsContext';
import { useAuth } from '../context/AuthContext';

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogPost, setBlogPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [commentLoading, setCommentLoading] = useState(false);
  
  const { user } = useAuth();
  const {
    isLiked,
    isSaved,
    getLikesCount,
    getComments,
    toggleLike,
    toggleSave,
    addComment,
    loadPostInteractions,
    isLoading
  } = usePostInteractions();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const post = await strapiService.getPostById(id);
        if (post) {
          setBlogPost(post);
          // Load interactions from Firestore
          await loadPostInteractions(id);
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

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (!newComment.trim()) {
      alert('Please write a comment before submitting.');
      return;
    }
    
    setCommentLoading(true);
    try {
      console.log('Submitting comment:', { postId: id, user, text: newComment });
      await addComment(id, newComment);
      setNewComment('');
      console.log('Comment submitted successfully');
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment. Please try again.');
    } finally {
      setCommentLoading(false);
    }
  };

  const handleLikeClick = async () => {
    if (!user) {
      // Redirect to login page instead of showing alert
      navigate('/login');
      return;
    }
    
    try {
      await toggleLike(id);
    } catch (error) {
      console.error('Error toggling like:', error);
      alert('Failed to like post. Please try again.');
    }
  };

  const handleSaveClick = async () => {
    if (!user) {
      // Redirect to login page instead of showing alert
      navigate('/login');
      return;
    }
    
    try {
      await toggleSave(id);
    } catch (error) {
      console.error('Error toggling save:', error);
      alert('Failed to save post. Please try again.');
    }
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
          sx={{ mb: 3, mt:4 }}
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
              onClick={handleLikeClick}
              disabled={isLoading(id)}
            >
              {isLiked(id) ? 'Liked' : 'Like'} ({getLikesCount(id)})
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={isSaved(id) ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
              onClick={handleSaveClick}
              disabled={isLoading(id)}
            >
              {isSaved(id) ? 'Saved' : 'Save'}
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
            Comments ({getComments(id).length})
          </Typography>

          {/* Comment Form */}
          {user ? (
            <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
              <form onSubmit={handleCommentSubmit}>
                <Stack spacing={2}>
                  <TextField
                    placeholder='Write a comment...'
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                    multiline
                    rows={5}
                    fullWidth
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        minHeight: '120px',
                      }
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ 
                      alignSelf: 'flex-start', 
                      px: 4,
                      backgroundColor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                      '&:disabled': {
                        backgroundColor: 'grey.300',
                        color: 'grey.600',
                        border: '1px solid',
                        borderColor: 'grey.300',
                      }
                    }}
                    disabled={!newComment.trim() || commentLoading}
                  >
                    {commentLoading ? 'Posting...' : 'Post Comment'}
                  </Button>
                </Stack>
              </form>
            </Paper>
          ) : (
            <Paper elevation={1} sx={{ p: 3, mb: 3, textAlign: 'center' }}>
              <Typography color="text.secondary">
                Please <Button onClick={() => navigate('/login')}>log in</Button> to comment
              </Typography>
            </Paper>
          )}

          {/* Comments List */}
          <Stack spacing={2}>
            {getComments(id).length === 0 ? (
              <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No comments yet. Be the first to comment!
              </Typography>
            ) : (
              getComments(id).map((comment) => (
                <Card key={comment.id} elevation={1} sx={{ borderRadius: 2 }}>
                  <CardContent sx={{ p: 1 }}>
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      <Avatar 
                        src={comment.userPhoto} 
                        sx={{ 
                          bgcolor: 'primary.main',
                          width: 48,
                          height: 48,
                          fontSize: '1.2rem'
                        }}
                      >
                        {comment.userName.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1.5 }}>
                          <Typography variant="subtitle1" fontWeight="bold" sx={{ fontSize: '1rem' }}>
                            {comment.userName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                            {comment.createdAt?.toLocaleDateString()} at {comment.createdAt?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </Typography>
                        </Stack>
                        <Typography variant="body1" sx={{ 
                          fontSize: '1rem',
                          lineHeight: 1.6,
                          wordBreak: 'break-word'
                        }}>
                          {comment.text}
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

