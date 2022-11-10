import React from 'react';
import { Grid } from '@mui/material';
import { Navbar } from '../';
import AccessoryCard from './AccessoryCard';

const Accessories = () => {
    return (
        <>
        <Navbar/>
        <Grid container spacing={2} marginTop={2} marginLeft={8} marginRight={3} >
            <AccessoryCard/>
        </Grid>
        </>
    )
}