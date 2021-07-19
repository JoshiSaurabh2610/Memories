import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, FormControlLabel, Checkbox, Grid, Typography, makeStyles, Container } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import Input from './Input';
import axios from'axios';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 0),
  },
  divError: {
    backgroundColor: '#f00',
    color: '#fff',
    textAlign: 'center',
    borderRadius: '5px',
    padding: '4px',
    margin: '5px',
  }
}));

const initForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

export default function SignUp() {
  const history = useHistory();
  const [formData, setFormData] = useState(initForm);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const classes = useStyles();

  const handleShowPassword = () => setShowPassword((prevState) => !prevState);

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(formData);

    // Validate the data 
    if (formData.password !== formData.confirmPassword) {
      setError("Password and Confirm Password are not same");
      console.log('error setted');
      formData.password = '';
      formData.confirmPassword = '';
      return;
    }
    // you can add more validation like email ,password validation

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    const reqData = {
      name: formData.firstName + ' ' + formData.lastName,
      email: formData.email,
      password: formData.password,
    }
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/register", reqData, config);
      localStorage.setItem("token", data.token);
      localStorage.setItem('user',JSON.stringify(data.user));
      // context.register(data, data.token);
      history.push("/");
    } catch (err) {
      setError(err);
      setTimeout(() => {
        setError("");
      }, 5000);
    }

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircle />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={submitHandler}>
          {error && <div className={classes.divError}>{error}</div>}
          <Grid container spacing={2}>
            <Input name="firstName" value={formData.firstName} onChange={changeHandler} label="First Name" type="text" half />
            <Input name="lastName" value={formData.lastName} onChange={changeHandler} label="Last Name" type="text" half />
            <Input name="email" value={formData.email} onChange={changeHandler} label="Email Address" type="email" />
            <Input name="password" value={formData.password} onChange={changeHandler} label="Password" handleShowPassword={handleShowPassword} type={showPassword ? 'text' : 'password'} />
            <Input name="confirmPassword" value={formData.confirmPassword} onChange={changeHandler} label="Confirm Password" type="password" />
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
}