import classes from './Dashboard.module.css';
const Dashboard = function(){
    return(
        <div className={classes.welcomeContainer}>
            <div className={classes.welcomeTextContainer}>
                <p>Hello, Himanshu Rawat</p>
                <p>Start Posting your content in MySpace</p>
            </div>
            <hr className={classes.lineBreak}></hr>
            <div className={classes.welcomeInfo}>
                <div className={classes.welcomeBtnContainer}>
                    <button>Create Post</button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;