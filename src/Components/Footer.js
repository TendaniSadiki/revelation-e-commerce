import React from 'react'
import {HiOutlineMailOpen} from "react-icons/hi";
import {FiPhoneCall} from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterestP } from "react-icons/fa";
import './Footer.css';

export default function 
() {
  return (
    <div className='footer'>
        <div className='info'>
            <h3>Physical Address</h3>
            <p>1834 Vuzane Street<br/> Dobsonville(SA) <br/> 1863</p>
        </div>
        <div className='info'>
            <h3>Contact Us Directly</h3>
            <div >
                <span><FiPhoneCall size={20}/></span>
                <a href="tel:+27101091750">(010)109 1750</a>
            </div>
            <div>
                <span><HiOutlineMailOpen size={20}/></span>
                <a href="lebo@faithrevelation.co.za">lebo@faithrevelation.co.za</a>
            </div>
        </div>
        <div className='info'>
            <h3>Connect On Social Media</h3>
            <ul>
                <li><a href='https://www.facebook.com' target='_blank' rel='noreferrer'><FaFacebookF/>Revelation SA</a></li>
                <li><a href='https://www.instagram.com' target='_blank' rel='noreferrer'><FaInstagram />@Revelation_estoreZA</a></li>
                <li><a href='https://www.twitter.com' target='_blank' rel='noreferrer'><FaTwitter />@Revelation_estoreZA</a></li>
                <li><a href='https://www.pinterest.com' target='_blank' rel='noreferrer'><FaPinterestP />Revelation_ZA</a></li>
            </ul>
        </div>

    </div>
  )
}
