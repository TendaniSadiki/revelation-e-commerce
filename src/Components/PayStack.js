import React,{useState} from 'react'
import PaystackPop from '@paystack/inline-js'
export const PayStack = () => {
    const [email, setEmail]=useState("")
    const [amount, setAmount]=useState("")
    const [firstName, setFirstName]=useState("")
    const [lastName, setLastName]=useState("")
    const paywithpaystack=(e)=>{
        e.preventDefault()
        const paystack = new PaystackPop ()
        paystack.newTransaction({
            key:"pk_test_145aacfe44042ba956a6f2039dda1dd7477f95a3",
            amount:amount*100,
            email:email,
            firstName:firstName,
            lastName:lastName,
            onSuccess(transaction){
                let message=`Payment Complete! Reference ${transaction.reference}`
                alert(message)
                setEmail("")
                setAmount("")
                setFirstName("")
                setLastName("")
                },
            onCancel(){
                alert("Transaction Canceled")
            }
        })
        // alert("Successful payment")

    }
  return (
    <div className='w3-container w3-row'>
    <div className='w3-container w3-blue'><h3>Make Payment</h3></div>
    
    <form id="paymentForm" className=''>
    <div className='form-group'>
        <label htmlFor='email'>Email Address</label>
        <input type="email" id="email-address" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className='form-group'>
        <label htmlFor='amount'>Amount</label>
        <input type="tel" id="amount" value={amount} onChange={(e)=>setAmount(e.target.value)}/>
        </div>
        <div className='form-group'>
        <label htmlFor='email'>First Name</label>
        <input type="text" id="first-name" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
    </div>
    
    <div className='form-group'>
        <label htmlFor='last-name' >Last Name</label>
        <input type="text" id="last-name" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
    </div>
    <div className='form-submit'>
    
        <button type="submit" onClick={paywithpaystack}>Pay</button>
    </div>
    </form>
    </div>
  )
}
