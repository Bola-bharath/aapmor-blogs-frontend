import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

const Blog = (blogDetails) => {
  const {
    category,
    comments,
    date,
    description,
    images,
    likes,
    title,
    username,
    userrole,
    _id,
  } = blogDetails;
  return (
    <Box bgcolor={"background.default"} color={"text.primary"}>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="profile-image">
              {username}
            </Avatar>
          }
          title={username}
          subheader={date}
        />
        <CardMedia
          sx={{ height: 200, width: 345 }}
          image="https://images.freeimages.com/variants/2kqnXDhNwJR2Us1oQgfU7E9N/f4a36f6589a0e50e702740b15352bc00e4bfaf6f58bd4db850e167794d05993d"
          title="blog image"
        />

        <CardContent>
          <Typography variant="body2" color={"#D3D3D3"}>
            {category}
          </Typography>
          <Typography variant="h6" fontWeight={700}>
            T{title}
          </Typography>
          <Typography variant="body1">
            {description}
            <a href="#" style={{ textDecoration: "none", color: "#000EE6" }}>
              ReadMore...
            </a>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Blog;
