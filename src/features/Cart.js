import React, { Component, useState, useEffect } from 'react';
import './Cart.css';
import { useSelector, useDispatch} from 'react-redux';
import { fetchProducts } from './productSlice';
import { addProductToCart, checkout, cartTotal } from './cartSlice';
import { currency } from '../currency';

export function Cart() {

    const dispatch = useDispatch();

    const cartItem = useSelector(state => state.cart.items);
    const products = useSelector(state => state.product.products);
    const cartsTotal = useSelector(state => cartTotal(state));
    const checkoutStatus = useSelector(state => state.cart.checkoutStatus);
    
    return (
        <div>
            <p>Picked Items</p>
            <div>
                {
                    cartItem.map(m => 
                    <div className="cartItem" key={m.id}>
                        <span>{m.title}</span>
                        <span>{currency(m.price)}</span>
                        <span>{m.quantity}</span>
                    </div>)
                }
            </div>
            <p>total : <span>{currency(cartsTotal)}</span></p>
            <button onClick={()=>{dispatch(checkout(cartItem))}}>Check Out</button>
            <p>{ checkoutStatus && checkoutStatus}</p>
        </div>
    )
    
}

//total