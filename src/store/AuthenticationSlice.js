import { createSlice } from "@reduxjs/toolkit";


const AuthSlice = createSlice({
    name : "auth",
    initialState : { isLoggedIn : false, userId : null, token : null, author : null, tokenExpirationDate : null },
    reducers : {
        login(state, action){
            state.userId = action.payload.userId;
            state.token = action.payload.token;
            const tokenExpirationDate = action.payload.expiration || new Date(new Date().getTime() + 1000 * 60 * 60);
            state.tokenExpirationDate = tokenExpirationDate;
            localStorage.setItem('userData', 
                          JSON.stringify({  userId : state.userId, 
                                            token : state.token,
                                            author : action.payload.author,
                                            expiration : tokenExpirationDate.toISOString(),
                                          }));
            state.author = action.payload.author;
            state.isLoggedIn = true;
        },
        logout(state, action){
            state.isLoggedIn = false;
            state.token = null;
            state.userId = null;
            state.author = null;
            state.tokenExpirationDate = null;
            localStorage.removeItem('userData');
        },
        
    }
});

export default AuthSlice;