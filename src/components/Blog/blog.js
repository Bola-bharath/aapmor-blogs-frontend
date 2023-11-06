import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";

import { saveBlogsApi } from "../ApiCalls/apiCalls";

import Cookies from "js-cookie";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setBlogViewObj } from "../Slices/blogSlice";

const Blog = (blogDetails) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const handleReadMore = () => {
    dispatch(setBlogViewObj(blogDetails));
    navigate(`/blogs/${_id}`);
  };
  return (
    <Card
      sx={{
        height: "max-content",
        width: 250,
        "&:hover": {
          boxShadow: "0px 0px 10px 0px #00000050 inset",
        },
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(
              ${blogImage}
            )`,
          backgroundSize: "cover",
          height: 120,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Chip
          label={category}
          size="small"
          sx={{
            justifySelf: "flex-start",
            alignSelf: "flex-end",
            m: "4px 4px 0px 0px",
            backgroundColor: "#00000090",
            fontSize: "10px",
            color: "#ffffff",
          }}
        />
        <Box
          sx={{
            background: "linear-gradient(to top, #000000, #00000002 )",
            paddingLeft: 1,
            boxSizing: "border-box",
          }}
        >
          <Typography variant="subtitle2" color={"#ffffff"}>
            {username}
          </Typography>
          <Typography
            variant="caption"
            color={"lightgray"}
            sx={{ display: "flow" }}
          >
            {userrole}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          pl: 1,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          minHeight: 100,
        }}
      >
        <Typography variant="caption" color={"grey"} fontSize={"10px"}>
          Posted at {date}
        </Typography>
        <Typography variant="p" fontWeight={700}>
          {title.slice(0, 50)}
        </Typography>
        <Typography variant="caption" color={"grey"}>
          {description.slice(0, 60)}...
        </Typography>
      </Box>
      <Divider flexItem orientation="horizontal" />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "max-content",
          padding: "0px 10px",
          alignSelf: "flex-end",
          cursor: "pointer",
          "&:hover": {
            color: "#e65100",
          },
        }}
      >
        <Typography variant="body2">Read more</Typography>
        <IconButton>
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

export default Blog;
