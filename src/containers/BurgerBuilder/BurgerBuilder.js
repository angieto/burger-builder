import React, { Component } from 'react';
import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

// import global error handler
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';

// name a GLOBAL const in capital letters
const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.75,
    cheese: 0.5,
    meat: 1.25
}

class BurgerBuilder extends Component {
    state = {
        // redux cases
        ingredients: null,
        totalPrice: 2,
        // local UI cases
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get('https://react-burger-1218.firebaseio.com/ingredients.json')
             .then(res => {
                 this.setState({ingredients: res.data});
             })
             .catch(err => {
                 console.log(err);
                 this.setState({ error: true })
             });
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
    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }
    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        // queryParams = ["bacon = 1", "cheese = 1", "salad = 1", "meat = 1"];
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        return this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let burger = this.state.error ? 
                        <p className='text-danger text-center'>Burger can't be loaded</p> 
                        : <Spinner />;
        let orderSummary = null;
        // only render burger and orderSummary when the ingredient list is not empty
        if (this.state.ingredients) {
            burger = (
                <>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler} />
                </>
            );
            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        } 
        
        return (
            <>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    { orderSummary }
                </Modal>
                { burger }
            </>
        )
    }
}

export default ErrorHandler(BurgerBuilder, axios);