import React, { Component } from 'react';
import './Cart.css';
import {connect} from 'react-redux';
import { fetchProducts } from './productSlice';
import { addProductToCart, checkout, cartTotal } from './cartSlice';
import { currency } from '../currency';

class Cart extends Component {
    constructor(props){
        super(props);

        this.state = {

        }
    }
    render(){
        return (
            <div>
                <p>Picked Items</p>
                <div>
                    {
                        this.props.cartItem.map(m => 
                        <div class="cartItem" key={m.id}>
                            <span>{m.title}</span>
                            <span>{currency(m.price)}</span>
                            <span>{m.quantity}</span>
                        </div>)
                    }
                </div>
                <p>total : <span>{currency(this.props.cartTotal)}</span></p>
                <button onClick={()=>{this.props.checkout(this.props.cartItem)}}>Check Out</button>
                <p>{ this.props.checkoutStatus && this.props.checkoutStatus}</p>
            </div>
        )
    }
}

export default connect(
    (state)=> ({
        cartItem : state.cart.items,
        products : state.product.products,
        cartTotal : cartTotal(state),
        checkoutStatus : state.cart.checkoutStatus
    }),
    
    /* ({cart})=> ({
        cartItem : cart.items
    }), */
    { fetchProducts, addProductToCart, checkout } // 사용해서 연결할 actions 
)(Cart);

//카트 리스트 노출 ㅇ
//카트 리스트에 카트 수량 노출 ㅇ
//