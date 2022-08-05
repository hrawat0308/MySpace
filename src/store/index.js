import { configureStore} from "@reduxjs/toolkit";
import AuthSlice from "./AuthenticationSlice";
import TextEditorSlice from "./EditorSlice";
import LoginSlice from "./LoginSlice";
import SignupSlice from "./SignupSlice";
import AllpostsSlice from "./Allposts";
import ErrorSlice from "./ErrorSlice";
import LoadingSlice from "./LoadingSlice";

//This is the central Store
const Store = configureStore({
    reducer : {
        auth : AuthSlice.reducer,
        textEditor : TextEditorSlice.reducer,
        login : LoginSlice.reducer,
        signup : SignupSlice.reducer,
        allposts : AllpostsSlice.reducer,
        error : ErrorSlice.reducer,
        loading : LoadingSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});



export default Store;
export const AuthActions = AuthSlice.actions;
export const TextEditorActions = TextEditorSlice.actions;
export const LoginActions = LoginSlice.actions;
export const SignupActions = SignupSlice.actions;
export const AllpostsActions = AllpostsSlice.actions;
export const ErrorSliceActions = ErrorSlice.actions;
export const LoadingSliceActions = LoadingSlice.actions;