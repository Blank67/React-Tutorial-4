import React, { useImperativeHandle, useRef } from 'react';
import css from './Input.module.css'

const Input = React.forwardRef((props,refs) => {

    const inputRef = useRef();

    const activate = () => {
        inputRef.current.focus();
    }

    useImperativeHandle(refs, () => {
        return {
            focused:activate
        }
    })

    return (
        <div className={`${css.control} ${props.isValid === false ? css.invalid : ''}`}>
            <label htmlFor={props.id}> {props.label} </label>
            <input ref={inputRef} type={props.type} id={props.id} value={props.value} onChange={props.onChange} onBlur={props.onBlur} />
        </div>
    );
});

export default Input;