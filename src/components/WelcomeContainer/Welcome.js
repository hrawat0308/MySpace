import classes from './Welcome.module.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';


const Welcome = function(props){
    const authenticated = useSelector((state)=>state.auth.isLoggedIn);
    const author = useSelector((state)=>state.auth.author);
        return(
            <div className={classes.welcomeContainer}>
                <div className={classes.welcomeTextContainer}>
                    {!authenticated && <Fragment>
                                            <p>Welcome to MySpace</p>
                                            <p>MySpace consists of my posts</p>     
                                        </Fragment>}
                    {authenticated &&   <Fragment>
                                            <p>Hi {author[0].toUpperCase()+author.substring(1)}, Welcome to MySpace</p>
                                            <p>MySpace consists of my posts</p>
                                        </Fragment>}
                </div>
                <hr className={classes.lineBreak}></hr>
                <div className={classes.welcomeInfo}>
                    {!authenticated && <p className={classes.welcomeContent}>Sign Up or Login to use MySpace and you can post your content too</p>}
                    {authenticated && <p className={classes.welcomeContent}>Go to Dashboard to create your Posts</p>}
                    <div className={classes.welcomeBtnContainer}>
                        { !authenticated && <Fragment>
                                                <button><Link to="/signup">Sign Up</Link></button>
                                                <button><Link to="/login">Login</Link></button>
                                            </Fragment>
                        }
                        { authenticated && <button><Link to="/dashboard">Dashboard</Link></button>}
                    </div>
                </div>
            </div>
        )
}

export default Welcome;