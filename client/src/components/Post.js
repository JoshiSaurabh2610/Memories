import React, { useState } from 'react';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { Share, MoreVert, Delete, ExpandMore, ThumbUpAlt, ThumbUpAltOutlined } from '@material-ui/icons';
import { red } from '@material-ui/core/colors';
import moment from 'moment'
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

// // how postData should look like 
// const postData = {
//     name: 'Techies code',
//     img: 'imge url/base64',
//     title: 'Memory Title',
//     createdAt: '122432(Date)',
//     msg: 'post msg',
//     creatorId: '_mongooseId or googleId',
// }



const Post = ({ postData, editHandler, deletePost, LikePost }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const Likes = () => {
        if (postData.likes && postData.likes.length > 0) {
            return postData.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ? (
                    <><ThumbUpAlt fontSize="small" />&nbsp;{postData.likes.length > 2 ? `You and ${postData.likes.length - 1} others` : `${postData.likes.length} like${postData.likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{postData.likes.length} {postData.likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={<Avatar aria-label="recipe" className={classes.avatar}>
                    {postData?.name?.charAt(0)}
                </Avatar>}
                action={
                    <IconButton aria-label="settings" onClick={editHandler}>
                        {(postData?.creatorId === user?._id || postData?.creatorId === user?.googleId)
                            &&
                                <MoreVert />
                        }
                    </IconButton>
                }
                title={postData?.name}
                subheader={moment(postData.createdAt).fromNow()} />

            <CardMedia
                className={classes.media}
                image={postData?.img} />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {postData?.msg.slice(0, 50) + '...'}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button disabled={!user} onClick={LikePost}>
                    <Likes />
                </Button>
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
                    <ExpandMore />
                </IconButton>
                {(postData?.creatorId === user?._id || postData?.creatorId === user?.googleId)
                    &&
                    <IconButton onClick={deletePost}>
                        <Delete />
                    </IconButton>
                }
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography >{postData?.title}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {postData?.msg}
                    </Typography>
                </CardContent>
            </Collapse>



        </Card >
    );
}

export default Post;