import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchProducts } from './productSlice';
import { addProductToCart } from './cartSlice';

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
                            <li>{m.id} - {m.quantity}</li>)
                    }
                </ul>
            </div>
        )
    }
}

export default connect(
    (state)=> ({
        cartItem : state.cart.items,
        products : state.product.products
    }),
    
    /* ({cart})=> ({
        cartItem : cart.items
    }), */
    { fetchProducts, addProductToCart } // 사용해서 연결할 actions 
)(ShoppingCart);

//추가된 리스트 추가
//같은 id는 quantity 증가 