import React, { Component } from 'react';
import axios from '../../../axios-orders';
import WithRouter from 'react-router-dom';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    // methods
    orderHandler = (event) => {
        event.preventDefault();
        // console.log(this.props.ingredients);
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'me',
                address: {
                    street: 'blah blah',
                    zipCode: '3123',
                    country: 'hh'
                },
                email: 'test@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        // submit the order to the assigned url address as a json data (required format)
        axios.post('/orders.json', order)
             .then(res => {
                 this.setState({ loading: false, purchasing: false });
                 // we need to pass the props from Checkout to here to access its history info
                 console.log(this.props.history);
                 // redirect back to the main page
                 this.props.history.push('/');
             })
             .catch(err => this.setState({ loading: false, purchasing: false }));
    }

    render() {
        let form = (
            <form action="">
                <input type="text" name="name" placeholder="Name"/>
                <input type="email" name="email" placeholder="Email Address"/>
                <input type="text" name="street" placeholder="Street"/>
                <input type="text" name="postal" placeholder="Postal Code"/>
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