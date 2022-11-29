import css from './Input.module.css'

const Input = (props) => {
    return (
        <div className={`${css.control} ${props.isValid === false ? css.invalid : ''}`}>
            <label htmlFor={props.id}> {props.label} </label>
            <input type={props.type} id={props.id} value={props.value} onChange={props.onChange} onBlur={props.onBlur} />
        </div>
    );
};

export default Input;