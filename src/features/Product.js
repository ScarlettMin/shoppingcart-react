import React, { Component, useEffect, useState } from 'react';
import './Product.css'
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from './productSlice';
import { addProductToCart } from './cartSlice';
import { currency } from '../currency';

export function Product() {
    const [isLoading, setIsLoading ] = useState(false);
    
    //useSelector안의 내용들만 따로 slice에 저장하는것이, Vue에서 getter에 해당됨
    const cartItem = useSelector(state => state.cart.items);
    const products = useSelector(state => state.product.products);

    const dispatch = useDispatch();

    useEffect (()=>{
        setIsLoading(true)

        dispatch(fetchProducts())
        .then(()=>{
            setIsLoading(false)
        })
    }, []);
    //useEffect (()=>{ ... });  ComponentDidMount랑 componentDidUpdate,  ui에서 상태변경이 일어나면 계속 불림.그래서 끝에 저걸 추가해줘야함. 


    return (
        <div>
            <p>List</p>
            {
                isLoading && <img src='https://i.imgur.com/JfPpwOA.gif'  /> 
            }
            <div>
            {
                products.map(m => 
                    <div className="product" key={m.id}> 
                        <span>{m.title}</span> 
                        <span>{currency(m.price)}</span>
                        <span>{m.inventory} </span>
                        <button disabled={m.inventory < 1 ? true :false} onClick={()=>{dispatch(addProductToCart(cartItem, m))}}>Add to Cart</button>
                    </div>)
                }
            </div>
        </div>
    )
}


//리스트 
//카트 추가 버튼 o
//재고량 줄이기 o
//
