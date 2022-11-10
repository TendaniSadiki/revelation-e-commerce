import React, { useState, useEffect } from 'react'
import fire, { auth } from '../Config/Config'
import { onAuthStateChanged, } from 'firebase/auth'
import { Navbar } from './Navbar'


export default function FAQS() {

   
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
            <h1 className='Heading'>Frequently Asked Questions</h1>
            <div className='Info-section'>
                <h3 className='ques'>How do I return a defective or faulty product?</h3>
                <p className='ans'>We stand behind all of our Clothes and gear. If your product is defective or faulty and it's been more than 30 days since your purchase, start a return and send your item back.</p>
                <h3 className='ques'>How do I return a Revelation purchase?</h3>
                <p className='ans'>Purchases made at the Revelation e-commerce store must be returned to the store. Please note that our store returns policies may differ from our online returns policies. Make sure that you ask the store if you have questions about their policies.</p>
                <h3 className='ques'>How do I cancel an order?</h3>
                <p className='ans'>You are entitled to cancel your order prior to the point at which you confirm your order purchase, if you go pass that point and you want to cancel the order, you should not pay the amount required to process your order, a consultant will contact you after a few days of not making the payment to confirm the order cancellation process. Should you wish to return the product thereafter, you can do so in accordance with our Returns Policy.</p>
            </div>
        </div>
  </>
  )
}
