import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name : "auth",
    initialState : { isLoggedIn : false, userId : null, token : null },
    reducers : {
        login(state, action){

        },
        logout(state, action){

        }
    }
});

export default AuthSlice;