import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'},
    {label:'Meat',type:'meat'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls} >
        <p className={classes.Price}> Current Price : {props.price.toFixed(2)} $</p>
        {controls.map(ctrl => (
         <BuildControl
             key={ctrl.label}
             label={ctrl.label}
             disabled={props.disabled[ctrl.type]}
             added= {() => props.ingredientAdded(ctrl.type)}
             removed= {() => props.ingredientRemoved(ctrl.type)}
         />
        ))}

        <button
            onClick={props.ordered}
            disabled={!props.purchasable}
            className={classes.OrderButton}>Order Now</button>
    </div>

);

export default buildControls;