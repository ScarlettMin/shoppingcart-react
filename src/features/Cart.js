import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchProducts } from './productSlice';
import { addProductToCart, cartTotal } from './cartSlice';
import { currency } from '../currency';

class ShoppingCart extends Component {
    constructor(props){
        super(props);

        this.state = {

        }
    }
    render(){
        return (
            <div>
                <p>Picked Items</p>
                <ul>
                    {
                        this.props.cartItem.map(m => 
                        <li>{m.title} - {m.price} - {m.quantity}</li>)
                    }
                </ul>
                <p>total : <span>{currency(this.props.cartTotal)}</span></p>
            </div>
        )
    }
}

export default connect(
    (state)=> ({
        cartItem : state.cart.items,
        products : state.product.products,
        cartTotal : cartTotal(state)
    }),
    
    /* ({cart})=> ({
        cartItem : cart.items
    }), */
    { fetchProducts, addProductToCart } // 사용해서 연결할 actions 
)(ShoppingCart);

//카트 리스트 노출 ㅇ
//카트 리스트에 카트 수량 노출 ㅇ
//