import { createSlice } from '@reduxjs/toolkit';
import shop from '../api/shop'

export const productSlice = createSlice({
    name: 'product', //액션의 이름, product.js에서 connect에서 사용하는 이름 
    initialState: { // 초기상태
        products: []
    },
    reducers: { // Mutations in Vue : 불러낸 값을 저장 한다. 
        setproduct: (state, action) => {
            state.products = action.payload //가져온 값(action.payload)을 위에 정의한 변수 products에 저장
        },
        decrementProductInventory:(state, action) => {
            state.products.find(i => i.id === action.payload.id).inventory--
        }
    }
})
//사용할 reducer 선언
export const { setproduct, decrementProductInventory } = productSlice.actions; 

//actions:  api 갔다오는거
export const fetchProducts = () => dispatch => {
    return new Promise((resolve, reject)=>{
        shop.getProducts((products)=>{
            dispatch(setproduct(products))// reducer를 호출
            resolve()
        })
    })
}

//dispatch

//state에 값을 저장
export default productSlice.reducer;