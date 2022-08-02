import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import classes from './PostContent.module.css';
import parse from "html-react-parser";


const Post = function({AllPostsArray}){
    const { postId } = useParams();
    let thisPost = AllPostsArray.filter((post)=>post.id.toString() === postId);

    thisPost = thisPost[0];

    return(
        <Fragment>
            <div className={classes.PostHeader}>{thisPost.title}</div>
            <div className={classes.postDetails}>
                <div>Author </div>
                <div>Posted on : {thisPost.postDate}</div>
            </div>
            <div className={classes.PostContentContainer}>
                <div className={classes.PostContent}>
                    {parse(thisPost.content)}
                </div>
            </div>
        </Fragment>
    )
}

export default Post;

