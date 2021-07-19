import React, { useState } from 'react';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { Favorite, Share, MoreVert, Delete } from '@material-ui/icons';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 345,
        marginBottom: 24,
        marginRight: 0,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '15px',
        height: '100%',
        position: 'relative',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    overlay: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
    },
}));

export default function RecipeReviewCard({postData}) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const user = localStorage.getItem('user');
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                image="/hello"
            />
            <div className={classes.overlay}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVert />
                        </IconButton>
                    }
                    title={postData?.title}
                    subheader={postData?.createdAt}
                />
            </div>

            <CardContent>
                <Typography >{postData?.title}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {postData?.msg}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <Favorite />
                </IconButton>
                <IconButton aria-label="share">
                    <Share />
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                { (postData?.creatorId === user?._id || postData?.creatorId === user?.googleId ) && <Delete />}
                </IconButton>
            </CardActions>
        </Card>
    );
}
