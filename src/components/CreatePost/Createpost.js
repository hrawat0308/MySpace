import { Fragment, useRef } from 'react';
import classes from './Createpost.module.css';
import TextEditor from "./TextEditor";
import { useSelector, useDispatch } from 'react-redux';
import { AllpostsActions, TextEditorActions } from '../../store';
import { useNavigate } from 'react-router-dom';
import { LoadingSliceActions } from '../../store';
import ErrorModal from '../Modal/ErrorModal';
import { ErrorSliceActions } from '../../store';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Createpost = function(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const titleInputRef = useRef();
    const descriptionInputRef = useRef();
    const textValue = useSelector((state)=>state.textEditor.textValue);
    const error = useSelector((state)=>state.error.error);
    const isLoading = useSelector((state)=>state.loading.loading);
    // const AllPostsArray = useSelector((state)=>state.allposts.AllPostsArray);

    const onSubmitPostHandler = async(event)=>{
        event.preventDefault();
        try{
            if(!titleInputRef.current.value || !descriptionInputRef.current.value ){
                throw new Error("Please Enter Title and Description for this Post!!");
            }
            else{
                const post = {
                    id : Math.random()*10,
                    title : titleInputRef.current.value,
                    content : textValue,
                    description : descriptionInputRef.current.value,
                    postDate : new Date().toDateString(),
                }
    
                try{
                    dispatch(LoadingSliceActions.setLoading({value : true}));
                    const response = await fetch(`https://fir-c26bc-default-rtdb.firebaseio.com/posts.json`,{
                        method : 'POST',
                        headers : {
                            'Content-Type': 'application/json',
                        },
                        body : JSON.stringify(post)
                    });
                    const responseData = await response.json();
                    if(!response.ok){
                        throw new Error(responseData.message);
                    }
                    console.log(post)
                    dispatch(AllpostsActions.addPost({value : post }));
                    dispatch(LoadingSliceActions.setLoading({value : false}));
                    dispatch(TextEditorActions.setTextValue({ value : "" }));
                    navigate("/dashboard");
                }
                catch(err){ 
                    dispatch(LoadingSliceActions.setLoading({value : false}));
                    dispatch(ErrorSliceActions.setError({value : err.message}));
                }
            }
        }
        catch(err){
            dispatch(LoadingSliceActions.setLoading({value : false}));
            dispatch(ErrorSliceActions.setError({value : err.message}));
        }
        
    }

    const errorHandler = () => {
        dispatch(ErrorSliceActions.setError({value : null}));
    }

    return(
        <Fragment>
        { !!error && <ErrorModal error={error} onClear={errorHandler} />}
        <div className={classes.createPostContainer}>
            { isLoading && <LoadingSpinner asOverlay /> }
            <div className={classes.inputTitleContainer}>
                <label htmlFor="title">Enter Title</label>
                <input name="title" type="text" className={classes.inputTitle} ref={titleInputRef} />
                <label htmlFor="description">Description</label>
                <input name="description" type="text" className={classes.inputTitle} ref={descriptionInputRef} />
            </div>
            <div className={classes.editor}>
                <TextEditor initialValue={``} />
            </div>
            <button className={classes.submitPostbtn} onClick={onSubmitPostHandler}> 
                Submit
            </button>
        </div>
        </Fragment>
    )
}

export default Createpost;