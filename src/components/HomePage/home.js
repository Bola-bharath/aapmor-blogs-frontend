import React, { useEffect, useState } from "react";
import Header from "./navBar";
import Footer from "./footer";
import Blog from "../Blog/blog";
import SideBar from "../Sidebar/sideBar";
import {
  Button,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Box, Chip, Grid } from "@mui/material";
import styled from "@emotion/styled";
import { getBlogsApi } from "../ApiCalls/apiCalls";
import { setBlogsData } from "../Slices/blogSlice";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";

const ChipStyled = styled(Chip)((theme) => {
  return {
    cursor: "pointer",
  };
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: "300px",
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 2,
};

const Home = (props) => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(true);
  const [category, setCategory] = useState("All");
  const [apiStatus, setApiStatus] = useState("INITIAL");
  const blogObj = useSelector((state) => state.blogs);
  const [intervalId, setIntervalId] = useState(null);
  const [loading, setLoading] = useState(true);

  const blogs = blogObj.blogs;

  useEffect(() => {
    getBlogsData();
  }, []);

  /* useEffect(() => {
    const intervalId = setTimeout(() => {
      setProfile(true);
    }, 5000);
    setIntervalId(intervalId);
  }); */

  const getBlogsData = async () => {
    const response = await getBlogsApi(category);
    if (response.status === 200) {
      setApiStatus("SUCCESS");
      dispatch(setBlogsData(response.data));
    } else {
      setApiStatus("FAILURE");
    }
  };

  useEffect(() => {
    setApiStatus("INITIAL");
    getBlogsData();
  }, [category]);

  const renderLoadingView = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
          width: "80vw",
        }}
      >
        <CircularProgress />
      </Box>
    );
  };

  const renderSuccessView = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          minHeight: "90vh",
          padding: "20px",
          boxSizing: "border-box",
          justifyContent: "center",
        }}
        bgcolor={"background.default"}
        color={"text.primary"}
        gap={2}
      >
        {blogs.map((blogItem) => {
          return <Blog blogDetails={blogItem} key={blogItem._id} />;
        })}
      </Box>
    );
  };

  const renderFailureView = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "85vh",
        }}
      >
        <Typography variant="h6">
          Unable to load blogs... please try after some time
        </Typography>
      </Box>
    );
  };

  const renderBlogsApi = () => {
    switch (apiStatus) {
      case "INITIAL":
        return renderLoadingView();
      case "SUCCESS":
        return renderSuccessView();
      case "FAILURE":
        return renderFailureView();
      default:
        return null;
    }
  };
  const handleClose = () => {
    setProfile(false);
    // clearTimeout(intervalId);
  };

  const showPopupProfile = () => {
    return (
      <Modal open={profile} onClose={handleClose}>
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="p" fontSize={16} fontWeight={600}>
              Profile Update
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider orientation="horizontal" />

          <Typography variant="subtitle1" fontWeight={600} textAlign={"center"}>
            Hey User! tell us a little more about you
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">Designation *</Typography>
            <FormControl sx={{ width: "95%", mt: 1 }} size="small">
              <InputLabel>Select</InputLabel>
              <Select>
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Devops">Devops</MenuItem>
                <MenuItem value="QA">QA</MenuItem>
                <MenuItem value="Data Science">Data Science</MenuItem>
                <MenuItem value="Data Analyst">Data Analyst</MenuItem>
                <MenuItem value="Full Stack Developer">
                  Full Stack Developer
                </MenuItem>
                <MenuItem value="UI / UX">UI / UX</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="body2">Gender *</Typography>
            <FormControl sx={{ width: "95%", mt: 1 }} size="small">
              <InputLabel>Select</InputLabel>
              <Select>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <LoadingButton
            color="primary"
            onClick={() => setLoading(true)}
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
          >
            <span>Save</span>
          </LoadingButton>
        </Box>
      </Modal>
    );
  };

  return (
    <>
      <Header />
      <Box sx={{ display: "flex" }}>
        <SideBar setCategory={setCategory} category={category} />
        {renderBlogsApi()}
      </Box>
      <Footer />
      {profile && showPopupProfile()}
    </>
  );
};

export default Home;
