import classes from './Header.module.css';
import { useSelector } from 'react-redux/es/exports';
import { Link } from 'react-router-dom';

const Header = function(props){
    const authenticated = useSelector((state)=>state.auth.isLoggedIn);
    return(
        <header>
            <div className={classes.headerContentContainer}>
                <div className={classes.logo}>
                    <Link to="/">MySpace</Link>
                </div>
                <div className={classes.navlinksContainer}>
                    {!authenticated &&  <div className={classes.navlink}><Link to="/signup">Sign Up</Link></div>}
                    {!authenticated &&  <div className={classes.navlink}><Link to="/login">Login</Link></div>}
                    {authenticated && <div className={classes.navlink}><Link to="/myposts">My Posts</Link></div>}
                    {authenticated && <div className={classes.navlink}><Link to="/dashboard">Dashboard</Link></div>}
                    {authenticated && <div className={classes.navlink}>Logout</div>} 
                </div>
            </div>
        </header>
    )
}

export default Header;