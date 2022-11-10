import React,{useState} from 'react'
import fire from '../Config/Config'
import {Link} from 'react-router-dom'

import { useNavigate } from 'react-router-dom';


export const Signup = () => {
 const navigate = useNavigate();
    const[fullName, setFullName]=useState("");
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [errorMsg, setErrorMsg]= useState("");
    const [succcessMsg, setSuccessMsg]= useState("");


    const handleSignup=(e)=>{
        e.preventDefault()
        fire.auth().createUserWithEmailAndPassword(email,password).then((credentials)=>{
            console.log(credentials)
            fire.firestore().collection("user").doc(credentials.user.uid).set({
                FullName:fullName,
                Email:email,
                password:password
            }).then(()=>{
                setSuccessMsg("Registered Successfull. You will be redirected to login")
                setFullName("");
                setEmail("");
                setPassword("");
                setErrorMsg("");
              setTimeout(()=>{
                setSuccessMsg("");
                navigate("/login")
              },3000)
                
            })
        }).catch((error)=>{
            setErrorMsg(error.message)
        })
    }

  return (
    <div className= "auth-form-container">
        <br></br>
        <br></br>
        <h1>Signup</h1>
        <hr></hr>
        {succcessMsg&& <>
        <div className='success-msg'>{succcessMsg}</div>
        <br></br>
        </>}
        <form className='register-form' autoComplete='off' onSubmit={handleSignup}>
            <lable>Full Name</lable>
            <input type='text'  required onChange={(e)=>setFullName(e.target.value)} value={fullName}/>
            <lable>Email</lable>
            <input type='email'  required onChange={(e)=>setEmail(e.target.value)} value={email}/>
            <lable>Password</lable>
            <input type='password'  required onChange={(e)=>setPassword(e.target.value)} value={password}/>
            <br></br>
           <div className='btn-box'>
            <button className='link-btn'>Already have account Login?
                <Link to="/login" className='link-btn'></Link></button>
                
           </div>
           <button type='submit' className='btn -btn-success btn-md'>Register</button>
        </form>
        {errorMsg&& <>
            <div className='error-msg'>{errorMsg}</div>
            <br></br>
        </>}
        </div>
  )
}
