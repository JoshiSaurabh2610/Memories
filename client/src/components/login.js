import React, { useContext, useState } from 'react';
import { Avatar, Button, CssBaseline, FormControlLabel, Checkbox, Link, Grid, Typography, makeStyles, Container } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { FaGooglePlusG } from 'react-icons/fa';
import Input from './Input';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 1),
  },
}));

const initForm = {
  email: '',
  password: '',
}

export default function SignIn() {
  const history = useHistory();
  const classes = useStyles();

  const [formData, setFormData] = useState(initForm)
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword((prevState) => !prevState);

  const googleSucess = async (res) => {
    // console.log(res);
    try {
      localStorage.setItem('user',JSON.stringify(res.profileObj));
      localStorage.setItem('token',res.tokenId);
      history.push('/home');
    } catch (error) {
      console.log(error);
    }
  }

  const googleFailure = () => {
    console.log("google Login Failed try again later");
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", { email: formData.email, password: formData.password }, config);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user',JSON.stringify(data.user));
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  // console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} onSubmit={submitHandler}>
          {error && <Typography varient="h3">{error}</Typography>}
          <Input value={formData.email} name="email" onChange={changeHandler} label="Email Address" type="email" />
          <Input value={formData.password} name="password" onChange={changeHandler} label="Password" handleShowPassword={handleShowPassword} type={showPassword ? 'text' : 'password'} />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Login</Button>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={(renderProps) => (
              <Button className={classes.googleLogin} fullWidth variant="contained" color="primary" onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<FaGooglePlusG />}>
                Login with Google</Button>
            )}
            onSuccess={googleSucess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}