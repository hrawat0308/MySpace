import { configureStore} from "@reduxjs/toolkit";
import AuthSlice from "./AuthenticationSlice";

//This is the central Store
const Store = configureStore({
    reducer : {
        auth : AuthSlice.reducer,
    }
});



export default Store;
export const AuthActions = AuthSlice.actions;
