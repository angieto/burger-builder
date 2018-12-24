import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';

import classes from './ContactData.module.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }
    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Please enter your contact information</h4>
                <form action="">
                    <input type="text" name="name" placeholder="Name"/>
                    <input type="email" name="email" placeholder="Email Address"/>
                    <input type="text" name="street" placeholder="Street"/>
                    <input type="text" name="postal" placeholder="Postal Code"/>
                    <p><Button btnType="Success">ORDER</Button></p>
                </form>
            </div>
        );
    }
}

export default ContactData;