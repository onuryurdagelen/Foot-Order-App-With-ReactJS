import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {
  const [mealsArr, setMealsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [httpsError, setHttpError] = useState(null);
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://react-meals-http-9c6df-default-rtdb.firebaseio.com/meals.json'
      );
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const responseData = await response.json();
      console.log(responseData);

      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          price: responseData[key].price,
          description: responseData[key].description,
        });
      }
      setMealsArr(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch(err => {
      setIsLoading(false);
      setHttpError(err.message);
    });
  }, []);
  let content = '';
  if (isLoading) {
    content = <h1>Loading...</h1>;
  }
  if (httpsError && !isLoading) {
    content = <h1>{httpsError}</h1>;
  } else {
    content = mealsArr.map(meal => (
      <MealItem
        price={meal.price}
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
      />
    ));
  }
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{content}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
