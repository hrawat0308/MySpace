import classes from './Login.module.css';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import Input from '../Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingSliceActions, LoginActions } from '../../store';
import { AuthActions } from '../../store';
import { ErrorSliceActions } from '../../store';
import ErrorModal from '../Modal/ErrorModal';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Login = function(){
    const dispatch = useDispatch();
    const enteredEmail = useSelector((state)=>state.login.enteredEmail);
    const enteredPassword = useSelector((state)=>state.login.enteredPassword);
    const emailIsTouched = useSelector((state)=>state.login.emailIsTouched);
    const emailIsValid = useSelector((state)=>state.login.emailIsValid);
    const passwordIsTouched = useSelector((state)=>state.login.passwordIsTouched);
    const passwordIsValid = useSelector((state)=>state.login.passwordIsValid);
    const error = useSelector((state)=>state.error.error);
    const isLoading = useSelector((state)=>state.loading.loading);

    const onLoginHandler = async(event)=>{
        event.preventDefault();
        dispatch(LoginActions.setEmailIsTouched({value : true}));
        dispatch(LoginActions.setPasswordIsTouched({value : true}));
        if(enteredPassword.trim().length >= 6 ){
            dispatch(LoginActions.setPasswordIsValid({value : true}));
        }
        else{
            dispatch(LoginActions.setPasswordIsValid({ value : false}));
            return;
        }
        if(enteredEmail.trim().includes('@')){
            dispatch(LoginActions.setEmailIsValid({value : true}));
        }
        else{
            dispatch(LoginActions.setEmailIsValid({value : false}));
            return;
        }
        
        try{
            dispatch(LoadingSliceActions.setLoading({value : true}));
            const response = await fetch(process.env.BACKEND_URL+'/login',{
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({
                    email : enteredEmail,
                    password: enteredPassword,
                })
            });
            const responseData = await response.json();
            if(!response.ok){
                throw new Error(responseData.message);
            }
            dispatch(LoadingSliceActions.setLoading({value : false}));
            dispatch(LoginActions.setEnteredEmail({value : ""}));
            dispatch(LoginActions.setEnteredPassword({value : ""}));
            dispatch(AuthActions.login({userId : responseData.user, token : responseData.token, author : responseData.author}));
        }
        catch(err){
            console.log(err);
            dispatch(LoadingSliceActions.setLoading({value : false}));
            dispatch(ErrorSliceActions.setError({value : err.message || "Something Went Wrong!!"}));
        }
    }

    const emailInputOnchange = (event) => {
        dispatch(LoginActions.setEnteredEmail({value : event.target.value }));
        if(event.target.value.trim().includes('@')){
            dispatch(LoginActions.setEmailIsValid({value : true}));
        }else{
            dispatch(LoginActions.setEmailIsValid({value : false}));
        }
    }

    const passwordInputOnchange = (event) =>{
        dispatch(LoginActions.setEnteredPassword({value : event.target.value }));
        if(event.target.value.trim().length >= 6 ){
            dispatch(LoginActions.setPasswordIsValid({value : true}));
        }
        else{
            dispatch(LoginActions.setPasswordIsValid({value : false}));
        }
    }

    const emailBlur = ()=>{
        dispatch(LoginActions.setEmailIsTouched({value : true}));
        if(enteredEmail.trim().includes('@')){
            dispatch(LoginActions.setEmailIsValid({value : true}));
        }
    }

    const passwordBlur = ()=>{
        dispatch(LoginActions.setPasswordIsTouched({value : true}));
        if(enteredPassword.trim().length >= 6 ){
            dispatch(LoginActions.setPasswordIsValid({value : true}));
        }
    }

    const errorHandler = () => {
        dispatch(ErrorSliceActions.setError({value : null}));
    }

    return(
        <Fragment>
        { !!error && <ErrorModal error={error} onClear={errorHandler} />}
        <div className={classes.loginContainer}>
            { isLoading && <LoadingSpinner asOverlay />}
            <div className={classes.formContainer}>
            <form className={classes.login} onSubmit={onLoginHandler}>
                <Input  label="Email" 
                        type="email" 
                        onContentChange={emailInputOnchange}  
                        value={enteredEmail} 
                        onInputBlur={emailBlur}
                />
                { emailIsTouched && !emailIsValid && <p className={classes.invalidInput}>Enter a Valid Email Address!!</p> }
                <Input  label="Password" 
                        type="password" 
                        onContentChange={passwordInputOnchange} 
                        value={enteredPassword}
                        onInputBlur={passwordBlur} 
                />
                { passwordIsTouched && !passwordIsValid && <p className={classes.invalidInput}>Password must be atleast 6 characters long!!</p> }
                <button type='submit' className={classes.loginSubmitBtn}>Login</button>
            </form>
            <hr className={classes.ruler}></hr>
            <div className={classes.newUserContainer}>
                <p>New User ? <Link to="/signup">Register Here</Link></p>
            </div>
            </div>
        </div>
        </Fragment>
    )
}

export default Login;