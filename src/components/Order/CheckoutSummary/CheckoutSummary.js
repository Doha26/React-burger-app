import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css'

const checkoutSummary = (props) => {


    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it taste well ! </h1>
            <div className={classes.CheckoutBurger} style={{width:'100%'}}>
                <Burger  style={{width:'100% !important'}}ingredients={props.ingredients}/>
            </div>
            <Button butonType="Danger" clicked={props.checkoutCancelled}>Cancel</Button>
            <Button butonType="Success" clicked={props.checkoutContinued}>Continue</Button>
        </div>
    );
};

export default checkoutSummary;