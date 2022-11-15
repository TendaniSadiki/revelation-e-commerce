import React, { useState, useEffect } from 'react'
import fire, { auth, db } from '../Config/Config'
import { Navbar } from './Navbar'
//import { Products } from './Products'
import { onAuthStateChanged, } from 'firebase/auth'
//import { useNavigate } from 'react-router-dom'
//import { CartProduct } from './CartProduct'
import Hero from './Hero'
import Footer from './Footer'
import Catalogues from './Catalogues'

export const Home = (props) => {
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
    // const [products, setProducts] = useState([])

    // const getProduct = async () => {
    //     // const products = await db.collection('Product').get();
    //     const products = await db.collection('inventorystock').get();

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
    //     getProduct();

    // }, [])
    // let Product;

    // const addToCart = (product) => {
    //     if (uid !== null) {
    //         Product = product;
    //         Product['qty'] = 1;
    //         Product['TotalProductPrice'] = Product.qty * Product.price;
    //         db.collection("Cart" + uid).doc(product.ID).update(Product)
    //         console.log("Successfull Added to Cart")
    //     } else {
    //         props.navigate('login')
    //     }

    // }

    // const helloWorld = () => {
    //     console.log('Hello world')
    // };
    // const addCart = () => {
    //     console.log('Hello world')
    // };

    return (
        <>
            <Navbar user={user} />
            <Hero />
            <Catalogues/>
            {/* {products.length > 0 && (
                <div className='container-fluid'>
                    <h1 className='text-center'>Product</h1>
                    <div className='productBox' >
                        <div>
                            <Products products={products} helloWorld={helloWorld} />


                        </div>

                    </div>
                </div>
            )}
            {products.length < 1 && (
                <div className='container-fluid'>Please wait...</div>
            )} */}
            <Footer/>
        </>
    )
}
