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
        // call reducer-action 
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
                        // 전체 카트 정보(this.props.cartItem)와 현재 상품정보(m)를 넘겨 주었다
                 }
                 
                </div>
            </div>
        )
    }
}

//redux and react Binding, 즉 가져와서 사용하겠다 
export default connect(
    (state)=> ({ // = setState in React 
        products : state.product.products,
        cartItem : state.cart.items
    }),
    { fetchProducts, addProductToCart } // 사용해서 연결할 actions 
)(Product);
