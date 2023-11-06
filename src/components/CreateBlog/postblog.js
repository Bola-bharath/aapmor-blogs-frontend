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
  Fab,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useState, React } from "react";
import { Image } from "@mui/icons-material";
import { createBlogApi } from "../ApiCalls/apiCalls";
import { useNavigate } from "react-router-dom";
import Header from "../HomePage/navBar";
import TitleIcon from "@mui/icons-material/Title";
import HMobiledataIcon from "@mui/icons-material/HMobiledata";

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
  const renderTextInput = () => {};
  const renderHeadingInput = () => {};
  const renderImageInput = () => {};

  return (
    <>
      <Header />
      <Box align="center" sx={{ height: "100vh", padding: 2 }}>
        <Box
          sx={{ width: { xs: "100%", lg: "75%" } }}
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
              sx={{ width: "50%" }}
            />
            <Stack direction="row" spacing={1} alignItems="center">
              <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth variant="filled">
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={category}
                    label={category}
                    onChange={(e) => setCategory(e.target.value)}
                    fullWidth
                    size="small"
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
              <Button
                variant="contained"
                onClick={submitPost}
                sx={{ height: "30px" }}
              >
                Publish
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate("/")}
                sx={{ height: "30px" }}
              >
                Cancel
              </Button>
            </Stack>
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
            rows={5}
            // variant="filled"
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
            {/* <Box sx={{ minWidth: 200 }}>
         
            </Box>

            */}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{ width: "30px", position: "fixed", top: "200px", left: "100px" }}
      >
        <Stack direction="column">
          <Tooltip title="Insert Text" placement="left">
            <IconButton onClick={renderTextInput}>
              <TitleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Insert Heading" placement="left">
            <IconButton onClick={renderHeadingInput}>
              <HMobiledataIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Insert Image" placement="left">
            <IconButton onClick={renderImageInput}>
              <Image />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
    </>
  );
};
export default CreateBlog;
