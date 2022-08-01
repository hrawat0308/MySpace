import { createSlice } from "@reduxjs/toolkit";

const SignupSlice = createSlice({
    name : "signup",
    initialState : {
        enteredPassword : "",
        enteredEmail : "",
        enteredName : "",
        emailIsTouched : false,
        passwordIsTouched : false,
        nameIsTouched : false,
        emailIsValid : false,
        passwordIsValid : false,
        nameIsValid : false,
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
        },
        setEnteredName(state, action){
            state.enteredName = action.payload.value;
        },
        setNameIsTouched(state, action){
            state.nameIsTouched = action.payload.value;
        },
        setNameIsValid(state, action){
            state.nameIsValid = action.payload.value;
        }

    }
});


export default SignupSlice;