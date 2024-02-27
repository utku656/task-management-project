import React, { useState } from "react";
import {
  Container,
  CssBaseline,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { User } from "../../utils/types";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch("http://localhost:3030/users")
      .then((res) => {
        if (!res.ok) {
          throw Error("Error fetching users data");
        }
        return res.json();
      })
      .then((data) => {
        const element = data.filter(
          (element: User) =>
            element.username === username && element.password === password
        );
        if (element.length > 0) {
          login({
            username: element[0].username,
            id: element[0].id,
            name: element[0].name,
          });
        } else {
          alert("Username or password incorrect");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ color: "#45CAA5" }}>
          Spotzer Digitale
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            placeholder="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            placeholder="password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "#45CAA5",
              "&:hover": { bgcolor: "#3a9f80" },
            }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;
