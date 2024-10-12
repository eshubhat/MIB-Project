import { useState, useContext } from "react";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Navbar from "./Components/Navbar";
import Landing from "./Pages/Landing";
import Form from "./Pages/Form";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f95f2c",
      dark: "",
    },
    background: {
      default: "#e4f0e2",
    },
  },
});

function NavbarWrapper() {
  const location = useLocation();
  const hideNavbarPaths = ["/login", "/signup"];

  return !hideNavbarPaths.includes(location.pathname) ? <Navbar /> : null;
}

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Box>
            <NavbarWrapper />
            <Routes>
              <Route path="/manageEvent" element={<Landing />} />
              <Route path="/create-form/:name" element={<Form />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
