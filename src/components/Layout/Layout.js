import React, { Component } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    render() {
        return (
            <>
                <Toolbar />
                <SideDrawer />
                <main className={classes.Content}> {this.props.children} </main>
            </>
        );
    }
};
    

export default Layout;