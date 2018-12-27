import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';

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
                valid: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: { required: true, minLength: 5 },
                valid: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: { required: true, minLength: 5, maxLength: 5 },
                valid: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: { required: true, minLength: 2 },
                valid: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: { required: true, minLength: 10 },
                valid: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'standard', displayValue: 'Standard (within 2 hours)'},
                        {value: 'express', displayValue: 'Express (within 30 minutes)'}
                    ]
                },
                value: '',
                valid: true
            },
        },
        formIsValid: false,
        loading: false
    }

    // methods
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier];
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json', order)
             .then(res => {
                 this.setState({ loading: false });
                 // we need to pass the props from Checkout to here to access its history info
                 console.log(this.props.history);
                 // redirect back to the main page
                 this.props.history.push('/');
             })
             .catch(err => this.setState({ loading: false }));
    }

    checkValidity (value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        // console.log(event.target.value);
        const updatedOrderForm = { ...this.state.orderForm };
        // clone another extra level
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] }; 
        updatedFormElement.value = event.target.value;
        // validate user's input
        updatedFormElement.valid = this.checkValidatiry(updatedFormElement.value, updatedFormElement.validation);

        updatedOrderForm[inputIdentifier] = updatedFormElement;

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
                           changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ) ) }
                <p><Button btnType="Success">ORDER</Button></p>
            </form>
        );
        if (this.state.loading) {
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

export default ContactData;