import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import contextData from "../helper/Auth";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext, useState } from "react";

import { Alert } from "@mui/material";

const theme = createTheme();

export default  function Login() {
  const [err, setErr] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErr("")

    let response = await contextData.loginUser(email, password);
    if(response.status==200){
      window.location.href="/"
    }else{
      setErr("Invalid Credentials")
      }
  
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" className='h-full' maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#F53838" }}>

          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            {err && <Alert severity="error">{err}</Alert>}

            <TextField
              margin="normal"
              type="email"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              onChange={(e) => { setEmail(e.target.value) }}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              onChange={(e) => { setPassword(e.target.value) }}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              className="bg-blue-500"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
