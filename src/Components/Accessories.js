import React from 'react';
import { Grid } from '@mui/material';
import AccessoryCard from './AccessoryCard';

const Accessories = () => {
    return (
        <>
        <Grid container spacing={2}  marginTop={2}  marginLeft={5} marginRight={3} >
        <AccessoryCard/>
        </Grid>
           
       
        </>
    )
}

export default Accessories;