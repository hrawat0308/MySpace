import classes from './Createpost.module.css';
import TextEditor from "./TextEditor";

const Createpost = function(){
    return(
        <div className={classes.createPostContainer}>
            <div className={classes.inputTitleContainer}>
                <label htmlFor="title">Enter Title</label>
                <input name="title" type="text" className={classes.inputTitle} />
            </div>
            <div className={classes.editor}>
                <TextEditor initialValue={``} />
            </div>
            <button className={classes.submitPostbtn}>Submit</button>
        </div>
    )
}

export default Createpost;