import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 2,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.5,
    meat: 1.5,
    cheese: 0.75
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.ADD_INGREDIENT):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients, // one deeper level of cloning
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case (actionTypes.REMOVE_INGREDIENT): 
            return {
                ...state,
                ingredients: {
                    ...state.ingredients, // one deeper level of cloning
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        case (actionTypes.SET_INGREDIENTS):
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 2, // set price back to default
                error: false // reset the error back to false
            };
        case (actionTypes.FETCH_INGREDIENTS_FAILED):
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
};

export default reducer;