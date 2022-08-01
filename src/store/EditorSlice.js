import { createSlice } from "@reduxjs/toolkit";

const TextEditorSlice = createSlice({
    name : "textEditor",
    initialState : { textValue : ""},
    reducers : {
        setTextValue(state,action){
            state.textValue = action.payload.value;
        }
    }
});

export default TextEditorSlice;