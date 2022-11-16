import React,{useState,useEffect} from 'react'
import PaystackPop from '@paystack/inline-js'
import fire, { auth, db } from '../Config/Config'
import { onAuthStateChanged } from 'firebase/auth'
import { Navbar } from './Navbar'
import { useLocation } from 'react-router-dom'


export const PayStack = (props) => {

    const [userDetails, setUserDetails] = useState({});
    const location = useLocation();
    console.log('Loca: ', location.state)
    // const amount= useState(location.state)

    // console.log(this.props.location.state)
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
    console.log(uid)
    function GetCurrentUser() {
        useEffect(() => {
            const unbn = onAuthStateChanged(auth, userAuth => {
                if (userAuth) {
                    fire.firestore().collection("user").doc(userAuth.uid).get().then(snapshot => {
                        console.log(snapshot.data())
                        setUserDetails(snapshot.data())
                    })
                    
                } else {


                    // setUser(null)
                }
            })
            return unbn
        }, [])
    }
    GetCurrentUser()

   

   
    const [cartProducts, setCartProduct] = useState([])

    // getting cart product from the firestore collection and updating the state
    const cardProduct = []


    













    const [email, setEmail] = useState("")
    const [amount, setAmount]=useState(location.state.total)
    const [firstName, setFirstName]=useState("")
    const [lastName, setLastName]=useState("")

  
    const paywithpaystack=(e)=>{
        e.preventDefault()
        console.log(userDetails)
        console.log("current amount ", amount)
        const paystack = new PaystackPop ()
        paystack.newTransaction({
            key:"pk_test_145aacfe44042ba956a6f2039dda1dd7477f95a3",
            amount:amount*100,
            email:userDetails.Email,
            firstName:firstName,
            lastName:userDetails.FullName,
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
       <h1>Make Payment</h1>
       <p>Customer Name: {userDetails.FullName}</p>
       <p>Customer Email: {userDetails.Email}</p>   
        <p>Amount to pay : R {amount}</p>

<p>{firstName}</p>

  
    <div className='form-submit'>
    
    <button type="submit" onClick={paywithpaystack}>Pay</button>
</div>

    
    </div>
  )
}
