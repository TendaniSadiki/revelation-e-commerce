import React from 'react';
import { Grid } from '@mui/material';
import { Navbar } from '../../Navbar';
import AccessoryCard from './AccessoryCard';

const Accessories = () => {
    return (
        <>
        <Navbar/>
        <Grid container spacing={2}  marginTop={2}  marginLeft={5} marginRight={3} >
        <AccessoryCard/>
        
           
       
        </>
    )
}

export default Accessories;