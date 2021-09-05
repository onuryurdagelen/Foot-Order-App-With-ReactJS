import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';
import { useContext } from 'react';
import CartContext from '../../../store/cart-context';
const MealItemForm = props => {
  const CartCtx = useContext(CartContext);
  return (
    <form className={classes.form} action='#'>
      <button>+ Add</button>
      <Input
        label='Amount'
        input={{
          id: 'amount' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
    </form>
  );
};
export default MealItemForm;
