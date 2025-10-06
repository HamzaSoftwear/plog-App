import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { strapiService } from "../services/strapiApi";

export default function Features() {
  const [active, setActive] = useState("All");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const categories = ["All", "Technology", "Startup", "Lifestyle", "Finance"];

  // Fetch posts from Strapi
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await strapiService.getAllPosts();
        setPosts(data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleCardClick = (postId) => {
    navigate(`/blog/${postId}`);
  };

  // 🔹 Filter articles based on active category
  const filteredArticles =
    active === "All"
      ? posts
      : posts.filter((article) => article.type === active);

  // Show loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Show error state
  if (error) {
    return (
      <Container sx={{ pt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <div>
      {/* Category Buttons */}
      <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setActive(category)}
            sx={(theme) => ({
              borderRadius: "20px",
              textTransform: "none",
              px: 3,
              py: 1,
              fontWeight: active === category ? "bold" : "normal",
              backgroundColor:
                active === category ? theme.palette.primary.main : "transparent",
              color:
                active === category ? "#fff" : theme.palette.text.primary,
              border:
                active === category
                  ? "none"
                  : `1px solid ${theme.palette.divider}`,
              ...theme.applyStyles("dark", {
                color:
                  active === category ? "#fff" : theme.palette.primary.light,
              }),
            })}
          >
            {category}
          </Button>
        ))}
      </Stack>

      {/* Articles */}
      <Container sx={{ pt: 4, display: "flex", flexWrap: "wrap", gap: 3 }}>
        {filteredArticles.length === 0 ? (
          <Box sx={{ width: '100%', textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No posts found for the selected category.
            </Typography>
          </Box>
        ) : (
          filteredArticles.map((article) => (
            <Card
              key={article.id}
              sx={{
                maxWidth: 345,
                borderRadius: 3,
                boxShadow: 3,
                flex: "1 1 300px",
                cursor: "pointer",
                transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
              onClick={() => handleCardClick(article.id)}
            >
              <CardActionArea>
                {/* Image */}
                <CardMedia
                  component="img"
                  image={article.image || '/placeholder-image.jpg'}
                  alt={article.type}
                  sx={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />

                {/* Content */}
                <CardContent>
                  {/* Category */}
                  <Chip
                    label={article.type}
                    color="secondary"
                    sx={{ mb: 1, mt: 1 }}
                  />

                  {/* Title */}
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontWeight: "bold",
                      lineHeight: 1.4,
                      mb: 0.5,
                      pl: "10px",
                    }}
                  >
                    {article.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.5,
                      pl: "10px",
                      mb: 2,
                    }}
                  >
                    {article.description}
                  </Typography>

                </CardContent>
              </CardActionArea>
            </Card>
          ))
        )}
      </Container>
    </div>
  );
}
