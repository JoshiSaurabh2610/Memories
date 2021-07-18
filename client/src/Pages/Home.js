import { Container, Grid, Typography } from '@material-ui/core'
import React from 'react'
import Card from '../components/Card';
import CreateMemory from './CreateMemory';

const Home = () => {
    return (
        <div>
            <Typography variant="h2" align="center">My Memories</Typography>
            <Typography varient="h6" align="center" color="textSecondary">Here are some Memories which i remember ever</Typography>
            
            <Grid container>
                <Grid item sm={6} md ={9}>
                    <Container>
                        <Grid container>
                            <Grid item md={6}>
                                <Card />
                            </Grid>
                            <Grid item md={6}>
                                <Card />
                            </Grid>
                            <Grid item>
                                <Card />
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
                <Grid item sm={6} md ={3}>
                    <CreateMemory/>
                </Grid>
            </Grid>

        </div>
    )
}

export default Home
