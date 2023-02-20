import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {FaShoppingCart, FaRegHeart} from 'react-icons/fa'
import {GiExitDoor} from 'react-icons/gi'
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
         <h4><Link to='/' className='navlink'>Home</Link></h4>
         <h4><Link to='/about' className='navlink'>About</Link></h4>
         <h4><Link to='/terms' className='navlink'>Terms</Link></h4>
         <h4><Link to='/faqs' className='navlink'>FAQs</Link></h4>
         <h4><Link to='/disclaimer' className='navlink'>Disclaimer</Link></h4>
    </div>
    <div className='rightside'>
        {!user&&<>
            <div className='logs'>
                <h4><Link className='navlink proflink' to="/signup">Sign up</Link></h4>
                <h4><Link className='navlink proflink'to="/login">Login</Link></h4>
                </div>
        
        </>
        }
{user&&<>

<div></div>
<div className="cart-menu-btn">
<Link className ="navlink" to='/'>{user}</Link>
    <Link className ="navlink" to='/cart'><FaRegHeart size={20}/></Link>
    <Link className ="navlink" to='/cart'><FaShoppingCart size={20}/></Link>
    <Link className="navlink" to='/order'>Order</Link>
    <Link className ="navlink"><GiExitDoor size={25}onClick={handleLogout} /></Link>
    {/* <span className='cart-indicator'>{totalQty}</span> */}

</div>

</>

}
    </div>
    
    </div>
  )
}
