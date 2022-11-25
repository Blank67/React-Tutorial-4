import React, { useEffect, useState } from 'react';

import Card from '../UI/Card/Card';
import css from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredCollege, setEnteredCollege] = useState('');
  const [collegeIsValid, setCollegeIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    setFormIsValid(enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredCollege.trim().length > 0);
  },[enteredEmail,enteredPassword,enteredCollege]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
    // setFormIsValid(
    //   event.target.value.includes('@') && enteredPassword.trim().length > 6
    // );
  };
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
    // setFormIsValid(
    //   event.target.value.trim().length > 6 && enteredEmail.includes('@')
    // );
  };const collegeChangeHandler = (event) => {
    setEnteredCollege(event.target.value);
    // setFormIsValid(
    //   event.target.value.trim().length > 6 && enteredEmail.includes('@')
    // );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };
  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };
  const validateCollegeHandler = () => {
    setCollegeIsValid(enteredCollege.trim().length > 0);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={css.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${css.control} ${
            emailIsValid === false ? css.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${css.control} ${
            passwordIsValid === false ? css.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${css.control} ${
            collegeIsValid === false ? css.invalid : ''
          }`}
        >
          <label htmlFor="college">College</label>
          <input
            type="text"
            id="text"
            value={enteredCollege}
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
