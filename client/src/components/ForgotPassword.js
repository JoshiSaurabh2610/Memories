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
    error:{
        backgroundColor:'red',
        color:'white',
        textAlign:'center',
        padding:'5px',
        margin:'10px',
        fontSize:'20px',
    },
    success:{
        backgroundColor:'green',
        color:'white',
        textAlign:'center',
        padding:'5px',
        margin:'10px',
        fontSize:'20px',
    }
}))

const ForgotPassword = () => {
    const classes = useStyle();
    const [email, setEmail] = useState('');
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    
    const submitHandler = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const { data } = await axios.post(
                "http://localhost:5000/api/auth/forgotPassword",
                { email },
                config
            );
            setSuccess(data.data);
            setTimeout(() => {
                setEmail("");
            }, 3000);
        } catch (error) {
            setError(error.response.data.msg);
            setEmail("");
            setError(error.response.data.msg);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };


return (
    <Container component="main" className={classes.container} maxWidth="xs">
        <Paper elevation={3} className={classes.paper} >
            {error && <div className={classes.error}>{error}</div>}
            {success && <div className={classes.success}>{success}</div>}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                        Forgot Password
                    </Typography>
                    <Typography variant="p" color="textSecondary">
                        Lost your password? <br />
                        Please enter your registered email address. You will receive a link to create a new password via email.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <form className={classes.form} onSubmit={submitHandler}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField type="email" value={email} onChange={(e) => setEmail(e.target.value)} label="Registerd Email" fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" > Submit </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Paper>
    </Container>
)
}

export default ForgotPassword;
