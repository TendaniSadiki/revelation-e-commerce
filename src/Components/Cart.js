import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { FaIgloo } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import fire, { auth, db } from '../Config/Config'
import { CartProduct } from './CartProduct'
import { Navbar } from './Navbar'
import { PayStack } from './PayStack'
import { Link } from 'react-router-dom'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { Products } from './Products'
import { doc, updateDoc, increment } from "firebase/firestore";
import { Timestamp } from 'firebase/firestore'
import PaystackPop from '@paystack/inline-js'

export const Cart = () => {
    const navigate = useNavigate();
    const [userObj, setUserObj] = useState({})
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
        useEffect(() => {
            const unbn = onAuthStateChanged(auth, user => {
                if (user) {
                    fire.firestore().collection("user").doc(user.uid).get().then(snapshot => {
                        setUserObj(snapshot.data())
                    })
                } else {
                    setUserObj(null)
                }
            })
            return unbn
        }, [])
        return userObj;
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
                console.log({ ...newCart.data(), ...{ id: newCart.id } })
                cardProduct.push({ ...newCart.data(), ...{ id: newCart.id } })
            })
            setCartProduct(cardProduct)
        })
       
        console.log(cardProduct)
    }, [])
    const paywithpaystack = (e) => {
        // e.preventDefault()
        // console.log("current amount ", amount)
        const paystack = new PaystackPop()
        paystack.newTransaction({
            key: "pk_test_145aacfe44042ba956a6f2039dda1dd7477f95a3",
            amount: overallAmount * 100,
            email: userObj.Email,
            firstName: userObj.FullName,
            lastName: userObj.FullName,
            onSuccess(transaction) {
                let message = `Payment Complete! Reference ${transaction.reference}`
                alert(message);
                db.collection('user').doc(uid).collection('completedOrders').doc(transaction.reference).set({
                    prodList: cartProducts,
                    referenceNumber: transaction.reference,
                    createdAt: Timestamp,
                }).then(() => {
                });
            },
            onCancel() {
                alert("Transaction Cancelled")
            }
        })
        // alert("Successful payment")
    }
    let getPrice = [];
    const checkOut = (overallAmount, prodList) => {
        console.log('prodList: ', prodList);
        navigate('/paystack', { state: { total: overallAmount, prodList: prodList } });
    }
    const handleDecrease = async (res) => {
        const cartQtyRef = doc(db, "cart", res.id);
        await updateDoc(cartQtyRef, {
            qty: increment(-1),
        }).then(() => {
            db.collection("cart").doc(res.id).get().then(async (snapshort) => {
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
    const handleIncrement = async (res) => {
        const cartQtyRef = doc(db, "cart", res.id);
        await updateDoc(cartQtyRef, {
            qty: increment(1),
        }).then(() => {
            db.collection("cart").doc(res.id).get().then(async (snapshort) => {
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
    const handleDelete = (res) => {
        db.collection('cart').doc(res.id).delete().then(() => {
            console.log("document deleted=>", res.id)
        })
    }
    let overallAmount = 0;
    let quantity = 1;
    return (
        <>
        <div style={{background: 'whitesmoke', margin: 0, padding: '3%', justifyContent: 'center'}}>
            <h1 style={{color: 'grey', fontSize: '50px', padding: '0 1%'}}>Cart</h1>
            <Link to='/' style={{textDecoration: 'none', float: 'right', color: 'grey', marginTop: '-80px', marginRight: '1%'}}><h4>Back To Home</h4></Link>
            <div style={{backgroundColor: 'white', padding: '2%', borderRadius: '30px'}}>
            {cartProducts.map(res => {
                    if (res.price) {
                        overallAmount = overallAmount + (parseFloat(res.price) * parseFloat(res.qty));
                        console.log('chek', overallAmount)
                    }
                    if (res.qty > 1) {
                        quantity = (parseFloat(res.qty))
                        console.log("Current Quantity here:", quantity)
                    }
                   
                    return (
                        <div style={{ justifyContent: 'center', marginBottom: '1%', color: 'whitesmoke', display: 'flex', borderBottom: '1px solid grey' }}>
                            <div style={{alignSelf: 'center', padding: '0 10px'}}><img src={res.image} height={200} alt='product-image' /></div>
                            <div style={{color: 'grey', fontSize: '17px', fontWeight: '400', padding: '0 10%'}}>
                                <p>Product Name: {res.prodName}</p>
                                <p>Category: {res.brandCategory}</p>
                                <p>Product Type: {res.prodType}</p>
                                <p>Colour: {res.colour}</p>
                                <p>Size: {res.size}</p>
                                <p>Product code: {res.productCode}</p>
                                <p>Unit Price: R{res.price}</p>
                                <p>Product Total: R{res.price * res.qty}</p>
                                
                            </div>
                            <div style={{paddingLeft: '1%', display: 'flex', color: 'grey', fontWeight: '400', height: '50%', paddingTop: '2%'}}>
                                <button><FaMinusCircle size={25} color={'grey'} onClick={(v) => handleDecrease(res)}/></button>
                                <p style={{padding: '0 20px'}}>{res.qty}</p>
                                <button><FaPlusCircle onClick={(v) => handleIncrement(res)} size={25} color={'grey'} /></button>
                                <button style={{marginLeft: '10px'}}><RiDeleteBin5Line onClick={(v) => handleDelete(res)} size={30} color={'grey'} /></button>
                            </div>
                            
                        </div>
                    )
                })}
                <p style={{color: 'grey', fontSize: '22px', fontWeight: '400'}}>Customer Name: {userObj.FullName}</p>
                <p style={{color: 'grey', fontSize: '22px', fontWeight: '400'}}>Cart Total : R {overallAmount}</p>
                <button 
                onClick={() => paywithpaystack(overallAmount, cartProducts)}
                style={{border: '1px solid transparent', backgroundColor: ' grey', fontSize: '18px', justifyContent: 'center', padding: '1%', width: '20%', color: 'whitesmoke', fontWeight: '500', alignSelf: 'center', margin: '2%', cursor: 'pointer'}}>
                    Checkout
                </button>
            </div>
           </div>
        </>
    )
}



