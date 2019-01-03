import React from 'react';
import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close].join(' ');
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open].join(' ');
    }    
    return(
        <>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </>
    );
};

export default sideDrawer;