import Input from "../Input/Input";
import classes from './Signup.module.css';
import {Link} from 'react-router-dom';
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SignupActions } from "../../store";

const Signup = function(){
    const dispatch =  useDispatch();
    const enteredName = useSelector((state)=> state.signup.enteredName);
    const enteredEmail = useSelector((state)=> state.signup.enteredEmail);
    const nameIsTouched = useSelector((state)=> state.signup.nameIsTouched);
    const nameIsValid = useSelector((state)=> state.signup.nameIsValid);
    const emailIsTouched = useSelector((state)=> state.signup.emailIsTouched);
    const emailIsValid = useSelector((state)=> state.signup.emailIsValid);
    const enteredPassword = useSelector((state)=> state.signup.enteredPassword);
    const passwordIsTouched = useSelector((state)=> state.signup.passwordIsTouched);
    const passwordIsValid = useSelector((state)=> state.signup.passwordIsValid);

    const onSignupHandler = (event) => {
        event.preventDefault();
        alert("Registered");
    }

    const nameInputOnchange = (event) => {
        dispatch(SignupActions.setEnteredName({ value : event.target.value }));
        if(event.target.value.trim() !== "" ){
            dispatch(SignupActions.setNameIsValid({value : true}));
        }
        else{
            dispatch(SignupActions.setNameIsValid({value : false}));
        }
    }

    const emailInputOnchange = (event)=>{
        dispatch(SignupActions.setEnteredEmail({value : event.target.value}));
        if(event.target.value.trim().includes('@')){
            dispatch(SignupActions.setEmailIsValid({value : true}));
        }else{
            dispatch(SignupActions.setEmailIsValid({value : false}));
        }
    }

    const passwordInputOnchange = (event) =>{
        dispatch(SignupActions.setEnteredPassword({value : event.target.value}));
        if(event.target.value.trim().length >= 6 ){
            dispatch(SignupActions.setPasswordIsValid({ value : true }));
        }
        else{
            dispatch(SignupActions.setPasswordIsValid({ value : false }));
        }
    }

    const emailBlur = ()=>{
        dispatch(SignupActions.setEmailIsTouched({ value : true }));
        if(enteredEmail.trim().includes('@')){
            dispatch(SignupActions.setEmailIsValid({ value : true }));
        }
    }

    const nameBlur = () =>{
        dispatch(SignupActions.setNameIsTouched({ value : true }));
        if(enteredName.trim() !== "" ){
            dispatch(SignupActions.setNameIsValid({ value : true }));
        }
    }

    const passwordBlur = ()=>{
        dispatch(SignupActions.setPasswordIsTouched({ value : true }));
        if(enteredPassword.trim().length >= 6 ){
            dispatch(SignupActions.setPasswordIsValid({ value : true }));
        }
    }

    return(
        <Fragment>
        {/* { !!error && <ErrorModal error={error} onClear={errorHandler} />}     */}
        <div className={classes.signupContainer}>
            {/* { isLoading && <LoadingSpinner asOverlay />} */}
            <div className={classes.formContainer}>
            <form className={classes.signup} onSubmit={onSignupHandler}>
                <Input  label="Name" 
                        type="text"
                        onContentChange={nameInputOnchange}  
                        value={enteredName} 
                        onInputBlur={nameBlur} 
                />
                { nameIsTouched && !nameIsValid && <p className={classes.invalidInput}>Please Enter a Name !!</p> }
                <Input  label="Email" 
                        type="email"
                        onContentChange={emailInputOnchange}  
                        value={enteredEmail} 
                        onInputBlur={emailBlur}   
                />
                { emailIsTouched && !emailIsValid && <p className={classes.invalidInput}>Please Enter valid Email address !!</p> }
                <Input  label="Password" 
                        type="password"  
                        onContentChange={passwordInputOnchange} 
                        value={enteredPassword}
                        onInputBlur={passwordBlur}        
                />
                { passwordIsTouched && !passwordIsValid && <p className={classes.invalidInput}>Password must be atleast 6 characters long!! !!</p> }
                <button type='submit' className={classes.signupSubmitBtn}>Sign Up</button>
            </form>
            <hr className={classes.ruler}></hr>
            <div className={classes.alreadyRegisteredContainer}>
                <p>Already Registered ? <Link to="/login">Login Here</Link></p>
            </div>
            </div>
        </div>
        </Fragment>
    );
}

export default Signup;