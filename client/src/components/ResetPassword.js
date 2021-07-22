import { TextField, Paper, Typography, Container, makeStyles, Button, Grid } from '@material-ui/core'
import axios from 'axios';
import React, { useState } from 'react'

const useStyle = makeStyles((theme) => ({
    container: {
        maxWidth: '80%',
        marginTop: '10%',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',

    },
    paper: {
        padding: '5%',
    },
    error: {
        backgroundColor: 'red',
        color: 'white',
        textAlign: 'center',
        padding: '5px',
        margin: '10px',
        fontSize: '20px',
    },
    success: {
        backgroundColor: 'green',
        color: 'white',
        textAlign: 'center',
        padding: '5px',
        margin: '10px',
        fontSize: '20px',
    }
}))

const initForm = {
    email: '',
    password: '',
    confirmPassword: '',
}

const ResetPassword = (props) => {
    const classes = useStyle();
    const [formData, setFormData] = useState(initForm);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    console.log(props);

    const submitHandler = async (e) => {
        e.preventDefault();
        // console.log(formData);
        if (formData.password !== formData.confirmPassword) {
            setError("Both Passwords are not Same");
            setFormData(initForm);
            setTimeout(() => {
                setError("");
            }, 3000);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const { data } = await axios.put(
                `http://localhost:5000/api/auth/resetPassword/${props.match.params.tokenid}`,
                { ...formData },
                config
            );
            setSuccess(data.data);
            props.history.push('/auth')
        } catch (error) {
            console.log(error);
            // setError(error.response.data.error);
            setFormData(initForm);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    const changeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }


    return (
        <Container component="main" className={classes.container} maxWidth="xs">
            <Paper elevation={3} className={classes.paper} >
                {error && <div className={classes.error}>{error}</div>}
                {success && <div className={classes.success}>{success}</div>}
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5">
                            Reset Password
                        </Typography>
                        <Typography variant="p" color="textSecondary">
                            To Change Your Password <br />
                            Please enter your registered email address and Password.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <form className={classes.form} onSubmit={submitHandler}>
                            <Grid container spacing={3}>
                                <Grid item xs={8} >
                                    <TextField name="email" type="email" value={formData.email} onChange={changeHandler} label="Registerd Email" fullWidth />
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField name="password" type="password" value={formData.password} onChange={changeHandler} label="New Password" fullWidth />
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField name="confirmPassword" type="password" value={formData.confirmPassword} onChange={changeHandler} label="Confirm New Password" fullWidth />
                                </Grid>
                                <Grid item xs={8}>
                                    <Button type="submit" variant="contained" color="primary" > Change Password </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default ResetPassword;
