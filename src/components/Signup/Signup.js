import Input from "../Input/Input";
import classes from './Signup.module.css';
import {Link} from 'react-router-dom';
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingSliceActions, SignupActions } from "../../store";
import { AuthActions } from "../../store";
import { ErrorSliceActions } from "../../store";
import ErrorModal from '../Modal/ErrorModal';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';


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
    const error = useSelector((state)=>state.error.error);
    const isLoading = useSelector((state)=>state.loading.loading);

    const onSignupHandler = async(event) => {
        event.preventDefault();
        dispatch(SignupActions.setEmailIsTouched({ value : true }));
        dispatch(SignupActions.setPasswordIsTouched({ value : true }));
        dispatch(SignupActions.setNameIsTouched({ value : true }));
    
        if(enteredPassword.trim().length >= 6 ){
            dispatch(SignupActions.setPasswordIsValid({ value : true}));
        }
        if(enteredEmail.trim().includes('@')){
            dispatch(SignupActions.setEmailIsValid({ value : true}));
        }
        if(enteredName.trim() !== ""){
            dispatch(SignupActions.setNameIsValid({ value : true}));
        }

        try{
            dispatch(LoadingSliceActions.setLoading({value : true}));
            const response = await fetch('https://my-space-mern.herokuapp.com'+'/signup',{
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    name : enteredName,
                    email : enteredEmail,
                    password: enteredPassword,
                })
            });
            const responseData = await response.json();
            if(!response.ok){
                throw new Error(responseData.message);
            }
            dispatch(LoadingSliceActions.setLoading({value : false}));
            dispatch(SignupActions.setEnteredName({value : ""}));
            dispatch(SignupActions.setEnteredEmail({value : ""}));
            dispatch(SignupActions.setEnteredPassword({value:""}));
            dispatch(AuthActions.login({userId : responseData.user, token : responseData.token, author : responseData.author}));
        }
        catch(err){
            console.log(err);
            dispatch(LoadingSliceActions.setLoading({ value : false}));
            dispatch(ErrorSliceActions.setError({value : err.message || "Something Went Wrong!!"}));
        }
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

    const errorHandler = () => {
        dispatch(ErrorSliceActions.setError({value : null}));
    }

    return(
        <Fragment>
        { !!error && <ErrorModal error={error} onClear={errorHandler} />}    
        <div className={classes.signupContainer}>
            { isLoading && <LoadingSpinner asOverlay />}
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