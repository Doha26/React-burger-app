import React, {Component} from 'react'
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};


class BurgerBuilder extends Component {

    /*constructor(props){
        super(props)
        this.state = {...}
    }*/

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error:false
    };

    componentDidMount() {
        axios.get('https://react-burger-app-f833c.firebaseio.com/ingredients.json')
            .then(response => {
                console.log(response);
                this.setState({ingredients: response.data});
            }).catch(error => {
                this.setState({error:true})
            console.log(error);
        });
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    updatePurchaseState(updatedIngredients) {

        const sum = Object.keys(updatedIngredients).map(igKey => {
            return updatedIngredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        this.setState({purchasable: sum > 0})
    }


    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    };

    purchaseContinueHandler = () => {
        //alert('You continue');

        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' +encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search:'?'+queryString
        })
    };

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded</p>:<Spinner/>;

        if (this.state.ingredients) {
            burger =
                (
                    <Aux>
                        <Burger ingredients={this.state.ingredients}/>
                        <BuildControls
                            ordered={this.purchaseHandler}
                            purchasable={this.state.purchasable}
                            price={this.state.totalPrice}
                            disabled={disableInfo}
                            ingredientRemoved={this.removeIngredientHandler}
                            ingredientAdded={this.addIngredientHandler}/>
                    </Aux>
                );

            orderSummary = <OrderSummary
                price={this.state.totalPrice}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.state.ingredients}/>;
        }
        if (this.state.loading) {
            orderSummary = <Spinner/>
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);