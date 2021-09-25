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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [diSubmit, SetDidSubmit] = useState(false);

  const onCancelCheckOut = () => {
    setShowCheckout(false);
  };

  const cartItemAddHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };
  const submitOrderHandler = async userData => {
    setIsSubmitting(true);
    await fetch(
      'https://react-meals-http-9c6df-default-rtdb.firebaseio.com/orders.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    SetDidSubmit(true);
    cartCtx.clearCart();
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
  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = (
    <React.Fragment>
      <p className={classes.text__align}>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onCloseCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  );
  return (
    <Modal onCloseCart={props.onCloseCart}>
      {!isSubmitting && !diSubmit && (
        <React.Fragment>
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
            <Checkout
              onConfirm={submitOrderHandler}
              onCancelCheckout={onCancelCheckOut}
            />
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
        </React.Fragment>
      )}
      {isSubmitting && isSubmittingModalContent}
      {diSubmit && didSubmitModalContent}
    </Modal>
  );
};
export default Cart;
