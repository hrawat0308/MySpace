import classes from './Post.module.css';
import {Link} from 'react-router-dom';

const Post = function(props){
    const navigateTo = `/post/${props.id}`;
    let desc = props.description.padEnd(150, ' _');
    desc = desc.substring(0,150);
    
    return(
        <div className={classes.Post}>
            <div className={classes.PostTitle}>
                <p>{props.title}</p>
            </div>
            <div className={classes.PostContent}>
                <p>{desc} <span className={classes.readMore}>read more</span></p>
                <button><Link to={navigateTo}>Read Full Post</Link></button>
            </div>
            <div className={classes.PostFooter}>
                <p>Posted on : {props.postDate}</p>
            </div>
        </div>
    )
}

export default Post;