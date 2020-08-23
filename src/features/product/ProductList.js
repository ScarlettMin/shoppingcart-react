import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from './productSlice';
import { addProductToCart } from './cartSlice';

class ProductList extends Component {
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
                <ul>
                {
                    this.props.products.map(m => 
                        <li key={m.id}> {m.title} 
                        <button onClick={()=>{this.props.addProductToCart(this.props.cartItem, m)}}>Add to Cart</button>
                    </li>)
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
    { fetchProducts, addProductToCart } // 사용해서 연결할 actions 
)(ProductList);

//리스트 
//카트 추가 버튼, 액션 