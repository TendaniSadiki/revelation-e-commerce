
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
import { useNavigate } from 'react-router-dom'
import fire, { auth, db } from '../Config/Config'
import { Navbar } from './Navbar'
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
  const [products, setProducts] = useState([])

  const getProduct = async () => {
      // const products = await db.collection('Product').get();
      const products = await db.collection('cart').get();

      const productArray = [];
      for (var snap of products.docs) {
          var data = snap.data();
          data.ID = snap.id;

          productArray.push({
              ...data
          })
          if (productArray.length === products.docs.length) {
              setProducts(productArray)


          }

      }

  }
  const navigate = useNavigate()
  useEffect(() => {
      getProduct();

  }, [])
  let Product;

  const addToCart = (product) => {
      if (uid !== null) {
          Product = product;
          Product['qty'] = 1;
          Product['TotalProductPrice'] = Product.qty * Product.price;
          db.collection("Cart" + uid).doc(product.ID).update(Product)
          console.log("Successfull Added to Cart")
      } else {
          navigate('login')
      }

  }

  const helloWorld = () => {
      console.log('Hello world')
  };
  const addCart = () => {
      console.log('Hello world')
  };
  return (
    <div>
        <Navbar user={user} />
        <h1>Cart</h1>
           <Products products={products} helloWorld={helloWorld} />
    </div>
  )
}
