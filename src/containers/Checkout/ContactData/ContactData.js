import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false,
    }

    // methods
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
                <Input inputtype="input" type="text" name="name" placeholder="Name"/>
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