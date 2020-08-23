import { createSlice } from '@reduxjs/toolkit';


export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: []
    },
    reducers: {
        pushProductToCart: (state, action) => {
            state.items.push({
                id: action.payload.id,
                quantity : 1
            })
        },
        incrementItemQuantity: (state, action) => {
            
            //update!!!!! 내 id를가지고 cart를 찾아서 그거의 quantity를 업데이트해야되는데, ..새로 추가됨...
            //action.payload.quantity++
            //state.quantity
        }
    }
})
export const {pushProductToCart, incrementItemQuantity} = cartSlice.actions;

export const addProductToCart = (cartItems, item) => dispatch => {
    const exist = cartItems.find(cart => cart.id === item.id)
    if(!exist) {
        dispatch(pushProductToCart(item))
    } else {
        dispatch(incrementItemQuantity(item))
        
    }
}

export default cartSlice.reducer;