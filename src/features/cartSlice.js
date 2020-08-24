import { createSlice } from '@reduxjs/toolkit';
import { decrementProductInventory } from './productSlice';
import shop from '../api/shop';


//Module
export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        checkoutStatus: null
    },
    reducers: { //action 과 다른점은, state변경을 위한 함수. 
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
        },
        setCheckoutStatus: (state, action)=>{
            state.checkoutStatus = action.payload
        },
        emptyCart: (state, action)=>{
            state.items = []
        }
    }
})

//밑에 지정된 reducer 외부에서 사용할수 있도록 노출 시켜주는.
export const {pushProductToCart, incrementItemQuantity, emptyCart, setCheckoutStatus} = cartSlice.actions;

//Action  - 성능이 들어가거나, api 요청이나, 추가적인 작업을 해야할때, 다수의 리듀서를 호출할때
export const addProductToCart = (cartItems, productItem) => dispatch => {
    if(productItem.inventory > 0){
        const exist = cartItems.find(cart => cart.id === productItem.id)
        if(!exist) {
            dispatch(pushProductToCart(productItem))
        } else {
            dispatch(incrementItemQuantity(exist))
        }
        dispatch(decrementProductInventory(productItem))
    }
}

export const checkout = (cartItems) => dispatch => {
    return new Promise((resolve, reject)=>{
        shop.buyProducts(cartItems, 
            ()=>{
                dispatch(emptyCart())
                dispatch(setCheckoutStatus('success'))
            },
            ()=>{
                dispatch(setCheckoutStatus('fail'))
            }
        )
    })
}
export const cartTotal = (state => {
    return state.cart.items.reduce((total, i) => {
        return total = total + (i.price * i.quantity)
    }, 0)
})

export default cartSlice.reducer;