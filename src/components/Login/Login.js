import React, { useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import css from './Login.module.css';
import Button from '../UI/Button/Button';

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
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [enteredCollege, setEnteredCollege] = useState('');
  // const [collegeIsValid, setCollegeIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null});
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: null});
  const [collegeState, dispatchCollege] = useReducer(collegeReducer, {value: '', isValid: null});

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('Validator function called.');
  //     setFormIsValid(enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredCollege.trim().length > 0);      
  //   }, 1000);
  //   return () => {
  //     console.log('Cleanup function called.');
  //     clearTimeout(identifier);
  //   };
  // },[enteredEmail,enteredPassword,enteredCollege]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({type: 'EMAIL_INPUT', val: event.target.value});
    setFormIsValid(event.target.value && passwordState.isValid && collegeState.isValid);      
  };
  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type: 'PASSWORD_INPUT', val: event.target.value});
    setFormIsValid(emailState.isValid && passwordState.isValid && collegeState.isValid);      
  };
  const collegeChangeHandler = (event) => {
    // setEnteredCollege(event.target.value);
    dispatchCollege({type: 'COLLEGE_INPUT', val: event.target.value})
    setFormIsValid(emailState.isValid && passwordState.isValid && collegeState.isValid);      
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({type: 'INPUT_BLUR'});
  };
  const validatePasswordHandler = () => {
    dispatchPassword({type: 'PASSWORD_BLUR'});
    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };
  const validateCollegeHandler = () => {
    // setCollegeIsValid(enteredCollege.trim().length > 0);
    dispatchCollege({type: 'COLLEGE_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={css.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${css.control} ${
            emailState.isValid === false ? css.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${css.control} ${
            passwordState.isValid === false ? css.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${css.control} ${
            collegeState.isValid === false ? css.invalid : ''
          }`}
        >
          <label htmlFor="college">College</label>
          <input
            type="text"
            id="text"
            value={collegeState.value}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div>
        <div className={css.actions}>
          <Button type="submit" className={css.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
