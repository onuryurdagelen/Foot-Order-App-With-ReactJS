import classes from './Input.module.css';
import React from 'react';
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={`${classes.input} ${props.isValid && `${classes.input__new}`}`}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});
export default Input;
