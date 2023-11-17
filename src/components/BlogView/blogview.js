import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../HomePage/navBar";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import Footer from "../HomePage/footer";
import { commentsApi, likesApi } from "../ApiCalls/apiCalls";
import Cookies from "js-cookie";
import { LoadingButton } from "@mui/lab";

const BlogView = () => {
  const navigate = useNavigate();
  const [blogDetails, setBlogDetails] = useState({});
  const [saved, setSaved] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const path = pathname.split("/");
  const id = path[2];
  const [apiStatus, setApiStatus] = useState("INITIAL");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const token = Cookies.get("jwtToken");
  const name = Cookies.get("username");
  const dateObject = new Date();

  const handleCommentApi = async () => {
    setLoading(true);
    const commentObject = { comment, id, name, dateObject };
    const response = await commentsApi(commentObject);
    console.log(response);
    if (response.status === 200) {
      setLoading(false);
      getBlogItem();
    }
    setComment("");
  };

  useEffect(() => {
    getBlogItem();
  }, []);

  const handleLikes = async () => {
    const response = await likesApi({ id });
    console.log(response);
    if (response.status === 200) {
      getBlogItem();
    }
  };

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

  // RENDER EACH COMMENT

  const renderComments = () => {
    return (
      <Stack
        direction={"column"}
        spacing={0}
        bgcolor={"background.default"}
        color={"text.primary"}
      >
        {commentsArray.map((eachComment) => {
          return (
            <>
              <Stack
                key={eachComment._id}
                direction={"row"}
                spacing={2}
                sx={{
                  padding: 1,
                  boxSizing: "border-box",
                }}
                bgcolor={"background.default"}
                color={"text.primary"}
              >
                <Avatar>{eachComment.name[0].toUpperCase()}</Avatar>
                <Stack direction={"column"} spacing={1}>
                  <Typography variant="inherit" color={"#000"} fontWeight={600}>
                    {eachComment.name}
                  </Typography>

                  <Typography variant="body2">{eachComment.comment}</Typography>
                </Stack>
              </Stack>
              <Divider orientation="horizontal" flexItem />
            </>
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
          justifyContent: "center",
          alignItems: "space-around",
          marginBottom: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            padding: 4,
            paddingTop: 0,
            maxWidth: "70%",
            boxSizing: "border-box",
          }}
        >
          <Chip
            label={category}
            size="small"
            color="primary"
            sx={{
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
              <Typography variant="p">{username}</Typography>
              <Stack direction={"row"} spacing={2}>
                <Typography variant="caption" color={"darkgray"}>
                  Created on {date}
                </Typography>
              </Stack>
            </Stack>
            {saved ? (
              <Tooltip title="Remove from saved blogs">
                <IconButton onClick={() => setSaved(!saved)}>
                  <BookmarkAddedIcon color="primary" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Add to saved blogs">
                <IconButton onClick={() => setSaved(!saved)}>
                  <BookmarkAddOutlinedIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>

          <Divider orientation="horizontal" flexItem />

          {/* HTML FILE */}

          <Box
            dangerouslySetInnerHTML={{ __html: html }}
            sx={{ width: "70%" }}
          ></Box>

          <Divider orientation="horizontal" flexItem sx={{ mt: 3 }} />
          {/* Comments and likes*/}
          <Stack direction={"row"} spacing={4} mt={2}>
            <Stack direction={"column"} alignItems={"center"}>
              <IconButton
                onClick={handleLikes}
                sx={{ marginTop: 0, padding: 0 }}
              >
                <ThumbUpOutlinedIcon />
              </IconButton>
              <Typography>{likes} </Typography>
            </Stack>
            <Stack direction={"column"} alignItems={"center"} mt={2}>
              <InsertCommentOutlinedIcon />
              <Typography>{commentsArray.length} </Typography>
            </Stack>
          </Stack>
        </Box>
        {/* Comments view */}
        <Box
          sx={{
            paddingLeft: 4,
            backgroundColor: "#fff",
            width: "50%",
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
            {token && (
              <Box
                sx={{
                  backgroundColor: "#bfbfbf20",
                  borderRadius: 2,
                  padding: 1,
                  boxSizing: "border-box",
                  mt: 1,
                }}
              >
                <Stack direction={"row"} spacing={3} sx={{ mt: 1 }}>
                  <Avatar>{name[0].toUpperCase()}</Avatar>
                  <Stack
                    direction={"column"}
                    alignItems={"flex-end"}
                    spacing={1}
                    sx={{ width: "100%" }}
                  >
                    <TextField
                      placeholder="Add a comment"
                      sx={{
                        fontSize: "10px",
                        backgroundColor: "#fff",
                        paddingLeft: 1,
                        paddingTop: 1,
                      }}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      variant="standard"
                      multiline
                      rows={2}
                      fullWidth
                    />
                    <LoadingButton
                      variant="contained"
                      loading={loading}
                      size="small"
                      onClick={handleCommentApi}
                      endIcon={<SendOutlinedIcon />}
                    >
                      Send
                    </LoadingButton>
                  </Stack>
                </Stack>
              </Box>
            )}

            <Divider sx={{ mt: 1 }} />

            {commentsArray.length > 0
              ? renderComments()
              : renderNoCommentsView()}
            {/* Comments box */}
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
      <IconButton
        sx={{ pl: 2, pt: 2 }}
        size="small"
        onClick={() => navigate("/")}
      >
        <ArrowBackIosIcon />
      </IconButton>

      {renderBlogDetails()}
      <Footer />
    </>
  );
};

export default BlogView;
