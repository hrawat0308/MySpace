import { configureStore, createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name : "auth",
    initialState : { isLoggedIn : true, userId : null, token : null },
    reducers : {
        login(state, action){

        },
        logout(state, action){

        }
    }
});

const Store = configureStore({
    reducer : {
        auth : AuthSlice.reducer,
    }
});


export default Store;
export const AuthActions = AuthSlice.actions;
