import React from 'react';
import classes from './BurgerIngredient.module.css';

const burgerIngredient = (props) => {
    let ingredient = null;
    switch (props.type) {
        case ('bread-bottom'):
            ingredient = <div className={classes.BreadBottom}></div>;
            break;
        case ('bread-top'):
            ingredient = (
                <div className="classes.BreadTop">
                    <div classname={ classes.Seed1 }></div>
                    <div classname={ classes.Seed2 }></div>
                </div>
            );
            break;
        case ('meat'):
            ingredient = <div className={classes.Meat}></div>
            break;
        case ('chesse'):
            ingredient = <div className={classes.Chesse}></div>
            break;
        case ('bacon'):
            ingredient = <div className={classes.Bacon}></div>
            break;
        case ('salad'):
            ingredient = <div className={classes.Salad}></div>
            break;
        default:
                ingredient = null;
    }
    return ingredient;
};

export default burgerIngredient;