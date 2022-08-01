import classes from './Login.module.css';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import Input from '../Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { LoginActions } from '../../store';

const Login = function(){
    const dispatch = useDispatch();
    const enteredEmail = useSelector((state)=>state.login.enteredEmail);
    const enteredPassword = useSelector((state)=>state.login.enteredPassword);
    const emailIsTouched = useSelector((state)=>state.login.emailIsTouched);
    const emailIsValid = useSelector((state)=>state.login.emailIsValid);
    const passwordIsTouched = useSelector((state)=>state.login.passwordIsTouched);
    const passwordIsValid = useSelector((state)=>state.login.passwordIsValid);

    const onLoginHandler = (event)=>{
        event.preventDefault();
        alert("Login");
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

    return(
        <Fragment>
        {/* { !!error && <ErrorModal error={error} onClear={errorHandler} />} */}
        <div className={classes.loginContainer}>
            {/* { isLoading && <LoadingSpinner asOverlay />} */}
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