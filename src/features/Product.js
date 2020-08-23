import React, { Component } from 'react';
import './Product.css'
import { connect } from 'react-redux';
import { fetchProducts } from './productSlice';
import { addProductToCart } from './cartSlice';
import { currency } from '../currency';

class Product extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false
        }

    }
    componentWillMount(){
        this.setState({
            isLoading: true
        })
        // reducer-action 을 호출.
        this.props.fetchProducts()
        .then(()=>{
            this.setState({
                isLoading: false
            })
        })
    }
    render(){
        return (
            <div>
                <p>List</p>
                {
                    this.state.isLoading && <img src='https://i.imgur.com/JfPpwOA.gif'  /> 
                }
                <div>
                {
                    this.props.products.map(m => 
                        <div className="product" key={m.id}> 
                            <span>{m.title}</span> 
                            <span>{currency(m.price)}</span>
                            <span>{m.inventory} </span>
                            <button disabled={m.inventory < 1 ? true :false} onClick={()=>{this.props.addProductToCart(this.props.cartItem, m)}}>Add to Cart</button>
                        </div>)
                 }
                </div>
            </div>
        )
    }
}

export default connect(
    (state)=> ({
        cartItem : state.cart.items,
        products : state.product.products
    }),
    { fetchProducts, addProductToCart } // 사용해서 연결할 actions 
)(Product);

//리스트 
//카트 추가 버튼 o
//재고량 줄이기 o
//
