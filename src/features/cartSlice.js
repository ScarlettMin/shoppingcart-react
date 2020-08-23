import { createSlice } from '@reduxjs/toolkit';
import { decrementProductInventory } from './productSlice'

//Module
export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: []
    },
    reducers: {
        pushProductToCart: (state, action) => {
            state.items.push({
                id: action.payload.id,
                title: action.payload.title,
                price: action.payload.price,
                quantity : 1
            })
        },
        incrementItemQuantity: (state, action) => { // reducer로 전달된 값인 action.payload는 수정할수 없다. 
            state.items.find(i => i.id === action.payload.id ).quantity++
        }
    }
})

//밑에 지정된 reducer 외부에서 사용할수 있도록 노출 시켜주는.
export const {pushProductToCart, incrementItemQuantity} = cartSlice.actions;

//Action
export const addProductToCart = (cartItems, productItem) => dispatch => {
    const exist = cartItems.find(cart => cart.id === productItem.id)
    if(!exist) {
        dispatch(pushProductToCart(productItem))
    } else {
        dispatch(incrementItemQuantity(exist))
    }
    dispatch(decrementProductInventory(productItem))
}

export const cartTotal = (state => {
    return state.cart.items.reduce((total, i) => {
        return total = total + (i.price * i.quantity)
    }, 0)
})

export default cartSlice.reducer;