import React from 'react';
import { Grid } from '@mui/material';
import { Navbar } from '../../Navbar';
import AccessoryCard from './AccessoryCard';

const Accessories = () => {
    return (
        <>
        <Navbar/>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
        <AccessoryCard/>
        </Grid>
           
       
        </>
    )
}

export default Accessories;