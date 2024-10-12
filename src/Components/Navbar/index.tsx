import { Box, Button, Typography, useTheme } from "@mui/material";
import { Link, NavLink, NavLinkProps } from "react-router-dom";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
import React from "react";

// Define custom styles for NavLink using MUI's `sx` prop
const navLinkStyles: SxProps<Theme> = {
  textDecoration: "none",
  paddingBottom: "0.5rem",
  whiteSpace: "nowrap",
  position: "relative", // Add relative positioning for pseudo-element
  "&.active::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "60%", // Set underline width to 80%
    borderBottom: "3px solid orange", // Underline styling
  },
  "&:not(.active)::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "60%", // Underline width for inactive state (can be set to 0 or none if needed)
    borderBottom: "none", // No underline for inactive state
  },
  width: "60%",
};

const Navbar: React.FC = () => {
  const theme = useTheme();

  return (
    <Box display="flex" justifyContent="space-between" width="90%" p="1rem">
      <Box display="flex" justifyContent="center" width="80%">
        <Typography
          variant="h6"
          color={theme.palette.primary.main}
          fontSize="24px"
          sx={{ fontFamily: "Dela Gothic One, sans-serif !important" }}
        >
          MiB
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        alignItems="center"
      >
        <Box display="flex" gap={2}>
          <Box
            component={NavLink}
            to="/"
            sx={{ ...navLinkStyles, color: theme.palette.primary.main }}
            className={({ isActive }) => (isActive ? "active" : "")}
            color={"primary"}
          >
            Home
          </Box>
          <Box
            component={NavLink}
            to="/manageEvent"
            sx={{ ...navLinkStyles, color: theme.palette.primary.main }}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Manage Event
          </Box>
          <Box
            component={NavLink}
            to="/AboutUs"
            sx={{ ...navLinkStyles, color: theme.palette.primary.main }}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            AboutUs
          </Box>
        </Box>

        <Box display="flex" gap={2}>
          <Button component={Link} to="/login" variant="outlined">
            Login
          </Button>
          <Button variant="contained" component={Link} to="/signup">
            Signup
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
