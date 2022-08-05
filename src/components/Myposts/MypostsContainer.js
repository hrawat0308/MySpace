import Post from '../Posts-Container/Post';
import classes from './MypostsContainer.module.css';

const MypostsContainer = function({ MyPostsArray }){
    
    if(MyPostsArray?.length === 0){
        return(
            <div className={classes.noMyposts}>
                <p>No Posts!!</p>
            </div>   
        ); 
    }
    else{
        return(
            <div className={classes.MypostsContainer}>
                {
                    MyPostsArray.map((post)=>{
                        return(
                            <Post   key={post._id}
                                    id={post._id}
                                    title={post.title}
                                    content={post.content}
                                    postDate={post.postDate}
                                    description = {post.description}
                            />
                        )
                    })
                }
            </div>
        );
    }
    
}

export default MypostsContainer;