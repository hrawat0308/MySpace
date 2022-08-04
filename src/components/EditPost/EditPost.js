import classes from './EditPost.module.css';
import { Fragment, useRef, useState } from 'react'; 
import ErrorModal from '../Modal/ErrorModal';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import TextEditor from '../CreatePost/TextEditor';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorSliceActions, LoadingSliceActions, AllpostsActions, TextEditorActions } from '../../store';
import { useParams, useNavigate } from 'react-router-dom';

const EditPost = function({data}){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { postId } = useParams();
    const error = useSelector((state)=>state.error.error);
    const isLoading = useSelector((state)=>state.loading.loading);
    // const titleInputRef = useRef();
    // const descriptionInputRef = useRef();
    const UserId = useSelector((state)=>state.auth.userId);
    const author = useSelector((state)=>state.auth.author);
    const textValue = useSelector((state)=>state.textEditor.textValue);
    const token = useSelector((state)=>state.auth.token);
    const [titleInput, setTitleInput] = useState(data.title);
    const [descriptionInput, setDescriptionInput] = useState(data.description);

    const onUpdatePostHandler = async(event) => {
        event.preventDefault();
        try{
            if(!titleInput || !descriptionInput){
                throw new Error("Please Enter Title and Description for this Post!!");
            }
            else{
                const post = {
                    title : titleInput,
                    content : textValue,
                    description : descriptionInput,
                    postDate : new Date().toDateString(),
                    user : UserId,
                    author : author,
                }
                try{
                    dispatch(LoadingSliceActions.setLoading({value : true}));
                    const response = await fetch(`http://localhost:5000/${postId}/edit-post`,{
                        method : 'PATCH',
                        headers : {
                            'Content-Type': 'application/json',
                            Authorization : 'Bearer ' + token,
                        },
                        body : JSON.stringify({
                            title : post.title,
                            content : post.content,
                            description : post.description,
                            postDate : post.postDate,
                            // user : post.user,
                            // author : post.author,
                        })
                    });
                    const responseData = await response.json();
                    if(!response.ok){
                        throw new Error(responseData.message);
                    }
                    post._id = postId;
                    dispatch(AllpostsActions.updatePost({value : post }));
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

    const onTitleChange = (event) => {
        setTitleInput(event.target.value);
    }

    const onDescriptionChange = (event) => { 
        setDescriptionInput(event.target.value);
    }

    return(
        <Fragment>
        { !!error && <ErrorModal error={error} onClear={errorHandler} />}
        <div className={classes.createPostContainer}>
            { isLoading && <LoadingSpinner asOverlay /> }
            <div className={classes.inputTitleContainer}>
                <label htmlFor="title">Update Title</label>
                <input name="title" type="text" className={classes.inputTitle}  value={titleInput} onChange={onTitleChange} />
                <label htmlFor="description">Update Description</label>
                <input name="description" type="text" className={classes.inputTitle} value={descriptionInput} onChange={onDescriptionChange} />
            </div>
            <div className={classes.editor}>
                <TextEditor initialValue={data.content} />
            </div>
            <button className={classes.updatePostbtn} onClick={onUpdatePostHandler}> 
                Update
            </button>
        </div>
        </Fragment>
    );
}

export default EditPost;