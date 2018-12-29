import React, { Component } from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    render () {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map( key => {
            return (
                <li key={key}>
                    <strong className="text-capitalize">{key}</strong>: {this.props.ingredients[key]}
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
                <p><strong>Total: ${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType='Danger' clicked={this.props.purchaseCancelled}>Cancel</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinued}>Continue</Button>
            </>
        );
    }  
}
    
export default OrderSummary;