import React from 'react';
import classes from './BuildControl.module.css';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Remove}>Remove</button>
        <button className={classes.Add}>Add</button>
    </div>
);

export default buildControl;