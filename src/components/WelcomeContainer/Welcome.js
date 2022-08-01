import classes from './Welcome.module.css';
const Welcome = function(props){
    return(
        <div className={classes.welcomeContainer}>
            <div className={classes.welcomeTextContainer}>
                <p>Welcome to MySpace</p>
                <p>MySpace consists of my posts</p>
            </div>
            <hr className={classes.lineBreak}></hr>
            <div className={classes.welcomeInfo}>
                <p className={classes.welcomeContent}>Sign Up or Login to use MySpace and you can post your content too</p>
                <div className={classes.welcomeBtnContainer}>
                    <button>Sign Up</button>
                    <button>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Welcome;