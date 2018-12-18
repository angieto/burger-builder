import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {
    // Object.keys() loops through the object and returns an array of keys
    // .map() executes a function on each element of the array and returns a new array
    // Array(num) creates a new array with num space
    // since the arugument itself is not used in this case, name it as "_"
    // we want the index of each props.ingredients[key] to generate a unique key to each ingredient
    // return an array of <BurgerIngredient key={} type={} />
    // reduce(callback(prevVal, curVal), initial value), returns & adds to the previous value for each loop
    // use reduce() to flatten the arr of Arrays to the arr of <BurgerIngredient/> and access its length
    let transformedIngredients = Object.keys(props.ingredients)
                                         .map(key => {
                                             return Array(props.ingredients[key]).map( (_,i) => {
                                                 return <BurgerIngredient key={key+i} type={key} />
                                             }); 
                                         })
                                         .reduce( (arr, element) => {
                                            return arr.concat(element);
                                         }, [] );
    // set up alert msg when the ingredient list is empty
    if (!transformedIngredients.length) {
        transformedIngredients = <p className="text-danger">I am an empty burger!</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            { transformedIngredients }
            <BurgerIngredient type='bread-bottom' />
        </div>
    )
}

export default burger;