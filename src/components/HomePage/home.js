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
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Box, Chip, Grid } from "@mui/material";
import styled from "@emotion/styled";
import {
  getBlogsApi,
  profileCheckingApi,
  profileUpdateApi,
} from "../ApiCalls/apiCalls";
import { setBlogsData } from "../Slices/blogSlice";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import Cookies from "js-cookie";

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
  height: "350px",
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 2,
};

const Home = (props) => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(false);
  const [category, setCategory] = useState("All");
  const [apiStatus, setApiStatus] = useState("INITIAL");
  const blogObj = useSelector((state) => state.blogs);
  const blogs = blogObj.blogs;

  const [designation, setDesignation] = useState("Select");
  const [gender, setGender] = useState("Select");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const email = Cookies.get("userEmail");

  const handleProfileUpdate = async () => {
    setLoading(true);
    const profileDetails = {
      gender,
      designation,
      email,
      name: name,
      isProfileUpdated: true,
    };
    const response = await profileUpdateApi(profileDetails);
    if (response.status === 200) {
      Cookies.set("name", name, { expires: 10 });
      setProfile(false);
      alert("Profile details updated successfully");
    }
  };

  useEffect(() => {
    const token = Cookies.get("jwtToken");
    if (token !== undefined) {
      const checkProfileDetails = async () => {
        const emailObj = { email };
        const response = await profileCheckingApi(emailObj);
        console.log(response.status);
        if (response.status === 202) {
          setProfile(true);
        } else if (response.status === 200) {
          setProfile(false);
        }
      };
      checkProfileDetails();
    } else {
      setProfile(false);
    }
  }, []);

  //GET BLOGS API CALL
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
    console.log("getting blogs");
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
            <Typography variant="body2">Name *</Typography>

            <TextField
              required
              fullWidth
              size="small"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />

            <Typography variant="body2">Designation *</Typography>
            <FormControl sx={{ mt: 1 }} fullWidth size="small">
              <Select
                onChange={(e) => setDesignation(e.target.value)}
                value={designation}
              >
                <MenuItem value="Select" disabled>
                  Select
                </MenuItem>

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
            <FormControl sx={{ mt: 1 }} fullWidth size="small">
              <Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value="Select" disabled>
                  Select
                </MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            <Button
              color="primary"
              onClick={handleProfileUpdate}
              startIcon={<SaveIcon />}
              variant="contained"
              fullWidth
              sx={{ mt: 4 }}
            >
              <span>Save</span>
            </Button>
          </Box>
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
