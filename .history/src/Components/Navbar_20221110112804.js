import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {FaShoppingCart} from 'react-icons/fa'
import fire from '../Config/Config'
import './Navbar.css'

// import{log} from '../image/logo.jpg'
export const Navbar = ({user}) => {
    const navigate = useNavigate()
    const handleLogout=()=>{
        fire.auth().signOut().then(()=>{
            navigate('login')
        })
    }
  return (
    <div className='navbar'>
    <div className='leftside'>
         {/* <img src={logo} ></img> */}
         <h1>Revelation</h1>
         <h4><Link to='/'>Home</Link></h4>
         <h4><Link to='/summer'>Summer</Link></h4>
         <h4><Link to='/winter'>Winter</Link></h4>
         <h4><Link to='/accessories'>Accessories</Link></h4>
         <h4><Link to='/sale'>Sale</Link></h4>
    </div>
    <div className='rightside'>
        {!user&&<>
            <div><Link className='navlink' to="/signup">Sign up</Link></div>
        <div><Link className='navlink'to="/login">Login</Link></div>
        </>
        }
{user&&<>

<div><Link className ="navlink" to='/'>{user}</Link></div>
<div className="cart-menu-btn">
    <Link className ="navlink" to='/cart'><FaShoppingCart size={20}/></Link>
    
    {/* <span className='cart-indicator'>{totalQty}</span> */}

</div>
<div className='btn btn-danger btn-md' onClick={handleLogout}>LOGOUT

</div>
</>

}
    </div>
    
    </div>
  )
}
