import classes from './Post.module.css';
const Post = function(){
    return(
        <div className={classes.Post}>
            <div className={classes.PostTitle}>
                <p>Post Title</p>
            </div>
            <div className={classes.PostContent}>
                <p>This is Post Content......read more</p>
                <button>Read Full Post</button>
            </div>
            <div className={classes.PostFooter}>
                <p>Poster on: Saturday, June 11, 2022</p>
            </div>
        </div>
    )
}

export default Post;