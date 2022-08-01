import classes from './Header.module.css';
const Header = function(props){
    return(
        <header>
            <div className={classes.headerContentContainer}>
                <div className={classes.logo}>MySpace</div>
                <div className={classes.navlinksContainer}>
                    <div className={classes.navlink}>Sign Up</div>
                    <div className={classes.navlink}>Login</div>
                    <div className={classes.navlink}>My Posts</div>
                    <div className={classes.navlink}>Dashboard</div>
                    <div className={classes.navlink}>Logout</div>
                </div>
            </div>
        </header>
    )
}

export default Header;