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
  };

  const loadName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <>
      <Box width="100%" display="flex" justifyContent="center">
        <Box display="flex" gap={1} flexWrap="wrap">
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
                  <Typography>{name}</Typography>
                  <Box component={Link} to={`/create-form/${name}`}>
                    Create a form
                  </Box>
                </Box>
              );
            })}
          <Button sx={{ textDecoration: "none" }} onClick={handleClickOpen}>
            Create new Event
          </Button>
        </Box>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
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
              onClick={handleClose}
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
