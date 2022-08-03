import Post from './Post';
import classes from './PostContainer.module.css';
import ErrorModal from '../Modal/ErrorModal';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { Fragment } from 'react';
import { ErrorSliceActions } from '../../store';
import { useDispatch } from 'react-redux';

const PostContainer = function({ AllPostsArray, error, isLoading }){
    const dispatch = useDispatch();
    const errorHandler = () => {
        dispatch(ErrorSliceActions.setError({value : null}));
    }
    if(AllPostsArray?.length === 0 ){
        return(
            <Fragment>
            { !!error && <ErrorModal error={error} onClear={errorHandler} />}
            <div className={classes.noPosts}>
            { isLoading && <LoadingSpinner asOverlay /> }
                <p>No Posts!!</p>
            </div>
            </Fragment>   
        );
    }
    else{
        return(
            <Fragment>
            { !!error && <ErrorModal error={error} onClear={errorHandler} />}
            <div className={classes.PostContainer}>
            { isLoading && <LoadingSpinner asOverlay /> }
                {
                    AllPostsArray.map((post)=>{
                        return(
                            <Post   key={post._id}
                                    id={post._id}
                                    title={post.title}
                                    content={post.content}
                                    postDate={post.postDate}
                                    description={post.description}
                            />
                        )
                    })
                }
            </div>
            </Fragment>
        );
    }
    
}

export default PostContainer;