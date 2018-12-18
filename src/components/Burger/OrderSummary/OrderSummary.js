import React from 'react';

const orderSummary = (props) => {
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
            <p>Continue to checkout?</p>
        </>
    );
};

export default orderSummary;