import React from 'react'
import { useNavigate } from 'react-router-dom';

export const IndividualProduct = (individualProduct, ID) => {
    console.log(individualProduct)
    const navigate = useNavigate();
    const helloWorld = (id) => {
        navigate('/product-view', { state: { id: id, object: individualProduct.individualProduct } });

        console.log('Hello world', id)

    };
  
    const handleAddToCart = () => {
        helloWorld(individualProduct.helloWorld)
    }

    return (
        <div className='product'>
            <div className='product-img'>
                <img src={individualProduct.individualProduct.image} height={100} alt='product-image' />
            </div>
            <div className='product-name'>{individualProduct.individualProduct.prodName}</div>
            <div className='product-desccription'>{individualProduct.individualProduct.prodDescription}</div>
            {/* <div className='product-price'>R{individualProduct.individualProduct.productPrice}</div> */}

            <div className='btn btn-danger btn-md cart-btn' onClick={() => helloWorld(individualProduct.individualProduct.ID)}>Prodcut Preview </div>
            
            


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
