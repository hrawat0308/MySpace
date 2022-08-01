import { configureStore} from "@reduxjs/toolkit";
import AuthSlice from "./AuthenticationSlice";
import TextEditorSlice from "./EditorSlice";
import LoginSlice from "./LoginSlice";
import SignupSlice from "./SignupSlice";

//This is the central Store
const Store = configureStore({
    reducer : {
        auth : AuthSlice.reducer,
        textEditor : TextEditorSlice.reducer,
        login : LoginSlice.reducer,
        signup : SignupSlice.reducer,
    }
});



export default Store;
export const AuthActions = AuthSlice.actions;
export const TextEditorActions = TextEditorSlice.actions;
export const LoginActions = LoginSlice.actions;
export const SignupActions = SignupSlice.actions;