import React from 'react';
import { Grid } from '@mui/material';
import { Navbar } from '../../Navbar';
import AccessoryCard from './AccessoryCard';
import { identity } from 'underscore';

const Accessories = () => {
    return (
        <>
        <Navbar/>
        <Grid container spacing={2}  marginTop={2}  marginLeft={10} marginRight={3}>
        <AccessoryCard
        key={id.}/>
        </Grid>
           
       
        </>
    )
}

export default Accessories;