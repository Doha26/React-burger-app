import React, {Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from '../ContactData/ContactData.css'
import axios from "../../../axios-order";
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        addres: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients); //

        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Pavel Jismer',
                address: {
                    street: 'Rue des Pavés',
                    zipCode: '345654',
                    country: 'Cameroun',
                },
                email: 'foujeupavel@gmail.com'
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            }).catch(error => {
            console.log(error);
            this.setState({loading: false});
        });
    };


    render() {
        let form =
            (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="your name"/>
                <input className={classes.Input} type="email" name="email" placeholder="your email"/>
                <input className={classes.Input} type="text" name="street" placeholder="your street"/>
                <input className={classes.Input} type="text" name="postal" placeholder="your postal code"/>
                <Button butonType="Success" clicked={this.orderHandler}>Order</Button>
            </form>
            );
        if (this.state.loading) {
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;