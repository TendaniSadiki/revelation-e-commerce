import React from 'react';
import { Grid } from '@mui/material';
import { Navbar } from './Navbar';
import AccessoryCard from ''

const Accessories = () => {
    return (
        <>
        <Navbar/>
        <Grid container spacing={2} marginTop={2} marginLeft={8} marginRight={3} >
            <AccessoryCard
            key={data.id}
            image={data.image}
                        name={data.name}
                        price={data.price}
                        rating={data.rating}
            />
        </Grid>
        </>
    )
}