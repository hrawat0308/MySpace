import { Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classes from './PostContent.module.css';
import parse from "html-react-parser";
import { useSelector, useDispatch } from 'react-redux';
import DeletePostModal from '../Modal/DeletePostModal';
import { ErrorSliceActions } from '../../store';
import { LoadingSliceActions } from '../../store';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { AllpostsActions } from '../../store';
import ErrorModal from '../Modal/ErrorModal';

const Post = function({AllPostsArray}){

    const dispatch = useDispatch()
    const { postId } = useParams();
    let thisPost = AllPostsArray?.filter((post)=>post._id === postId);
    thisPost = thisPost[0];
    const userId = useSelector((state)=>state.auth.userId);
    const authenticated = useSelector((state)=>state.auth.isLoggedIn);
    const error = useSelector((state)=>state.error.error);
    const errorDel = useSelector((state)=>state.error.errorDel);
    const isLoading = useSelector((state)=>state.loading.loading);
    const AllPosts = useSelector((state)=>state.allposts.AllPostsArray);
    const token = useSelector((state)=>state.auth.token);
    const navigate = useNavigate();

    const postDeleteHandler = async() => {
        dispatch(ErrorSliceActions.setErrorDel({value : null}));
        try{
            dispatch(LoadingSliceActions.setLoading({value : true}));
            const response = await fetch(`http://localhost:5000/${postId}/delete-post`,{
                method : 'DELETE',
                headers : {
                    Authorization : 'Bearer ' + token,
                },
            });
            if(!response.ok){
                throw new Error("Something went wrong!!");
            }

            const newPosts = AllPosts.filter((post)=>{
                return post._id !== postId;
            });
            dispatch(AllpostsActions.setAllPosts({value : newPosts }));
            dispatch(LoadingSliceActions.setLoading({value : false}));
            navigate("/dashboard");
        }
        catch(err){
            dispatch(LoadingSliceActions.setLoading({value : false}));
            dispatch(ErrorSliceActions.setError({value : err.message}));
        }
    }

    const postEditHandler = () => {

    }

    const onPostDelete = () => {
        dispatch(ErrorSliceActions.setErrorDel({value : "CLicked On Delete Button"}));
    }

    const errorHandler = () => {
        dispatch(ErrorSliceActions.setError({value : null}));
    }

    return(
        <Fragment>
            { !!errorDel && <DeletePostModal onClear={errorHandler} onDelete={postDeleteHandler} />}
            { !!error && <ErrorModal error={error} onClear={errorHandler} />}
            <div>
            { isLoading && <LoadingSpinner asOverlay /> }
            <div className={classes.PostHeader}>{thisPost?.title}</div>
            <div className={classes.postDetails}>
                <div>
                    <div className={classes.author}>Author : {thisPost?.author}</div>
                    <div className={classes.postedOn}>Posted on : {thisPost?.postDate}</div>
                </div>
                {authenticated && <div>
                    { userId === thisPost?.user && <button  className={classes.editDelBtn+ " "+classes.edit} onClick={postEditHandler} >
                            Edit Post
                        </button>
                    }
                    { userId === thisPost?.user && <button  className={classes.editDelBtn+ " "+classes.del} onClick={onPostDelete}>
                        Delete Post
                    </button>}
                </div>}
            </div>
            <div className={classes.PostContentContainer}>
                <div className={classes.PostContent}>
                    {parse(thisPost?.content || "")}
                </div>
            </div>
            </div>
        </Fragment>
    )
}

export default Post;

