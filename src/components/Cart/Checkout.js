import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;
const Checkout = props => {
  const [formInputsValidation, setFormValidation] = useState({
    name: true,
    city: true,
    street: true,
    postal: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = event => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid = isFiveChars(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormValidation({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostalIsValid,
      city: enteredCityIsValid,
    });
    props.onConfirm({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostalIsValid,
      city: enteredCityIsValid,
    });
  };

  const onChangeNameHandler = e => {
    setFormValidation(prev => ({ ...prev, name: e.target.value }));
  };
  const onChangeStreetHandler = e => {
    setFormValidation(prev => ({ ...prev, street: e.target.value }));
  };
  const onChangePostalHandler = e => {
    setFormValidation(prev => ({ ...prev, postal: e.target.value }));
  };
  const onChangeCityHandler = e => {
    setFormValidation(prev => ({ ...prev, city: e.target.value }));
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control}`}>
        <label htmlFor='name'>Your Name</label>
        <input
          ref={nameInputRef}
          onChange={onChangeNameHandler}
          type='text'
          id='name'
        />
        {!formInputsValidation.name && (
          <small className={classes.alert}>*Please enter a valid name</small>
        )}
      </div>
      <div className={`${classes.control}`}>
        <label htmlFor='street'>Street</label>
        <input
          ref={streetInputRef}
          onChange={onChangeStreetHandler}
          type='text'
          id='street'
        />
        {!formInputsValidation.street && (
          <small className={classes.alert}>*Please enter a valid city</small>
        )}
      </div>
      <div className={`${classes.control} `}>
        <label htmlFor='postal'>Postal Code</label>
        <input
          ref={postalInputRef}
          onChange={onChangePostalHandler}
          type='text'
          id='postal'
        />
        {!formInputsValidation.postal && (
          <small className={classes.alert}>
            *Please enter a valid postal code
          </small>
        )}
      </div>
      <div className={`${classes.control} `}>
        <label htmlFor='city'>City</label>
        <input
          ref={cityInputRef}
          onChange={onChangeCityHandler}
          type='text'
          id='city'
        />
        {!formInputsValidation.city && (
          <small className={classes.alert}>
            *Please enter a valid city name
          </small>
        )}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancelCheckout}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
