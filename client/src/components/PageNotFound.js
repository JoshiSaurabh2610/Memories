import React from 'react'
import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import image404 from '../image/404PageNotFound.jpg';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    image404: {
        width: '80%',
        heigth: 'auto'
    }

}))

const PageNotFound = (props) => {
    const classes = useStyles();
    return (
        <Grid container justifyContent="center" spacing={3}>
            <Grid item>
                <Typography variant="h4">404 Page Not Found</Typography>
            </Grid>
            <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                <img className={classes.image404} alt="404 Page Not Found" src={image404}></img>
            </Grid>
            <Grid item>
                <Button variant="contained" color="primary" onClick={() => props.history.push('/')}>
                    Go To Home
                </Button>
            </Grid>
        </Grid>
    )
}

export default PageNotFound
