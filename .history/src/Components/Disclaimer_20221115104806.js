import React, { useState, useEffect } from 'react'
import fire, { auth } from '../Config/Config'
import { onAuthStateChanged, } from 'firebase/auth'
import { Navbar } from './Navbar'

export default function Disclaimer() {

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
        <h1 className='Heading'>Disclaimer</h1>
        <div className='Info-section'>
          <h3 className='ques'>Reservation of Rights</h3>
          <p className='ans'>We reserve the right at any time and in its sole discretion to request that you remove all links or any particular link to our Web site. You agree to immediately remove all links to our Web site upon such request. We also reserve the right to amend these terms and conditions and its linking policy at any time. By continuing to link to our Web site, you agree to be bound to and abide by these linking terms and conditions.</p>
          <h3 className='ques'>Content Liability</h3>
          <p className='ans'>We shall have no responsibility or liability for any content appearing on your Web site. You agree to indemnify and defend us against all claims arising out of or based upon your Website. No link(s) may appear on any page on your Web site or within any context containing content or materials that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p>
          <h3 className='ques'>License</h3>
          <p className='ans'>Unless otherwise stated, Faith Revelations and/or it's licensors own the intellectual property rights for all material on Faith Revelations. All intellectual property rights are reserved. You may view and/or print pages from https://faithrevelations.co.za for your own personal use subject to restrictions set in these terms and conditions.</p>
        </div>
      </div>
    </>
  )
}
