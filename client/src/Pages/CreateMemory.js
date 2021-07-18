import { Avatar, Button, Checkbox, Container, FormControlLabel, Grid, Input, makeStyles, TextareaAutosize, TextField, Typography } from '@material-ui/core'
import { Create } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const CreateMemory = () => {

    const classes = useStyles();

    return (
        <Container component="main">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <Create />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Create Memories
                </Typography>
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="title"
                                variant="outlined"
                                required
                                fullWidth
                                id="title"
                                label="Give a Title"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                multiline
                                label="About your Memory"
                                name="msg"
                            />

                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="tags"
                                label="Tags"
                                type="text"
                                id="tags"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="file"
                                name="img"
                                label="Image"
                                variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="space-around">
                        <Grid item xs={10} md={5}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Create
                            </Button>
                        </Grid>
                        <Grid item xs={10} md={5}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Cancel
                            </Button>
                        </Grid>

                    </Grid>


                </form>
            </div>
        </Container>
    )
}

export default CreateMemory
