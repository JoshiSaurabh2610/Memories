import { Container, Grid, Typography } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import Card from '../components/Card';
import PostsContext from '../Global State/Posts/PostsContext';
import CreateMemory from './CreateMemory';

const Home = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const context = useContext(PostsContext);
    return (
        <div>
            <Typography variant="h2" align="center">Memories</Typography>
            <Typography varient="h6" align="center" color="textSecondary" style={{marginBottom:'30px'}}>Here are some Memories which i remember ever</Typography>

            <Grid container>
                <Grid item sm={6} md={9}>
                    <Container>
                        <Grid container justifyContent="center" spacing={3}>
                            {context.posts ?
                                context.posts.map((post) => {
                                    <Grid item md={6}>
                                        <Card post />
                                    </Grid>
                                }) : <Typography>No Posts Created</Typography>}
                        </Grid>
                    </Container>
                </Grid>
                <Grid item sm={6} md={3}>
                    {
                        user ? <CreateMemory /> : <Typography>Login to Create and save your memories. It's Free</Typography>
                    }
                </Grid>
            </Grid>

        </div>
    )
}

export default Home
