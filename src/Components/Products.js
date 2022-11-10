import React from 'react'
import { IndividualProduct } from './IndividualProduct'

export const Products = ({products, helloWorld}) => {


  return products.map((individualProduct)=>(
    
      <IndividualProduct KEY ={individualProduct.ID} individualProduct={individualProduct}
      helloWorld={helloWorld}  /> 
    
  ))
}