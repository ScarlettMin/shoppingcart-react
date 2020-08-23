import { createSlice } from '@reduxjs/toolkit';
import shop from '../api/shop'

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: []
    },
    reducers: {
        //불러낸 값을 저장했다. 
        setproduct: (state, action) => {
            state.products = action.payload
        },
        decrementProductInventory:(state, action) => {
            state.products.find(i => i.id === action.payload.id).inventory--
        }
    }
})

export const { setproduct, decrementProductInventory } = productSlice.actions; 
//actions,  api갔다오는거
export const fetchProducts = () => dispatch => {
    return new Promise((resolve, reject)=>{
        shop.getProducts((products)=>{
            dispatch(setproduct(products))// reducer
            resolve()
        })

    })
    
}

//dispatch

//state에 값을 저장
export default productSlice.reducer;