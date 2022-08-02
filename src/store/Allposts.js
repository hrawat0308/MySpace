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
        }
    }

});


export default AllpostsSlice;