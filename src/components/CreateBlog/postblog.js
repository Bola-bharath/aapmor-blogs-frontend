import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Stack,
  Input,
} from "@mui/material";
import { useState, React } from "react";
import { Image } from "@mui/icons-material";
import axios from "axios";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(true);
  const handleFileUpload = () => {};
  const submitPost = () => {};

  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <Box
          width={500}
          height={300}
          bgcolor="lightGreen"
          color={"text.primary"}
          p={3}
          borderRadius={5}
        >
          <Typography variant="h6">Create Post</Typography>
          <TextField
            variant="standard"
            placeholder="Enter blog title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            multiline
            rows={8}
            placeholder="Enter blog description"
            fullWidth
            onChange={(e) => setDescription(e.target.value)}
          />
          <Stack direction="row" gap={2}>
            <Input
              accept="image/*"
              multiple
              type="file"
              onChange={handleFileUpload}
              id="imageFile"
            />
            <label htmlFor="imageFile">
              <Image />
            </label>
          </Stack>
          <Button onClick={submitPost}>Post</Button>
        </Box>
      </Modal>
    </>
  );
};
export default CreateBlog;
