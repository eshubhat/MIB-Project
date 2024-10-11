import { useState, useContext } from "react";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Landing from "./Pages/Landing";
import Form from "./Pages/Form";
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

function App() {
  return (
    <>
      <Box width="100%" display="flex" justifyContent="center">
        <RecoilRoot>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/create-form/:name" element={<Form />} />
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </RecoilRoot>
      </Box>
    </>
  );
}

export default App;
