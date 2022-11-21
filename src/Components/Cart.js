


import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { FaIgloo } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import fire, { auth, db } from '../Config/Config'
import { CartProduct } from './CartProduct'
import { Navbar } from './Navbar'
import { PayStack } from './PayStack'
import { Link } from 'react-router-dom'
import { doc, updateDoc, increment } from "firebase/firestore";
import {FaMinusCircle, FaPlusCircle} from 'react-icons/fa'
import {RiDeleteBin5Line} from 'react-icons/ri'

import { Products } from './Products'

export const Cart = () => {
    const navigate = useNavigate();
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
    //state of the cart
    const [cartProducts, setCartProduct] = useState([])
    // getting cart product from the firestore collection and updating the state
    const cardProduct = []
    useEffect(() => {
        // auth.onAuthStateChanged(user=>{
        //     if(user){
        db.collection("cart").where('uid', '==', uid).onSnapshot(snapshort => {
            snapshort.forEach(newCart => {
                console.log({...newCart.data(), ...{id: newCart.id}})
                cardProduct.push({...newCart.data(), ...{id: newCart.id}})
            })
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
    let getPrice=[];
    const checkOut =(overallAmount) => {
        navigate('/paystack', {state:{total:overallAmount}});
        
    }
    const handleDecrease = async (res)=>{
        const cartQtyRef = doc(db, "cart", res.id);
            await updateDoc(cartQtyRef, {
                qty: increment(-1),
            }).then(() => {
                db.collection("cart").doc(res.id).get().then(async(snapshort) => {
                    console.log('hello', snapshort.data())
                await updateDoc(cartQtyRef, {
                    total: parseFloat(snapshort.data().qty) * parseFloat(snapshort.data().price)
                }).then(() => {
                    console.log('Increment done!')
                });
            }).catch(er => {
                console.log(er.message)
            });
        });
    }
    const handleIncrement = async (res)=>{
        const cartQtyRef = doc(db, "cart", res.id);
            await updateDoc(cartQtyRef, {
                qty: increment(1),
            }).then(() => {
                db.collection("cart").doc(res.id).get().then(async(snapshort) => {
                    console.log('hello', snapshort.data())
                await updateDoc(cartQtyRef, {
                    total: parseFloat(snapshort.data().qty) * parseFloat(snapshort.data().price)
                }).then(() => {
                    console.log('Increment done!')
                });
            }).catch(er => {
                console.log(er.message)
            });
        });
    }
    const handleDelete=(res)=>{
        db.collection('cart').doc(res.id).delete().then(()=>{
            console.log("document deleted=>", res.id)
            
        })
      }
    //   const handleUpdateDelete=(res)=>{
    //     db.collection('cart').doc(res.id).where("qty", "===","0").delete().then(()=>{
    //         console.log("Item deleted", res.id)
    //     })
    //   }
    let overallAmount = 0;
    let quantity = 1;
    return (
        <>Cart
            <div>
                {cartProducts.map(res=> {
                      if (res.price){
                      overallAmount = overallAmount + (parseFloat(res.price) * parseFloat(res.qty));
                      console.log('chek', overallAmount)
                      }
                       if(res.qty>1){
                    quantity = (parseFloat(res.qty))
                    console.log("Current Quantity here:",quantity)
                  }
                //     const getTotalAmount=()=>{
                //      let getAmount = res.price;
                //      let getQty = res.qty;
                //      let totalPrice = getAmount*getQty
                //      console.log("this is the total ",totalPrice)
                //      return {totalPrice};
                //     }
                //    console.log(getTotalAmount())

                    return (
                        <div style={{background: 'whitesmoke', margin: 8, color:'grey', display: 'flex'}}>
                           <div style={{padding:'2%'}}><img src={res.image} height={280} alt='product-image' /></div>
                            <div style={{marginLeft: '10%',marginTop: '1%', fontSize: '20px', fontWeight: '500', borderLeft: '1px solid grey', paddingLeft: '2%', marginBottom: ' 1%' }}>
                            <p>{res.brandCategory}</p>
                            <p>{res.prodType}</p>
                            <p>{res.prodName}</p>
                            <p>{res.prodDiscription}</p>
                            <p>R{res.price}</p>
                            <p>R{res.price * res.qty}</p>
                            <p>{res.colour}</p>
                            <p>{res.size}</p>
                            <p>{res.productCode}</p>
                            <p><button onClick={(v) =>handleDecrease(res)}style={{background:'red'}}><FaMinusCircle size={20} /></button>Quantity:{res.qty}<button onClick={(v) =>handleIncrement(res)}style={{background:'green'}}>
                            <FaPlusCircle size={20}/></button>
                            <button onClick={(v)=>handleDelete(res)} style={{background:'red'}}><RiDeleteBin5Line size={20}/></button></p>
                            </div>
                        </div>
                        
                    )
                })}
                <button 
                style={{border: '1px solid transparent', backgroundColor: ' grey', fontSize: '18px', justifyContent: 'center', padding: '1%', width: '20%', color: 'whitesmoke', fontWeight: '500', alignSelf: 'center', margin: '2%', cursor: 'pointer'}}
c                onClick={() => checkOut(overallAmount)}>Checkout</button>

                                {/* <Link to={{
                    pathname: `/paystack`,
                    state: {amount: 'amount'}
                }} >Checkout </Link> */}
                {/* <h4><Link to={`/paystack:${'hello'}`}>Checkout</Link></h4> */}

                  {/* <h4><Link to={`/paystack`}>Checkout</Link></h4>   */}
            </div>
            {/* */}
        </>
    )
}
