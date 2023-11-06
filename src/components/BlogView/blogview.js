import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../HomePage/navBar";
import FavoriteIcon from "@mui/icons-material/Favorite";

const BlogView = (props) => {
  const [blogDetails, setBlogDetails] = useState({});
  const location = useLocation();
  const { pathname } = location;
  const path = pathname.split("/");
  const id = path[2];
  console.log(id, "Outside");
  const [apiStatus, setApiStatus] = useState("INITIAL");

  useEffect(() => {
    console.log("Use effect");
    getBlogItem();
  }, []);

  const getBlogItem = async () => {
    console.log(id, "from api call");
    const response = await axios.get(`http://localhost:3005/blogs/${id}`);
    const blogDetails = await response.data;
    console.log(blogDetails);
    if (response.status === 200) {
      setApiStatus("SUCCESS");
      setBlogDetails(blogDetails);
    } else {
      setApiStatus("FAILURE");
    }
  };

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
  } = blogDetails;

  const renderLoading = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "85vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  };

  const renderComments = () => {
    return (
      <Stack
        direction={"column"}
        spacing={1}
        bgcolor={"background.default"}
        color={"text.primary"}
      >
        {comments.map((eachComment) => {
          return (
            <Stack
              direction={"column"}
              spacing={1}
              sx={{
                padding: 0.5,
              }}
              bgcolor={"background.default"}
              color={"text.primary"}
            >
              <Typography variant="caption" color={"blue"}>
                {eachComment.name}
              </Typography>

              <Typography variant="body1">{eachComment.comment}</Typography>
              <Divider orientation="horizontal" flexItem />
            </Stack>
          );
        })}
      </Stack>
    );
  };

  const renderNoCommentsView = () => {
    return (
      <Box>
        <Typography variant="caption">No comments yet</Typography>
      </Box>
    );
  };

  const renderBLogView = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
        bgcolor={"background.default"}
        color={"text.primary"}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingLeft: 3,
            boxSizing: "border-box",
          }}
        >
          <Typography gutterBottom variant="h4" color={"grey"}>
            {title}
          </Typography>
          <Typography variant="caption">
            by <b>{username}</b> on <b>{date}</b>
          </Typography>
          <Divider orientation="horizontal" flexItem />
          <Typography
            gutterBottom
            variant="body1"
            mt={2}
            sx={{ display: "inline", maxWidth: "80%" }}
          >
            {description}
          </Typography>
          <img src={blogImage} alt="blogimage" height={300} width="auto" />
          {/* <Typography gutterBottom variant="body1">
            {description.slice(100)}
          </Typography>
          <img src={blogImage} alt="blogimage" height={300} width="auto" />
 */}
          <Stack direction={"row"} spacing={1} mt={2}>
            <FavoriteIcon />
            <Typography>{likes} likes</Typography>
          </Stack>
        </Box>
        <Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              borderRightWidth: 4,
              height: "100%",
              alignSelf: "center",
            }}
          />
        </Box>
        <Box
          sx={{
            position: "sticky",
            top: 0,
            bottom: "0px",
            width: "300px",
            padding: 2,
          }}
          bgcolor={"background.default"}
          color={"text.primary"}
        >
          <Box
            sx={{ width: "300px" }}
            bgcolor={"background.default"}
            color={"text.primary"}
          >
            <Typography
              sx={{ backgroundColor: "lightgrey", borderRadius: "10px", p: 1 }}
            >
              Comments
            </Typography>
            {comments.length >= 1 ? renderComments() : renderNoCommentsView()}

            <Box>
              <Stack direction={"row"} spacing={1} sx={{ mt: 1 }}>
                <TextField
                  size="small"
                  placeholder="Enter new comment"
                  sx={{ fontSize: "10px" }}
                />
                <Button variant="contained" size="small">
                  Comment
                </Button>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };
  const renderFailureView = () => {
    return <Box>Unable to view the blog</Box>;
  };

  const renderBlogDetails = () => {
    switch (apiStatus) {
      case "INITIAL":
        return renderLoading();
      case "SUCCESS":
        return renderBLogView();
      case "FAILURE":
        return renderFailureView();
      default:
        return null;
    }
  };
  return (
    <>
      <Header />
      {renderBlogDetails()}
    </>
  );
};

export default BlogView;
