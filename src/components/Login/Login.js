import React, { useReducer, useEffect, useState, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import css from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../context/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
  if(action.type === 'EMAIL_INPUT'){
  return {value: action.val, isValid: action.val.includes('@')};
  }
  if(action.type === 'INPUT_BLUR'){
  return {value: state.value, isValid: state.value.includes('@')};
  }
  return {value: '', isValid: false};
};
const passwordReducer = (state, action) => {
  if(action.type === 'PASSWORD_INPUT'){
    return {value: action.val, isValid: action.val.trim().length > 6}
  }
  if(action.type === 'PASSWORD_BLUR'){
    return {value: state.value, isValid: state.value.trim().length > 6};
  }
  return {value: '', isValid: false};
};
const collegeReducer = (state, action) => {
  if(action.type === 'COLLEGE_INPUT'){
    return {value: action.val, isValid: action.val.trim().length > 2}
  }
  if(action.type === 'COLLEGE_BLUR'){
    return {value: state.value, isValid: state.value.trim().length > 2};
  }
  return {value: '', isValid: false};
};

const Login = (props) => {

  const ctx = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const collegeInputRef = useRef();

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null});
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: null});
  const [collegeState, dispatchCollege] = useReducer(collegeReducer, {value: '', isValid: null});

  const {isValid: emailIsValid} = emailState
  const {isValid: passwordIsValid} = passwordState;
  const {isValid: collegeIsValid} = collegeState

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Validator function called.');
      setFormIsValid(emailIsValid && passwordIsValid && collegeIsValid);      
    }, 1000);
    return () => {
      console.log('Cleanup function called.');
      clearTimeout(identifier);
    };
  },[emailIsValid,passwordIsValid,collegeIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'EMAIL_INPUT', val: event.target.value});
  };
  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'PASSWORD_INPUT', val: event.target.value});
  };
  const collegeChangeHandler = (event) => {
    dispatchCollege({type: 'COLLEGE_INPUT', val: event.target.value})
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'});
  };
  const validatePasswordHandler = () => {
    dispatchPassword({type: 'PASSWORD_BLUR'});
  };
  const validateCollegeHandler = () => {
    dispatchCollege({type: 'COLLEGE_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){
      ctx.onLogin(emailState.value, passwordState.value);
    }else{
      if(!emailIsValid){
        emailInputRef.current.focused();
      }else if(!passwordIsValid){
        passwordInputRef.current.focused();
      }else{
        collegeInputRef.current.focused();
      }
    }
  };

  return (
    <Card className={css.login}>
      <form onSubmit={submitHandler}>
        <Input ref={emailInputRef} id='email' label='E-Mail' type='email' value={emailState.value} isValid={emailIsValid} onChange={emailChangeHandler} onBlur={validateEmailHandler} />
        <Input ref={passwordInputRef} id='password' label='Password' type='password' value={passwordState.value} isValid={passwordIsValid} onChange={passwordChangeHandler} onBlur={validatePasswordHandler} />
        <Input ref={collegeInputRef} id='college' label='College' type='text' value={collegeState.value} isValid={collegeIsValid} onChange={collegeChangeHandler} onBlur={validateCollegeHandler} />
        <div className={css.actions}>
          <Button type="submit" className={css.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
