import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {
    // Object.keys() returns an array of keys
    // .map() executes a function on each element of the array and returns a new array
    // Array(num) creates a new array with num space
    // since the arugument itself is not used in this case, name it as "_"
    // we want the index of each props.ingredients[key] to generate a unique key to each ingredient
    const transformedIngredients = Object.keys(props.ingredients)
                                         .map(key => {
                                             return [...Array(props.ingredients[key])].map( (_,i) => {
                                                 return <BurgerIngredient key={key+i} type={key} />
                                             }); 
                                         });
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            { transformedIngredients }
            <BurgerIngredient type='bread-bottom' />
        </div>
    )
}

export default burger;