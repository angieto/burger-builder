import React from 'react';
import classes from './Summary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const Summary = (props) => {
    return (
        <div className={classes.Summary}>
            <h1>Your order is one click away from delivery!</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType="Danger" clicked>Cancel</Button>
            <Button btnType="Success" clicked>Continue</Button>
        </div>
    )
};

export default Summary;