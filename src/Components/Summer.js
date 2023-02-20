import React, { useState, useEffect } from 'react'
import fire, { auth, db } from '../Config/Config'
import { Products } from './Products'
import { onAuthStateChanged, } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
//import { CartProduct } from './CartProducts'
import './CardStyle.css';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const Summer = (props) => {
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
        const products = await db.collection('inventorystock').where('brandCategory', '==', 'Summer').get();
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
            props.navigate('login')
        }
    }
    const helloWorld = () => {
        console.log('Hello world')
    };
    const addCart = () => {
        console.log('Hello world')
    };
    return (
        <>
         
    <Box sx={{ flexGrow: 1 }} marginLeft={4}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 20 }}>
        {Array.from(Array(5)).map((_, index) => (
          <Grid item xs={4} sm={4} md={4} marginTop={2}>
            {products.length > 0 && (
                <div className='container-fluid'>
                    <div className='productBox' >
                        <div>
                            <Products products={products} helloWorld={helloWorld} />
                        </div>
                    </div>
                </div>
            )}
            {products.length < 1 && (
                <div className='container-fluid'>
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                </div>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
        </>
)}

 
export default Summer;
