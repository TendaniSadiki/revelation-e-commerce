import React, { useState, useEffect } from 'react'
import fire, { auth } from '../Config/Config'
import { onAuthStateChanged, } from 'firebase/auth'
import { Navbar } from './Navbar'


export default function About() {
  function GetUserUid() {
    const [uid, setUid] = useState(null);
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setUid(user.uid);
            }
        })
    }, [])
    return uid;
}
const uid = GetUserUid();
function GetCurrentUser() {
    const [user, setUser] = useState(null)
    useEffect(() => {
        const unbn = onAuthStateChanged(auth, user => {
            if (user) {
                fire.firestore().collection("user").doc(user.uid).get().then(snapshot => {
                    setUser(snapshot.data().FullName)
                })
            } else {


                setUser(null)
            }
        })
        return unbn
    }, [])
    return user;


}
const user = GetCurrentUser()

  return (
    <>
        <Navbar user={user} />
        <div className="Staticpages">
          <h1 className='Heading'>About Revelation</h1>
          <div className='Info-section'>
            <p>Revelation Productions, Registration Number: 2018/369879/07 T/A Revelation Productions.</p>
            <p>
              It was formed in 2018 by its founders, Lebogang Moalusi and Lerato Moalusi, as a part of the rebranding of the company, “Baby Bonolo Creations”. The company that created a baby character named
              “Bonolo” to design and manufacture a kiddies clothing line and accessories.
            </p>  
            <p>
              The company was rebranded to increase the scope of the business and develop into a general
              supply of promotional clothing and equipment, uniforms, PPE, and general office supplies.
            </p>
            <p>
              Revelation Productions is a developing company, with a network of suppliers for sourcing materials as
              well as clothing manufacturing.
              We work closely with our clients to ensure quality and brand satisfaction.
            </p>
          </div>
        </div>
    </>
  )
}
