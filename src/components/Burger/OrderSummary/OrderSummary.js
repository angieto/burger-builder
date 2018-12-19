import React from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    // componentWillUpdate() {
    //     console.log('[OrderSummary] WillUpdate');
    // }
    const ingredientSummary = Object.keys(props.ingredients)
    .map( key => {
        return (
            <li key={key}>
                <strong className="text-capitalize">{key}</strong>: {props.ingredients[key]}
            </li>
        );
    });
    return (
        <>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                { ingredientSummary }
            </ul>
            <p><strong>Total: ${props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType='Danger' clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btnType='Success' clicked={props.purchaseContinued}>Continue</Button>
        </>
    );
}
    

export default orderSummary;