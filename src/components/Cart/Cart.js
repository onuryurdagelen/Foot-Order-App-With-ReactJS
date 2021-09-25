import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import React, { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
const Cart = props => {
  const [showCheckout, setShowCheckout] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const onCancelCheckOut = () => {
    setShowCheckout(false);
  };

  const cartItemAddHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };
  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map(item => (
        <CartItem
          price={item.price}
          name={item.name}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onCloseCart={props.onCloseCart}>
      {cartItems}
      <div className={classes.total}>
        {hasItems ? (
          <div>
            <span>Total Amount</span>: <span>{totalAmount}</span>
          </div>
        ) : (
          <React.Fragment>
            <p className={classes.empty__text}>Your cart is empty!</p>
            <div className={classes.actions}>
              <button
                className={classes['button--alt']}
                onClick={props.onCloseCart}
              >
                Close
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
      {showCheckout && hasItems && (
        <Checkout onCancelCheckout={onCancelCheckOut} />
      )}
      {hasItems && !showCheckout && (
        <div className={classes.actions}>
          <button
            className={classes['button--alt']}
            onClick={props.onCloseCart}
          >
            Close
          </button>
          <button
            onClick={() => setShowCheckout(true)}
            className={classes.button}
          >
            Order
          </button>
        </div>
      )}
    </Modal>
  );
};
export default Cart;
