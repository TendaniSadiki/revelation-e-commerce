import {  Card, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate} from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from 'react'
import { db } from '../../../Config/Config';

const AccessoryCard = (props) =>{

    const[productName, setProductName]= useState([]);
    const[productDescription, setProductDescription]= useState([]);
    const [prodList,setprodList] =useState([]);
    const [stock, setStock] = useState([]);
    const navigate = useNavigate();

    const handleNav = () => {
        navigate('/productView')
    }

    const Cart = () => {
        navigate('/cart')
    }

    useEffect(() => {
        getDocs(collection(db, "inventorystock/")).then((res) => {

            res.forEach((doc) => {
                getDocs(collection(db, "inventorystock/" , doc.id, 'colours')).then((response) => {
                    let coloursList =[];

                    response.forEach((e) => {
                        coloursList.push(e.data())
                    })
                    setprodList(item=>[...item,Object.assign(doc.data(), {coloursList: coloursList})]);

                    console.log('Colours: ', prodList)

                },[]);


            });
            console.log('Colours:test ', prodList)
            setStock(prodList)
        });
    }, []);
    return(
        <div key={props.id}>
            <Grid item xs={20} md={20} lg={12} padding={1}>
                
                    {prodList.map((id,index)=>{
                        console.log("===========",id);
                        return(
                            <Card sx={{ maxWidth: 220}} padding={10} className='productCard'  key={id}>{index + 1}
                            <CardMedia
                                component="img"
                                height="194"
                                src={id.image} 
                            
                                alt="Paella d ish"
                                onClick={handleNav}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                {id.prodName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                R{props.price}
                                </Typography>
                                </CardContent>
                                    <CardActions disableSpacing>
                                        <IconButton aria-label="add to favorites">
                                        <FavoriteIcon />
                                        </IconButton>
                                        <IconButton aria-label="share" onClick={Cart}>
                                        <ShoppingCartIcon />
                                        </IconButton>
                                    </CardActions>
               
                            </Card>
                        )
                    })}
                
            </Grid>
        </div>
    )
}

export function AccessoryCard