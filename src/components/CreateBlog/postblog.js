import {
  Box,
  Button,
  TextField,
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
import { Image } from "@mui/icons-material";
import { useState, React, useEffect } from "react";
import { createBlogApi, publishBlogApi } from "../ApiCalls/apiCalls";
import { useNavigate } from "react-router-dom";
import Header from "../HomePage/navBar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Cookies from "js-cookie";
import htmlContentFunction from "../htmlModifier";

const name = Cookies.get("name");

const modules = {
  toolbar: {
    container: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
    ],
  },
};

const CreateBlog = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [editorHtml, setEditorHtml] = useState("");

  const navigate = useNavigate();
  const handleChange = (html) => {
    setEditorHtml(html);
  };

  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    async function fetchHTMLFile() {
      try {
        const response = await fetch("../content.html");
        console.log(response);
        const html = await response.text();
        console.log(html);
        setHtmlContent(html);
      } catch (error) {
        console.error("Error loading HTML file:", error);
      }
    }

    fetchHTMLFile();
  }, []);

  const newDate = new Date();
  const dateObject = `${newDate.getDate()} ${newDate.toLocaleString("default", {
    month: "short",
  })}, ${newDate.getFullYear()}`;

  const handleFileUpload = async (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setBlogImage(base64);
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

  const submitPost = async () => {
    const blogDetails = {
      name,
      title,
      description,
      blogImage,
      category,
      date: dateObject,
      likes: 0,
      comments: "",
      html: editorHtml,
    };

    const response = await createBlogApi(blogDetails);
    if (response.status === 200) {
      navigate("/");
    }
    const content = { title, description, blogImage, dateObject };
    htmlContentFunction(content);
    const publishBlogResponse = await publishBlogApi(htmlContent);
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
          }}
        >
          {/* HEADER BOX */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "flex-end",
            }}
          >
            <TextField
              placeholder="Enter blog title"
              label="Title"
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
              <Button variant="outlined" onClick={() => navigate("/")}>
                Cancel
              </Button>
              <Button variant="contained" onClick={submitPost}>
                Publish
              </Button>
            </Stack>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Stack direction={"row"} spacing={2}>
              <TextField
                variant="standard"
                placeholder="Enter few lines about your blog*"
                fullWidth
                required
                onChange={(e) => setDescription(e.target.value)}
              />
              <Input
                accept="image/*"
                multiple
                type="file"
                onChange={handleFileUpload}
                id="imageFile"
                sx={{ display: "none" }}
              />
              <Tooltip title="Insert thumbnail image for your blog">
                <label htmlFor="imageFile">
                  <Image />
                </label>
              </Tooltip>
            </Stack>
          </Box>
          {/* EDITOR BOX*/}
          <Box
            sx={{
              width: "100%",
              m: 2,
              alignSelf: "center",
            }}
          >
            <ReactQuill
              theme="snow"
              value={editorHtml}
              onChange={handleChange}
              modules={modules}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default CreateBlog;
