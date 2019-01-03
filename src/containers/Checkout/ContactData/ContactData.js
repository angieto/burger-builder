import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';
import ErrorHandler from '../../../hoc/ErrorHandler/ErrorHandler';

import { connect } from 'react-redux';
import * as orderActions from '../../../store/actions/index';
import { updateObject } from '../../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation: { required: true, minLength: 2 },
                valid: false,
                touched: false,
                errorMsg: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: { required: true, minLength: 5 },
                valid: false,
                touched: false,
                errorMsg: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: { required: true, minLength: 5, maxLength: 5 },
                valid: false,
                touched: false,
                errorMsg: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: { required: true, minLength: 2 },
                valid: false,
                touched: false,
                errorMsg: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: { required: true, minLength: 10 },
                valid: false,
                touched: false,
                errorMsg: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'standard', displayValue: 'Standard (within 2 hours)'},
                        {value: 'express', displayValue: 'Express (within 30 minutes)'}
                    ]
                },
                value: 'standard', // default value 
                validation: {}, // to prevent undefined error when looped through checkValidity 
                valid: true
            },
        },
        formIsValid: false
    }

    // methods
    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier];
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }
        this.props.onOrderBurger(order, this.props.token);
    }

    checkValidity (value, rules) {
        let isValid = true;
        // alternative way to handle undefined error for the drop down menu
        // if (!rules) return isValid;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    generateErrorMsg (value, rules) {
        let errorMsg = '';
        if (rules.required && value.trim() === '') {
            errorMsg = 'All fields are required!';
            return errorMsg;
        }
        if (rules.minLength && value.length < rules.minLength) {
            errorMsg = `Minimum ${rules.minLength} characters`;
            return errorMsg;
        }
        if (rules.maxLength && value.length > rules.maxLength) {
            errorMsg = `Input should not be longer than ${rules.maxLength} characters`;
            return errorMsg;
        }
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true,
            errorMsg: this.generateErrorMsg(event.target.value, this.state.orderForm[inputIdentifier].validation)
        }); 
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        });

        console.log(updatedFormElement);
        // loop through updateOrderForm to validate each inputIdentifier 
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    }

    render() {
        const formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                { formElements.map( formElement => (
                    <Input key={formElement.id}
                           elementType={formElement.config.elementType} 
                           elementConfig={formElement.config.elementConfig}
                           value={formElement.config.value}
                           invalid={!formElement.config.valid}
                           // check if there's validation rule for the config
                           shouldValidate={formElement.config.validation}
                           touched={formElement.config.touched}
                           // errorMsg
                           errorMsg={formElement.config.errorMsg}
                           changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ) ) }
                <p><Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button></p>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Please enter your contact information</h4>
                { form }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(ContactData, axios));