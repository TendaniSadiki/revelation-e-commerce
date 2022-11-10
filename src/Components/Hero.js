import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterestP } from "react-icons/fa";
import Slider from './Slider';
import './Hero.css';

export default function Hero() {
  return (
    <>
      <div className='hero-container'>
            <div className='socials-list'>
                <ul>
                    <li><a href='https://www.facebook.com' target='_blank' rel='noreferrer'><FaFacebookF/></a></li>
                    <li><a href='https://www.instagram.com' target='_blank' rel='noreferrer'><FaInstagram /></a></li>
                    <li><a href='https://www.twitter.com' target='_blank' rel='noreferrer'><FaTwitter /></a></li>
                    <li><a href='https://www.pinterest.com' target='_blank' rel='noreferrer'><FaPinterestP /></a></li>
                </ul>
            </div>
            <Slider className='slider'/>
      </div>
    </>
  )
}
