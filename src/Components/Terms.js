import React, { useState, useEffect } from 'react'
import fire, { auth } from '../Config/Config'
import { onAuthStateChanged, } from 'firebase/auth'
import { Navbar } from './Navbar'

export default function Terms() {
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
      <h1 className='Heading'>Terms and Conditions</h1>
      <div className='Info-section'>
        <p className='ans'>These terms and conditions outline the rules and regulations for the use of Revelation's Website.</p>
        <p className='ans'>By accessing this website we assume you accept these terms and conditions in full. Do not continue to use Revelation's website if you do not accept all of the terms and conditions stated on this page.</p>
        <p className='ans'>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and any or all Agreements: "Client", "You" and "Your" refers to you, the person accessing this website and accepting the Company's terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves, or either the Client or ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner, whether by formal meetings of a fixed duration, or any other means, for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services/products, in accordance with and subject to, prevailing law of South Africa. Any use of the above terminology or other words in the singular, plural, capitalisation and/or he/she or they, are taken as interchangeable and therefore as referring to same.</p>
        <h3 className='ques'>Cookies</h3>
        <p className='ans'>By using Revelation's website you consent to the use of cookies in accordance with Broken Stool's privacy policy.</p>
        <p className='ans'>Most of the modern day interactive web sites use cookies to enable us to retrieve user details for each visit. Cookies are used in some areas of our site to enable the functionality of this area and ease of use for those people visiting. Some of our affiliate / advertising partners may also use cookies.</p>
        <h3 className='ques'>License</h3>
        <p className='ans'>Unless otherwise stated, Revelation and/or it's licensors own the intellectual property rights for all material on Revelation. All intellectual property rights are reserved. You may view and/or print pages from https://revelation.co.za for your own personal use subject to restrictions set in these terms and conditions.</p>
        <p className='ans'>You must not:</p>
        <ul>
          <li className='ans'>Republish material from https://revelation.co.za</li>
          <li className='ans'>Sell, rent or sub-license material from https://revelation.co.za</li>
          <li className='ans'>Reproduce, duplicate or copy material from https://revelation.co.za</li>
        </ul>
        <p className='ans'>Redistribute content from Revelation (unless content is specifically made for redistribution).</p>
        <h3 className='ques'>Reservation of Rights</h3>
        <p className='ans'>We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it's linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.</p>
      </div>
      </div>
    </>
  )
}
