import classes from './Dashboard.module.css';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux/es/exports';
const Dashboard = function(){
    const author = useSelector((state)=>state.auth.author);
    return(
        <div className={classes.welcomeContainer}>
            <div className={classes.welcomeTextContainer}>
                <p>Hello, {author[0].toUpperCase()+author.substring(1)}</p>
                <p>Start Posting your content in MySpace</p>
            </div>
            <hr className={classes.lineBreak}></hr>
            <div className={classes.welcomeInfo}>
                <div className={classes.welcomeBtnContainer}>
                    <button><Link to="/createPost">Create Post</Link></button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;