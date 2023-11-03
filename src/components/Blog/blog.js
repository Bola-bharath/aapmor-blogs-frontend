import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";

import { saveBlogsApi } from "../ApiCalls/apiCalls";

import Cookies from "js-cookie";
import React from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import axios from "axios";

const Blog = (blogDetails) => {
  console.log(blogDetails);
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
    blogImage,
  } = blogDetails.blogDetails;

  const token = Cookies.get("jwtToken");
  let saveIcon = "";

  if (token !== undefined) {
    saveIcon = "visible";
  } else {
    saveIcon = "none";
  }

  // const savedBlogs = async (email) => {
  //   const response = await axios.get(saveBlogsApi, { email });
  //   const num = response.data;

  //   console.log(num);
  // };

  return (
    <Box bgcolor={"background.default"} color={"text.primary"}>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="profile-image">
              {username.slice(0, 1)}
            </Avatar>
          }
          title={username}
          subheader={date}
        />
        <Box
          sx={{
            backgroundImage: `url(
              ${blogImage}
            )`,
            backgroundSize: "cover",
            height: 200,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          {/* <Box
            sx={{
              background:
                "linearGradient(195deg, #ffffff 32.93%, #ffffff 89.72%)",
            }}
          >
            <Typography>{username}</Typography>
            <Typography>{userrole}</Typography>
          </Box> */}
        </Box>
        {/* <CardMedia
          sx={{ height: 200, width: 345 }}
          image="https://images.freeimages.com/variants/2kqnXDhNwJR2Us1oQgfU7E9N/f4a36f6589a0e50e702740b15352bc00e4bfaf6f58bd4db850e167794d05993d"
          title="blog image"
        /> */}

        <CardContent>
          <Typography variant="body2" color={"#D3D3D3"}>
            {category}
          </Typography>
          <Typography variant="h6" fontWeight={700}>
            {title}
          </Typography>
          <Typography variant="body1">
            {description.slice(0, 100)}...
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button variant="text">Read More...</Button>
          <IconButton sx={{ display: `${saveIcon}` }}>
            <BookmarkBorderIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Blog;
