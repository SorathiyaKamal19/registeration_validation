import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Input } from "@mui/material";
import { useState } from "react";
import { Validate } from "../components/Validations";
import {  IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";


const Register = () => {
    const [userInput,setUserInput]=useState({
        firstName: "",
        lastName:"",
        email: "",
        phone:"",
        password: "",
        dob:null,
        file: null,
    })
    const [errors,setErrors]=useState({})
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
      };
    


  const defaultTheme = createTheme();

  const onhandleChange = () =>{
    const { name, value, files } = event.target;
    const newValue = files ? files[0] : value;
    // console.log(`${name}:`, newValue);

    setUserInput((prevInput) => ({
      ...prevInput,
      [name]: newValue,
    }));
    setErrors(" ")

  }
  const handleDateChange = (date) => {
    setUserInput((prevInput) => ({
      ...prevInput,
      dob: date,
    }));
  };


  const handleSubmit = (event) => {
    event.preventDefault(event);
    const newErrors = Validate(userInput);
    if (Object.keys(newErrors).length === 0) {
      console.log(userInput);
    } else {
      setErrors(newErrors);

    }

  };
  return (
    <ThemeProvider theme={defaultTheme}>
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registration
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  value={userInput.firstName}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={onhandleChange}
                  autoFocus
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  value={userInput.lastName}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  onChange={onhandleChange}
                  autoComplete="family-name"
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={userInput.email}
                  id="email"
                  label="Email Address"
                  onChange={onhandleChange}
                  name="email"
                  autoComplete="email"
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={userInput.phone}
                  id="phone"
                  label="Phone Number"
                  onChange={onhandleChange}
                  name="phone"
                  autoComplete="Phone Number"
                  error={!!errors.phone}
                  helperText={errors.phone}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                  sx={{width:"100%"}}
                    label="Date of Birth"
                    value={userInput.dob}
                    onChange={handleDateChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        required
                      />
                    )}
                  />
                  {
                    errors.dob && <Typography variant="body2" color="error">{errors.dob}</Typography>
                  }
                </LocalizationProvider>
              </Grid>


              <Grid item xs={12} sm={6}>
                 
                  <Input type="file" name="file" id="file"  onChange={onhandleChange}/>
                  {
                    errors.file &&(
                        <Typography variant="body2" color="error">
                            {errors.file}
                            </Typography>
                    )
                  }
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  value={userInput.password}
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  onChange={onhandleChange}
                  autoComplete="new-password"
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
 
                  
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
