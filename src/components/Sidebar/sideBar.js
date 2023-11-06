import { Box, Typography, Chip, Divider, Fab, Tooltip } from "@mui/material";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PsychologyIcon from "@mui/icons-material/Psychology";
import PaletteIcon from "@mui/icons-material/Palette";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
import WomanIcon from "@mui/icons-material/Woman";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate } from "react-router-dom";

const SideBar = ({ category, setCategory }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "max-content",
        maxWidth: "12%",
        paddingLeft: 1,
        boxSizing: "border-box",
        display: { xs: "none", md: "flex", flexDirection: "column" },
      }}
    >
      <Typography variant="body1" gutterBottom fontWeight={600} marginTop={2}>
        Categories
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          marginBottom: 1,
        }}
      >
        <Chip
          size="small"
          icon={<AllInclusiveIcon />}
          label="All"
          variant={category === "All" ? "filled" : "outlined"}
          onClick={(e) => setCategory(e.target.innerText)}
        />
        <Chip
          size="small"
          icon={<FitnessCenterIcon />}
          label="Fitness"
          variant={category === "Fitness" ? "filled" : "outlined"}
          onClick={(e) => setCategory(e.target.innerText)}
        />
        <Chip
          size="small"
          icon={<PsychologyIcon />}
          label="Technology"
          variant={category === "Technology" ? "filled" : "outlined"}
          onClick={(e) => setCategory(e.target.innerText)}
        />
        <Chip
          size="small"
          icon={<PaletteIcon />}
          label="Arts"
          variant={category === "Arts" ? "filled" : "outlined"}
          onClick={(e) => setCategory(e.target.innerText)}
        />
        <Chip
          size="small"
          icon={<SportsEsportsIcon />}
          label="Gaming"
          variant={category === "Gaming" ? "filled" : "outlined"}
          onClick={(e) => setCategory(e.target.innerText)}
        />
        <Chip
          size="small"
          icon={<SportsBaseballIcon />}
          label="Sports"
          variant={category === "Sports" ? "filled" : "outlined"}
          onClick={(e) => setCategory(e.target.innerText)}
        />
        <Chip
          size="small"
          icon={<WomanIcon />}
          label="Fashion"
          variant={category === "Fashion" ? "filled" : "outlined"}
          onClick={(e) => setCategory(e.target.innerText)}
        />
        <Chip
          size="small"
          icon={<FastfoodIcon />}
          label="Food & Health"
          variant={category === "Food & Health" ? "filled" : "outlined"}
          onClick={(e) => setCategory(e.target.innerText)}
        />
      </Box>
      <Divider orientation="horizontal" flexItem />

      <Tooltip
        title="Create new blog "
        arrow
        placement="left"
        sx={{ marginTop: 1, position: "sticky", top: 80 }}
      >
        <Fab
          variant="extended"
          color="error"
          size="small"
          onClick={() => navigate("/createblog")}
        >
          <CreateIcon sx={{ mr: 1 }} />
          Create
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default SideBar;
