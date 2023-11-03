import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Stack,
  Input,
} from "@mui/material";
import { useState, React } from "react";
import { Image } from "@mui/icons-material";
import { createBlogApi } from "../ApiCalls/apiCalls";
import { useNavigate } from "react-router-dom";
import Header from "../HomePage/Header";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [username, setUsername] = useState("");
  const [userrole, setUserrole] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const handleFileUpload = async (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImage(base64);
  };

  const newDate = new Date();
  const dateObject = `${newDate.getDate()} ${newDate.toLocaleString("default", {
    month: "short",
  })}, ${newDate.getFullYear()}`;

  const submitPost = async () => {
    const blogDetails = {
      title,
      description,
      category,
      username,
      userrole,
      blogImage: image,
      date: dateObject,
      likes: 5,
      comments: [],
    };
    console.log(blogDetails);
    const response = await createBlogApi(blogDetails);
    const data = await response.data;
    console.log(data);
    if (response.status === 200) {
      navigate("/");
    }
  };
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  return (
    <>
      <Header />
      <Box
        align="center"
        backgroundColor="grey"
        sx={{ height: "100vh", padding: 2 }}
      >
        <Box
          width={{ xs: 500, sm: 800 }}
          // sx={{ marginTop: "3vh" }}

          bgcolor="white"
          color={"text.primary"}
          p={3}
        >
          <Typography variant="h6">Create Blog</Typography>
          <TextField
            variant="standard"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            fullWidth
          />
          <TextField
            multiline
            rows={8}
            variant="standard"
            placeholder="Write Your blog"
            fullWidth
            onChange={(e) => setDescription(e.target.value)}
          />
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <TextField
              variant="outlined"
              placeholder="Enter Your Name"
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              size="small"
            />
            <TextField
              variant="outlined"
              placeholder="Enter blog Role"
              onChange={(e) => setUserrole(e.target.value)}
              margin="normal"
              size="small"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Input
              accept="image/*"
              multiple
              type="file"
              onChange={handleFileUpload}
              id="imageFile"
              sx={{ display: "none" }}
            />
            <label htmlFor="imageFile">
              <Image />
            </label>
            <TextField
              variant="standard"
              placeholder="Enter blog category"
              onChange={(e) => setCategory(e.target.value)}
              margin="normal"
            />
            <Button variant="outlined" onClick={submitPost}>
              Publish
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default CreateBlog;
