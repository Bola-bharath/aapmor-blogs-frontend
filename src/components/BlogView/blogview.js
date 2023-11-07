import {
  Avatar,
  Box,
  Button,
  Chip,
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
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import Footer from "../HomePage/footer";
import { commentsApi } from "../ApiCalls/apiCalls";
import Cookies from "js-cookie";

const BlogView = (props) => {
  const [blogDetails, setBlogDetails] = useState({});
  const location = useLocation();
  const { pathname } = location;
  const path = pathname.split("/");
  const id = path[2];
  const [apiStatus, setApiStatus] = useState("INITIAL");
  const [comment, setComment] = useState("");

  const token = Cookies.get("jwtToken");
  const name = Cookies.get("name");
  const dateObject = new Date();

  const handleCommentApi = async () => {
    const commentObject = { comment, id, name, dateObject };
    const response = await commentsApi(commentObject);
    console.log(response);
    if (response.status === 200) {
      getBlogItem();
    }
    setComment("");
  };

  useEffect(() => {
    getBlogItem();
  }, []);

  const getBlogItem = async () => {
    const response = await axios.get(`http://localhost:3005/blogs/${id}`);
    const blogDetails = await response.data;
    if (response.status === 200) {
      setApiStatus("SUCCESS");
      setBlogDetails(blogDetails);
    } else {
      setApiStatus("FAILURE");
    }
  };

  const { category, comments, date, likes, title, html, username } =
    blogDetails;
  const commentsArray = comments === null ? [] : comments;

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
      <Box sx={{}}>
        <Typography variant="body1">No comments yet</Typography>
      </Box>
    );
  };

  const renderBLogView = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "75%",
          marginBottom: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: 4,
            boxSizing: "border-box",
          }}
        >
          <Chip
            label={category}
            size="small"
            color="primary"
            sx={{
              justifySelf: "flex-start",
              alignSelf: "flex-start",
              fontSize: "12px",
              color: "#ffffff",
              padding: 1,
              mb: 2,
            }}
          />
          <Typography gutterBottom variant="h4" color={"grey"}>
            {title}
          </Typography>

          <Box sx={{ display: "flex", gap: 1, pb: 1 }}>
            <Avatar>P</Avatar>
            <Stack direction={"column"} spacing={0}>
              <Stack
                direction={"row"}
                spacing={1}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Typography variant="p">{username}</Typography>
                <Typography variant="caption">Follow</Typography>
              </Stack>
              <Stack direction={"row"} spacing={2}>
                <Typography variant="caption" color={"darkgray"}>
                  Created on {date}
                </Typography>
                <Typography variant="caption" color={"#00000060"}>
                  5 min read.
                </Typography>
                <Typography variant="caption" color={"#00000080"}>
                  3K people read this
                </Typography>
              </Stack>
            </Stack>
          </Box>
          <Divider orientation="horizontal" flexItem />
          {/* HTML FILE */}

          <Box
            dangerouslySetInnerHTML={{ __html: html }}
            sx={{ width: "75%", maxWidth: "75%" }}
          ></Box>

          <Divider orientation="horizontal" flexItem sx={{ mt: 3 }} />
          {/* Comments */}
          <Stack direction={"row"} spacing={4} mt={2}>
            <Stack direction={"column"} alignItems={"center"}>
              <ThumbUpOutlinedIcon />
              <Typography>{likes} </Typography>
            </Stack>
            <Stack direction={"column"} alignItems={"center"} mt={2}>
              <InsertCommentOutlinedIcon />
              <Typography>{comments.length} </Typography>
            </Stack>
          </Stack>
        </Box>
        {/* Comments view */}
        <Box
          sx={{
            paddingLeft: 4,
            backgroundColor: "#fff",
          }}
        >
          <Box>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <ChatBubbleOutlineOutlinedIcon />
              <Typography fontFamily={"Lora"} fontSize={"24px"}>
                Comments
              </Typography>
            </Stack>
            <Divider orientation="horizontal" flexItem />
            {commentsArray.length >= 1
              ? renderComments()
              : renderNoCommentsView()}
            {/* Comments box */}
            {token && (
              <Box>
                <Stack direction={"row"} spacing={1} sx={{ mt: 1 }}>
                  <TextField
                    size="small"
                    placeholder="Enter new comment"
                    sx={{ fontSize: "10px" }}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleCommentApi}
                  >
                    Comment
                  </Button>
                </Stack>
              </Box>
            )}
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
      <Footer />
    </>
  );
};

export default BlogView;
