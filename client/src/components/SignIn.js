import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, FormControlLabel, Checkbox, Link, Grid, Typography, makeStyles, Container, Box } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { FaGooglePlusG } from 'react-icons/fa';
import { IconContext } from 'react-icons'
import Input from './Input';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
    margin: theme.spacing(2, 0, 0),
  },
}));

export default function SignIn() {

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword((prevState) => !prevState);

  const classes = useStyles();

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
        <form className={classes.form}>
          <Input label="Email Address" name="Email" type="email" />
          <Input label="Password" handleShowPassword={handleShowPassword} type={showPassword ? 'text' : 'password'} name="password" />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Login</Button>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            <IconContext.Provider value={{ size: "2em" }}>
              <FaGooglePlusG />
            </IconContext.Provider>
            Login with Google</Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}