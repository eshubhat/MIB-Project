import { useState } from "react";
import { Box, Button } from "@mui/material";

function Landing() {
  return (
    <>
      <Box width="100%" display="flex" justifyContent="center">
        <Button sx={{ textDecoration: "none" }} component="a" href="/">
          Create new Form
        </Button>
      </Box>
    </>
  );
}

export default Landing;
