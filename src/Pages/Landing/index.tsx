import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";

import Logo from "../../assets/MibLogi.png";

import SampleImage from "../../assets/SampleImage.webp";

function Landing() {
  const fullScreen = useMediaQuery("(max-width:540px)");
  const theme = useTheme();

  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [eventNames, setEventNames] = useState<string[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEventNames((prev: string[]) => [...prev, name]);
    setName(""); // Reset the name field
  };

  const handleCloseForCancel = () => {
    setOpen(false);
  };

  const loadName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Box position="absolute" component={"img"} src={Logo} zIndex="-500" />
        <Box display="flex" width="100%" gap={1} justifyContent="flex-end">
          <Button
            sx={{ textDecoration: "none", marginRight: "5rem" }}
            onClick={handleClickOpen}
          >
            Create new Event
          </Button>
        </Box>
        <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center">
          {eventNames.length > 0 &&
            eventNames.map((name, index) => {
              return (
                <Box
                  key={index}
                  display="flex"
                  bgcolor={theme.palette.background.default}
                  color={theme.palette.primary.main}
                  p="1rem"
                  flexDirection="column"
                >
                  <Box
                    component="img"
                    src={SampleImage}
                    alt={`event ${name}`}
                    title={`event ${name}`}
                    height="250px"
                    width="250px"
                  />
                  <Typography sx={{ padding: "1rem" }}>Event-{name}</Typography>
                  <Button
                    sx={{ width: "50%", alignSelf: "flex-end" }}
                    component={Link}
                    to={`/create-form/${name}`}
                  >
                    Create form
                  </Button>
                </Box>
              );
            })}
        </Box>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleCloseForCancel}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Create an Event"}
          </DialogTitle>
          <DialogContent sx={{ padding: "1rem", marginTop: "1rem" }}>
            <TextField
              id="outlined-multiline-flexible"
              label="Name"
              onChange={loadName}
              multiline
              maxRows={4}
            />
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              variant="text"
              sx={{ color: "#f95f2c" }}
              onClick={handleCloseForCancel}
            >
              Cancel
            </Button>
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{ backgroundColor: "#f95f2c" }}
              autoFocus
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default Landing;
