import React,{useState} from 'react'
import fire from '../Config/Config';
import {Link, useNavigate} from 'react-router-dom'
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
    <div className= "container">
    <br></br>
    <br></br>
    <h1>Login</h1>
    <hr></hr>
    {succcessMsg&& <>
    <div className='success-msg'>{succcessMsg}</div>
    <br></br>
    </>}
    <form className='form-group' autoComplete='off' onSubmit={handleLogin}>
        
        <lable>Email</lable>
        <input type='email' className='form-control' required onChange={(e)=>setEmail(e.target.value)} value={email}/>
        <lable>Password</lable>
        <input type='password' className='form-control' required onChange={(e)=>setPassword(e.target.value)} value={password}/>
        <br></br>
       <div className='btn-box'>
        <span>Create account
            <Link to="/signup" className='link'>Here</Link></span>
            <button type='submit' className='btn -btn-success btn-md'>Login</button>
       </div>
    </form>
    {errorMsg&& <>
        <div className='error-msg'>{errorMsg}</div>
        <br></br>
    </>}
    </div>
  )
}
