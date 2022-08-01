import classes from './Header.module.css';
import { useSelector } from 'react-redux/es/exports';
import { NavLink, Link } from 'react-router-dom';
import { Fragment } from 'react';

const Header = function(props){
    const authenticated = useSelector((state)=>state.auth.isLoggedIn);
    return(
        <header>
            <div className={classes.headerContentContainer}>
                <div className={classes.logo}>
                    <Link to="/">MySpace</Link>
                </div>
                <div className={classes.navlinksContainer}>
                    {!authenticated &&  
                        <Fragment>
                            <div className={classes.navlink}>
                                <NavLink to="/signup" className={({ isActive }) => isActive ? classes.linkIsActive : "" }>Sign Up</NavLink>
                            </div>
                            <div className={classes.navlink}>
                                <NavLink to="/login" className={({ isActive }) => isActive ? classes.linkIsActive : "" }>Login</NavLink>
                            </div>
                        </Fragment>
                    }
        
                    {authenticated && 
                        <Fragment>
                            <div className={classes.navlink}>
                                <NavLink to="/myposts" className={({ isActive }) => isActive ? classes.linkIsActive : "" }>My Posts</NavLink>
                            </div>
                            <div className={classes.navlink}>
                                <NavLink to="/dashboard" className={({ isActive }) => isActive ? classes.linkIsActive : "" }>Dashboard</NavLink>
                            </div>
                            <div className={classes.navlink}>Logout</div>
                        </Fragment>
                    }
                   
                </div>
            </div>
        </header>
    )
}

export default Header;