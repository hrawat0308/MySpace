import { createSlice } from "@reduxjs/toolkit";

const ErrorSlice = createSlice({
    name : "error",
    initialState : { error : null, errorDel : null },
    reducers : {
        setError(state,action){
            state.error = action.payload.value;
        },
        setErrorDel(state,action){
            state.errorDel = action.payload.value;
        }
    }

});

export default ErrorSlice;