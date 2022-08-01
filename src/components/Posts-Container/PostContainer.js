import Post from './Post';
import classes from './PostContainer.module.css';
const PostContainer = function(){
    return(
        <div className={classes.PostContainer}>
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    );
}

export default PostContainer;