// import React from 'react'
// import { IndividualProduct } from './IndividualProduct'

// export const CartProducts = ({cartProducts, cartProductIncrease, cartProductDecrease}) => {
//   return cartProducts.map((cartProduct)=>(
//     <IndividualProduct key={cartProduct.ID} cartProduct={cartProduct} 
//     cartProductIncrease={cartProductIncrease}
//     cartProductDecrease={cartProductDecrease}/>
//   ))
// }
import React from 'react'
import { IndividualCartProduct } from './IndividualCartProduct'


export const CartProduct = ({CartProduct, addCart}) => {


  return CartProduct.map((individualCartProduct)=>(
    
      <IndividualCartProduct KEY ={individualCartProduct.ID} individualCartProduct={individualCartProduct}
      addCart={addCart}  /> 
    
  ))
}
