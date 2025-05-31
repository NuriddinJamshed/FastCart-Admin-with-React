import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import logo from "../../shared/imgs/Group 1116606595.png";
import { Button, FormControl, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../entitis/reducers/postQuery';
import { Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const isLoading = useSelector((store) => store.post.isLoading);
  const isLogined = useSelector((store) => store.post.isLogined);
  const isError = useSelector((store) => store.post.isError);
  const errorMessage = useSelector((store) => store.post.errorMessage);

  const [loadingSnackbarOpen, setLoadingSnackbarOpen] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  function sendData() {
    const obj = {
      userName: user,
      password: password
    };
    dispatch(login(obj));
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (isLoading) {
      setLoadingSnackbarOpen(true);
    } else {
      setLoadingSnackbarOpen(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isLogined) {
      setSuccessSnackbarOpen(true);
      setPassword("")
      setUser("")
        navigate("/home")
    }
  }, [isLogined]);

  useEffect(() => {
    if (isError) {
      setErrorSnackbarOpen(true);
    }
  }, [isError]);

  return (
    <div className='w-[100%] items-center flex flex-row justify-between'>
      <div className='w-[55%] hidden p-[100px] md:flex flex-col justify-center text-[#fff] bg-[#1B2D3C] h-[100vh]'>
        <p className='text-[24px] font-[500]'>Welcome to admin panel</p>
        <img className='w-[60%]' src={logo} alt="" />
      </div>

      <div className='md:w-[45%] w-[100%] flex justify-center items-center h-[100vh]'>
        <div className='flex flex-col w-[80%] md:w-[50%] gap-y-[20px]'>
          <p className='text-[24px] font-[700]'>Log in</p>

          <TextField
            onChange={(e) => setUser(e.target.value)}
            id="outlined-basic"
            type='text'
            label="Admin Name"
            variant="outlined"
          />

          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              onChange={(e) => setPassword(e.target.value)}
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? 'hide password' : 'show password'}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <p className='text-[#2563EB] text-center font-[500] text-[16px]'>
            Forgot password?
          </p>

          <Button onClick={sendData} sx={{ padding: "10px 0" }} variant='contained'>
            Log in
          </Button>
        </div>
      </div>

      <Snackbar
        open={loadingSnackbarOpen}
        autoHideDuration={2000}
        onClose={() => setLoadingSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="info" sx={{ width: '100%' }}>
          Logging in...
        </Alert>
      </Snackbar>

      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSuccessSnackbarOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Login successful!
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={4000} 
        onClose={() => setErrorSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setErrorSnackbarOpen(false)}
          severity="error"
          sx={{ width: '100%' }}
        >
          Login failed: {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
