import React, { useState, useEffect } from 'react'
import fire, { auth, db } from '../Config/Config'
import { Products } from './Products'
import { onAuthStateChanged, } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
//import { CartProduct } from './CartProducts'
//import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
//import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(2),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }))

const Accessories = () => {
    return (
        <>
           <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(Array(3)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
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
                <div className='container-fluid'>Please wait...</div>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
        </>
    )
}

export default Accessories;