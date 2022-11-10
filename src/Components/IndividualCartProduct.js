// import React from 'react'
// import { auth, db } from '../Config/Config'

// export const IndividualCartProduct = ({cartProduct,cartProductIncrease,cartProductDecrease}) => {
//     const handleProductIncrease=()=>{
//         cartProductIncrease(cartProduct)
//     }
//     const handleProductDecrease=()=>{
//         cartProductDecrease(cartProduct)
//     }
//     const handleDelete=()=>{
//          auth.onAuthStateChanged(user=>{
//             if(user){
//                 db.collection('Cart'+ user.uid).doc(cartProduct.ID).delete().then(()=>{

//                 })
//             }
//          })
//     }
//   return (
//     <div className='product'>
//     <div className='product-img'>
//      <img src={cartProduct.cartProduct.productImage} alt='product-image' />
//      </div>
//      <div className='product-name'>{cartProduct.cartProduct.productName}</div>
//      <div className='product-desccription'>{cartProduct.cartProduct.productDescription}</div>
//      <div className='product-price'>R{cartProduct.cartProduct.productPrice}</div>
//      <span>Quantity</span>
//      <div className='product-text quantity-box'>
//          <div className='actio-btns minus' onClick={handleProductDecrease}>
//              <button><FiMinusCircle size={20}/></button>
//          </div>
//          <div>{CartProduct.qty}</div>
//          <div className='actio-btns plus' onClick={handleProductIncrease}>
//              <button><FiPlusCircle size={20}/></button>
//          </div>
//      </div>
//      <div className='product-text cart-price'>R{cartProduct.cartProduct.TotalPrice}</div>
//      <div className='btn btn-danger btn-md cart-btn' onClick={handleDelete}>ADD CART</div>
//      </div>
//   )
// }

import React from 'react'
import { useNavigate } from 'react-router-dom';

export const IndividualCartProduct = (individualCartProduct, ID) => {
    console.log(individualCartProduct)
    const navigate = useNavigate();
    const addCart = (id) => {
        navigate('/cart', { state: { id: id, object: individualCartProduct.individualCartProduct } });

        console.log('Hi from cart', id)

    };
  
    // const handleAddToCart = () => {
    //     addCart(individualCartProduct.addCart)
    // }

    return (
        <div className='product'>
            <div className='product-img'>
                <img src={individualCartProduct.individualCartProduct.image} height={100} alt='product-image' />
            </div>
            <div className='product-name'>{individualCartProduct.individualCartProduct}</div>
            <div className='product-desccription'>{individualCartProduct.individualCartProduct.individualCartProduct}</div>
            <div className='product-colour'>{individualCartProduct.individualCartProduct.individualCartProduct}</div>
            {/* <div className='product-price'>R{individualProduct.individualProduct.productPrice}</div> */}

            <div className='btn btn-danger btn-md cart-btn' onClick={() => addCart(individualCartProduct.individualCartProduct.ID)}>cart </div>
            
            


            {/* <div className='product-img'>
                <img src={individualProducts.url} alt='product-image' />
            </div>
            // {individualProducts.productName}</div>
            >{individualProducts.productDescription}</div>
            <div className='product-desccription'>R{individualProducts.productPrice}</div>
            */}

        </div>
    )
}
