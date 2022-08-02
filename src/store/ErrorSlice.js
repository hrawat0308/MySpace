import { createSlice } from "@reduxjs/toolkit";

const ErrorSlice = createSlice({
    name : "error",
    initialState : { error : null },
    reducers : {
        setError(state,action){
            state.error = action.payload.value;
        },
    }

});

export default ErrorSlice;