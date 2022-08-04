import { createSlice } from "@reduxjs/toolkit";

const AllpostsSlice = createSlice({
    name : "allposts",
    initialState : { AllPostsArray : [] },
    reducers : {
        setAllPosts(state,action){
            state.AllPostsArray = [...action.payload.value];
        },
        addPost(state,action){
            state.AllPostsArray = [...state.AllPostsArray, action.payload.value]
        },
        updatePost(state, action){
            const updatedPost = state.AllPostsArray.map((post)=>{
                if(post._id === action.payload.value._id){
                    post.title = action.payload.value.title;
                    post.description = action.payload.value.description;
                    post.content = action.payload.value.content;
                    post.postDate = action.payload.value.postDate;
                }
                return post;
            });

            state.AllPostsArray = [...updatedPost];
        }
    }

});


export default AllpostsSlice;