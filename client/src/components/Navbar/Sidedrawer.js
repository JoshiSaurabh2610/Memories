import React from 'react';
import { NavItemsData } from './NavData';
import classes from './sidedrawer.module.css';
import Navitem from './Navitem';
import { Close } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import {Link} from 'react-router-dom';


const Sidedrawer = (props) => {
    let classesAttached = [classes.sidedrawer];
    if (!props.sideDrawer) {
        classesAttached = classesAttached.concat(classes.close);
    }
    const closeHandler = () => {
        classesAttached = classesAttached.concat(classes.close);
        props.setSideDrawer(false);
    }
    return (
        <div className={classesAttached.join(' ')}>
            <div className={classes.Icon} onClick={closeHandler}><Close /></div>
            {
                NavItemsData.map((item, index) => {
                    if(item.auth && !props.user)
                        return null; 
                    else return <Navitem onClick={closeHandler} link={item.path} key={index}>{item.icon}<span style={{ 'marginLeft': '15px' }}>{item.title}</span></Navitem>
                })
            }
            <Button onClick={closeHandler} className={classes.btn} variant="contained" color="secondary" component={Link} to="/auth" >{props.user ? "Logout": "login"}</Button>
        </div>
    );
};

export default Sidedrawer;