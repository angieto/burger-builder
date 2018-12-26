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
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'standard', displayValue: 'Standard (within 2 hours)'},
                        {value: 'express', displayValue: 'Express (within 30 minutes'}
                    ]
                },
                value: ''
            },
        },
        loading: false
    }

    // methods
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price
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

    render() {
        let form = (
            <form>
                <Input elementType='' elementConfig='' value='' />
                <Input inputtype="input" type="email" name="email" placeholder="Email Address"/>
                <Input inputtype="input" type="text" name="street" placeholder="Street"/>
                <Input inputtype="input" type="text" name="postal" placeholder="Postal Code"/>
                <p><Button btnType="Success" clicked={this.orderHandler}>ORDER</Button></p>
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