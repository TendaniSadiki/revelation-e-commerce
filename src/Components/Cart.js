
// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { db } from '../Config/Config';


// export const Cart = () => {
//   const [cart, setCart] = useState([])
//   const [products, setProducts] = useState([])
//   const getCart = async () => {
//     // const products = await db.collection('Product').get();
//     const products = await db.collection('cart').get();

//     const productArray = [];
//     for (var snap of products.docs) {
//         var data = snap.data();
//         data.ID = snap.id;

//         productArray.push({
//             ...data
//         })
//         if (productArray.length === products.docs.length) {
//             setProducts(productArray)


//         }

//     }

// }
// const navigate = useNavigate()
// useEffect(() => {
//     getCart();

// }, [])
// let Product;
//  return(
//  <div>
// <h1>Cart</h1>
// <div>
//   {
//     products.map((product, inx)=>{

//      console.log(product.ID);
// <div key={inx} >
//       <h5 >{product.price}</h5>
//       <h5 >{product.ID}</h5>
// </div>
//     })
//   }
// </div>

//  </div>
//  )
// }

import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { FaIgloo } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import fire, { auth, db } from '../Config/Config'
import { CartProduct } from './CartProduct'
import { Navbar } from './Navbar'
import { PayStack } from './PayStack'
import { Link } from 'react-router-dom'


import { Products } from './Products'

export const Cart = () => {
    function GetUserUid() {
        const [uid, setUid] = useState(null);
        useEffect(() => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    setUid(user.uid);
                }
            })
        }, [])
        return uid;
    }
    const uid = GetUserUid();
    console.log(uid)
    function GetCurrentUser() {
        const [user, setUser] = useState(null)
        useEffect(() => {
            const unbn = onAuthStateChanged(auth, user => {
                if (user) {
                    fire.firestore().collection("user").doc(user.uid).get().then(snapshot => {
                        setUser(snapshot.data().FullName)
                    })
                } else {


                    setUser(null)
                }
            })
            return unbn
        }, [])
        return user;


    }
    const user = GetCurrentUser()
    const addCart = () => {
        console.log('Hello world')
    };
    // const [products, setProducts] = useState([])

    //   const getProduct = async () => {
    //       // const products = await db.collection('Product').get();
    //       const products = await db.collection('cart').get();

    //       const productArray = [];
    //       for (var snap of products.docs) {
    //           var data = snap.data();
    //           data.ID = snap.id;

    //           productArray.push({
    //               ...data
    //           })
    //           if (productArray.length === products.docs.length) {
    //               setProducts(productArray)


    //           }

    //       }

    //   }
    //   const navigate = useNavigate()
    //   useEffect(() => {
    //       getProduct();

    //   }, [])
    //   let Product;

    //   const addToCart = (product) => {
    //       if (uid !== null) {
    //           Product = product;
    //           Product['qty'] = 1;
    //           Product['TotalProductPrice'] = Product.qty * Product.price;
    //           db.collection("Cart" + uid).doc(product.ID).update(Product)
    //           console.log("Successfull Added to Cart")
    //       } else {
    //           navigate('login')
    //       }

    //   }

    //   const helloWorld = () => {
    //       console.log('Hello world')
    //   };
    //   const addCart = () => {
    //       console.log('Hello world')
    //   };
    //   const qty = CartProducts.map(cartProduct =>{
    //     return cartProduct.qty;
    //   })
    //   const reduceOfQty=(accumulator, currentValue)=>accumulator+currentValue;
    //   const totalQty= qty.reduce(reduceOfQty,0)

    //   const cartProductIncrease=(cartProduct)=>{
    //     Product = cartProduct;
    //     Product.qty= Product.qty+1
    //     //Product.TotalProductPrice= Product.qty*Product.price;
    // }
    //   const cartProductDecrease=(cartProduct)=>{
    //     Product = cartProduct;
    //     Product.qty= Product.qty-1
    //     //Product.TotalProductPrice= Product.qty*Product.price;
    //   }




    //state of the cart
    const [cartProducts, setCartProduct] = useState([])

    // getting cart product from the firestore collection and updating the state
    const cardProduct = []
    useEffect(() => {
        // auth.onAuthStateChanged(user=>{
        //     if(user){
        db.collection("cart").where('uid', '==', uid).onSnapshot(snapshort => {
            snapshort.forEach(newCart => {
                console.log(newCart.data())
                cardProduct.push(newCart.data())
            })

            // const newCartProduct = snapshort.doc.map((doc)=>({
            //     ID: doc.id,
            //     ...doc.data(),


            // }));

            // console.log(cardProduct)
            setCartProduct(cardProduct)

        })
        //     }else{
        //         console.log("user is not signed in to retive cart")
        //     }
        // })
        console.log(cardProduct)
    }, [])




    // const [products, setProducts] = useState([])

    // const getProduct = async () => {
    //     // const products = await db.collection('Product').get();
    //     const products = await db.collection('cart').get();

    //     // const productArray = [];
    //     for (var snap of cardProduct.docs) {
    //         var data = snap.data();
    //         data.ID = snap.id;

    //         cartProducts.push({
    //             ...data
    //         })
    //         if (cartProducts.length === cartProducts.docs.length) {
    //             setProducts(cartProducts)


    //         }

    //     }

    // }
    // console.log(cardProduct)
    // const qty = cartProducts.map(cartProduct =>{
    // return cartProduct.qty
    // })
    // const reduceOfQty =(accumulator, currntValue)=>accumulator+currntValue;
    // // const totalQty =qty.reduce(reduceOfQty,0)
    // const price = cartProducts.map((cartProduct)=>{
    // return cartProduct.TotalProductPrice
    // })
    // const reduceOfPrice =(accumulator, currntValue)=>accumulator+ currntValue;
    // const totalPrice = price.reduce(reduceOfPrice,0);
    // let Product ;
    // const cartProductIncrease=(cardProduct)=>{
    //     Product = cardProduct;
    //     Product.qty=Product.qty+1;
    //     Product.TotalProductPrice = Product.qty*Product.price;
    //     auth.onAuthStateChanged(user=>{
    //         if(user){
    //             db.collection('cart'+ user.uid).doc(cardProduct.ID).update(Product).then(()=>{
    //                 console.log("Increment!!")
    //             })
    //         }else{
    //             console.log("user is not logged in to increament")
    //         }
    //     })
    // }
    // const cartProductDecrease=(cardProduct)=>{
    //     Product = cardProduct;
    //     if(Product.qty>1)
    //     Product.qty=Product.qty-1;
    //     Product.TotalProductPrice = Product.qty*Product.price;
    //     auth.onAuthStateChanged(user=>{
    //         if(user){
    //             db.collection('cart'+ user.uid).doc(cardProduct.ID).update(Product).then(()=>{
    //                 console.log("Decrement!!")
    //             })
    //         }else{
    //             console.log("user is not logged in to increament")
    //         }
    //     })
    // }
    //   return (
    //     <>
    //     <Navbar user={user}/>
    //     {cardProduct.length>0 &&(
    //         <div className='container-fluid'>
    //         <h1 className='text-center'>Cart</h1>
    //         <div className='products-box'>

    //             {/* <CartProducts cardProduct={cardProduct}
    //                 cartProductIncrease={cartProductIncrease}
    //                 cartProductDecrease={cartProductDecrease}
    //             /> */}
    //         </div>

    //         <div className='summery-box'>
    //         <h5>Cart Summary</h5>
    //         <br></br>
    //         <div>
    //             Total No of Product:<span>{totalQty}</span>
    //         </div>
    //         <div>
    //             Total Price to Pay:<span>R{totalPrice}</span>
    //         </div>
    //         </div>
    //         </div>
    //     )
    //     }

    //     {cardProduct.length<1 &&(
    //         <div className='container-fluid'>No Products to show</div>


    //     )
    //     }
    //            {/* <Products products={products} helloWorld={helloWorld} /> */}
    //     </>
    //   )
    return (
        <>Cart
        
            <div>
                {cartProducts.map(res => {
                    return (
                        <div style={{background: 'blue', margin: 8, color:'whitesmoke'}}>
                              <img src={res.image} height={100} alt='product-image' />
                            <p>{res.brandCategory}</p>
                            <p>{res.prodType}</p>
                            <p>{res.prodName}</p>
                            <p>{res.prodDiscription}</p>
                            <p>R{res.price}</p>
                            <p>{res.colour}</p>
                            <p>{res.size}</p>
                            <p>{res.productCode}</p>
                
                        </div>
                        
                    )
                })}
                  <h4><Link to='/paystack'>Checkout</Link></h4>  
            </div>
            {/* */}
        </>
    )
}
