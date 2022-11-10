import {  Card, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate} from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from 'react'
import { db } from '../../../Config/Config';

const AccessoryCard = (props) =>{

    const[productName, setProductName]= useState();
    const[productDescription, setProductDescription]= useState();

    const navigate = useNavigate();

    const handleNav = () => {
        navigate('/productView')
    }

    const Cart = () => {
        navigate('/cart')
    }

    useEffect(() => {
        getDocs(collection())
    })
    return(
        <div key={props.id}>
            <Grid item xs={20} md={20} lg={12} padding={1}>
                <Card sx={{ maxWidth: 220}} padding={10} className='productCard'>
                <CardMedia
                    component="img"
                    height="194"
                    src={props.image} 
                
                    alt="Paella d ish"
                    onClick={handleNav}
                />
                <CardContent>
                <Typography variant="body2" color="text.secondary">
                {props.name}
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
            </Grid>
        </div>
    )
}