import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
const Post = function(){
    const { postId } = useParams();
    return(
        <Fragment>
        <h1>Post </h1>
        <h2>Post ID : {postId} </h2>
        </Fragment>
    )
}

export default Post;

