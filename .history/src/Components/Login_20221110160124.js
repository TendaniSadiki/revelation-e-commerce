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
    <div className="auth-form-container">
       <h1>Login</h1>
       
    <br></br>
    <br></br>
   
    <hr></hr>
    {succcessMsg&& <>
    <div className='success-msg'>{succcessMsg}</div>
    <br></br>
    </>}

    
    <form className='login-form' autoComplete='off' onSubmit={handleLogin}>
        
        <lable>Email</lable>
        <input type='email'  required onChange={(e)=>setEmail(e.target.value)} value={email}/>
        <lable>Password</lable>
        <input type='password'  required onChange={(e)=>setPassword(e.target.value)} value={password}/>
        <br></br>
       <div >
       
            <Link to="/signup" > <button className='link-btn'>Create account</Link></button>
            
       </div>
       <button type='submit' >Login</button>
    </form>
    
    <div className="right-side"></div>
    
    {errorMsg&& <>
        <div className='error-msg'>{errorMsg}</div>
        <br></br>
    </>}
    </div>
  )
}
