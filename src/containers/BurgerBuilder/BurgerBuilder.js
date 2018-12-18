import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 2,
            bacon: 1,
            cheese: 1,
            meat: 1
        }
    }

    render() {
        return (
            <>
                <Burger ingredients={this.state.ingredients}/>
                <div>Build Controls</div>
            </>
        )
    }
}

export default BurgerBuilder;