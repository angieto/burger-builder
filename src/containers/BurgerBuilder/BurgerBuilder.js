import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

// name a GLOBAL const in capital letters
const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.75,
    cheese: 0.5,
    meat: 1.25
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 2,
        purchasable: false
    }

    // methods
    addIngredientHandler = (type) => {
        const updatedIngredients = { ...this.state.ingredients };
        const updatedCount = this.state.ingredients[type] + 1;
        updatedIngredients[type] = updatedCount;
        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }
    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] <= 0) return;
        const updatedIngredients = { ...this.state.ingredients };
        const updatedCount = this.state.ingredients[type] - 1;
        updatedIngredients[type] = updatedCount;
        const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }
    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
                          .map( (key) => { return ingredients[key]; })
                          .reduce( (sum, element) => { return sum+element }, 0 );
        this.setState({ purchasable: sum > 0 }); // return true if sum is greater than 0
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                />
            </>
        )
    }
}

export default BurgerBuilder;