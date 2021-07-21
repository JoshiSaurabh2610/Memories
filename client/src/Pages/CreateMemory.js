import { Avatar, Button, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import { Create } from '@material-ui/icons';
import { useContext, useEffect, useState } from 'react';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import Input from '../components/Input';
import PostsContext from '../context/PostsContext';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height:'100%'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(1, 0, 0),
    },
}));

{/*
const expectedPost = {
        name: 'Techies code',
        img: 'imge url/base64',
        title: 'Memory Title',
        msg: 'post msg',
        createdAt: '122432(Date)',
        creatorId: '_mongooseId or googleId',
    }
*/
}

const CreateMemory = () => {
    const initPost = {
        img: '',
        title: '',
        msg: '',
        tags: '',
    }
    const context = useContext(PostsContext);
    const classes = useStyles();
    const history = useHistory();
    const [postData, setPostData] = useState(initPost)
    const [error, setError] = useState('');

    useEffect(() => {
        if (context.selectedPost)
            setPostData(context.selectedPost);
        else setPostData(initPost);
    }, [context.selectedPost])

    const submitHandler = (e) => {
        e.preventDefault();
        if (context.selectedPost)
            context.editPost(postData);
        else
            context.addPost(postData);
        history.push('/');
    }

    const onChangeHandler = (e) => {
        setPostData({
            ...postData,
            [e.target.name]: e.target.value
        });
    }

    const ClearHandler = (e) => {
        setPostData(initPost);
        context.clearSelectedPost();
    }

    return (
        <Paper style={{marginRight:'24px'}} elevation={3} justifyContent="center">
            <Container component="main">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <Create />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Create Memories
                    </Typography>
                    <form className={classes.form} onSubmit={submitHandler}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Input value={postData.title} onChange={onChangeHandler} name="title" label="Give a Title" type="text" />
                            </Grid>
                            <Grid item xs={12}>
                                <Input value={postData.msg} onChange={onChangeHandler} name="msg" label="About your Memory" multiline />
                            </Grid>
                            <Grid item xs={12}>
                                <Input value={postData.tags} onChange={onChangeHandler} name="tags" label="Tags" type="text" />
                            </Grid>
                            <Grid item xs={12}>
                                <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, img: base64 })} />
                            </Grid>
                        </Grid>
                        <Grid style={{ margin: '24px 0px' }} container alignContent="center" justifyContent="space-around">
                            <Grid item xs={10} md={5}>
                                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                                    {context.selectedPost ? 'Edit' : 'Create'}
                                </Button>
                            </Grid>
                            <Grid item xs={10} md={5} >
                                <Button type="button" onClick={ClearHandler} fullWidth variant="contained" color="primary" className={classes.submit}>
                                    {context.selectedPost ? 'Cancel' : 'Clear'}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </Paper>
    )
}

export default CreateMemory
