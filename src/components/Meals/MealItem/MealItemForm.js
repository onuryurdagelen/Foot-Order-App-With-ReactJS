import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';
import { useContext, useRef, useState } from 'react';
import CartContext from '../../../store/cart-context';
const MealItemForm = props => {
  const CartCtx = useContext(CartContext);
  const amountInputRef = useRef();

  const [amountIsValid, setAmountIsValid] = useState(true);
  const submitHandler = event => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmount < 1 ||
      enteredAmount > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
    setAmountIsValid(true);
  };

  return (
    <form onSubmit={submitHandler} className={classes.form} action='#'>
      <Input
        isValid={!amountIsValid}
        ref={amountInputRef}
        label='Amount'
        input={{
          id: 'amount' + props.id,
          type: 'number',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && (
        <p className={classes.alert__danger}>*Please enter a valid amount</p>
      )}
    </form>
  );
};
export default MealItemForm;
