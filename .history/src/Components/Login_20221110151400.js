import React,{useState} from 'react'
import fire from '../Config/Config';
import {Link, useNavigate} from 'react-router-dom'
import './Login.css'
export const Login = () => {
    const navigate = useNavigate();
    const [email ,setEmail] = useState("");
    const [password, setPassword]= useState("");
    const [errorMsg ,setErrorMsg] = useState("");
    const [succcessMsg, setSuccessMsg]= useState("");


    const handleLogin=(e)=>{
        e.preventDefault()
        fire.auth().signInWithEmailAndPassword(email,password).then((credentials)=>{
            console.log(credentials)
                setSuccessMsg("Login Successfull. You will be redirected to Home")
              
                setEmail("");
                setPassword("");
                setErrorMsg("");
              setTimeout(()=>{
                setSuccessMsg("");
                navigate("/")
              },3000)
                
            })
    
       
    }

  return (
    <div className="main-Login">
       <h1>Login</h1>
       <div className="login-contain"></div>
    <br></br>
    <br></br>
   
    <hr></hr>
    {succcessMsg&& <>
    <div className='success-msg'>{succcessMsg}</div>
    <br></br>
    </>}

    <div className=""
    <form className='form-group' autoComplete='off' onSubmit={handleLogin}>
        
        <lable>Email</lable>
        <input type='email' className='form-control' required onChange={(e)=>setEmail(e.target.value)} value={email}/>
        <lable>Password</lable>
        <input type='password' className='form-control' required onChange={(e)=>setPassword(e.target.value)} value={password}/>
        <br></br>
       <div className='btn-box'>
        <span>Create account
            <Link to="/signup" className="text">Here</Link></span>
            <button type='submit' className="login-btn">Login</button>
       </div>
    </form>
    {errorMsg&& <>
        <div className='error-msg'>{errorMsg}</div>
        <br></br>
    </>}
    </div>
  )
}
