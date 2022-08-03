import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name : "auth",
    initialState : { isLoggedIn : false, userId : null, token : null, author : null },
    reducers : {
        login(state, action){
            state.userId = action.payload.userId;
            state.token = action.payload.token;
            state.author = action.payload.author;
            state.isLoggedIn = true;
        },
        logout(state, action){
            state.isLoggedIn = false;
            state.token = null;
            state.userId = null;
            state.author = null;
        }
    }
});

export default AuthSlice;