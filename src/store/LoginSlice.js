import { createSlice } from "@reduxjs/toolkit";

const LoginSlice = createSlice({
    name : "login",
    initialState : {
        enteredPassword : "",
        enteredEmail : "",
        emailIsTouched : false,
        passwordIsTouched : false,
        emailIsValid : false,
        passwordIsValid : false,
    },
    reducers : {
        setEnteredPassword(state,action){
            state.enteredPassword = action.payload.value;
        },
        setEnteredEmail(state,action){
            state.enteredEmail = action.payload.value;
        },
        setEmailIsTouched(state,action){
            state.emailIsTouched = action.payload.value;
        },
        setPasswordIsTouched(state,action){
            state.passwordIsTouched = action.payload.value;
        },
        setEmailIsValid(state, action){
            state.emailIsValid = action.payload.value;
        },
        setPasswordIsValid(state, action){
            state.passwordIsValid = action.payload.value;
        }

    }
});


export default LoginSlice;