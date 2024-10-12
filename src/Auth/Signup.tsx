import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Alert,
} from "@mui/material";

import Logo from "../assets/MibLogi.png";

interface SignupFormData {
  email: string;
  username: string;
  password: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Basic form validation
    if (!formData.email || !formData.username || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    // Here you would typically send the signup data to your backend
    try {
      // Simulating an API call
      const response = await simulateApiCall(formData);
      console.log("Signup successful", response);
      // Handle successful signup (e.g., store token, redirect)
    } catch (err) {
      setError("Error during signup. Please try again.");
    }
  };

  // This function simulates an API call
  const simulateApiCall = (
    data: SignupFormData
  ): Promise<{ token: string }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.email && data.username && data.password) {
          resolve({ token: "fake-jwt-token" });
        } else {
          reject(new Error("Invalid data"));
        }
      }, 1000);
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "20%",
        }}
      >
        <Box
          position="absolute"
          zIndex="-500"
          top={-100}
          height="400px"
          width="400px"
          component="img"
          src={Logo}
        />
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
