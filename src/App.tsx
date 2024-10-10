import { useState } from "react";
import { Box, Button } from "@mui/material";
import Landing from "./Pages/Landing";
import "./App.css";

function App() {
  return (
    <>
      <Box width="100%" display="flex" justifyContent="center">
        <Landing />
      </Box>
    </>
  );
}

export default App;
