import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Stack,
  Input,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState, React } from "react";
import { Image } from "@mui/icons-material";
import { createBlogApi } from "../ApiCalls/apiCalls";
import { useNavigate } from "react-router-dom";
import Header from "../HomePage/navBar";

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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField
              variant="standard"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
              fullWidth
            />
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
          </Box>
          <TextField
            multiline
            rows={8}
            variant="standard"
            placeholder="Write Your blog"
            fullWidth
            onChange={(e) => setDescription(e.target.value)}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <TextField
              variant="standard"
              placeholder="Enter Your Name"
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              size="small"
            />
            <Box sx={{ minWidth: 200 }}>
              <FormControl fullWidth variant="standard">
                <InputLabel>Role</InputLabel>
                <Select
                  value={userrole}
                  label={userrole}
                  onChange={(e) => setUserrole(e.target.value)}
                >
                  <MenuItem value={"Full Stack Developer"}>
                    Full Stack Developer
                  </MenuItem>
                  <MenuItem value={"Data Analyst"}>Data Analyst</MenuItem>
                  <MenuItem value={"Quality Analyst"}>Quality Analyst</MenuItem>
                  <MenuItem value={"UI/UX Designer"}>UI/UX Designer</MenuItem>
                  <MenuItem value={"AI/ML"}>AI/ML</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 200 }}>
              <FormControl fullWidth variant="standard">
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  label={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  <MenuItem value={"Fitness"}>Fitness</MenuItem>
                  <MenuItem value={"Artificial Intelligence"}>
                    Artificial Intelligence
                  </MenuItem>
                  <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                  <MenuItem value={"Politics"}>Politics</MenuItem>
                  <MenuItem value={"International"}>International</MenuItem>
                  <MenuItem value={"News"}>News</MenuItem>

                  <MenuItem value={"Sports"}>Sports</MenuItem>
                  <MenuItem value={"Fashion"}>Fashion</MenuItem>

                  <MenuItem value={"Food"}>Food</MenuItem>

                  <MenuItem value={"Arts"}>Arts</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {/* <TextField
              variant="standard"
              placeholder="Select blog Role"
              onChange={(e) => setUserrole(e.target.value)}
              margin="normal"
              size="small"
            />
            <TextField
              variant="standard"
              placeholder="Select blog category"
              onChange={(e) => setCategory(e.target.value)}
              margin="normal"
            /> */}
            <Button
              variant="outlined"
              onClick={submitPost}
              sx={{ height: "30px" }}
            >
              Publish
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default CreateBlog;
