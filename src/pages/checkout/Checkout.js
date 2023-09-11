// cart sayfasından checkout sayfasına ulaşıp, checkout detaylarını girip, proceed to checkout a bastığımızda karşımıza çıkan sayfa. 
//Bu sayfa hem bekleme anını(Initializing checkout...) hem de karşımıza çıkan iki card a sahip  checkoutform componentini içerir.

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";
import { useDispatch, useSelector } from "react-redux";
import { CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, selectCartItems, selectCartTotalAmount } from "../../redux/slice/cartSlice";
import { selectEmail } from "../../redux/slice/authSlice";
import { selectBillingAdress, selectShippingAdress } from "../../redux/slice/checkoutSlice";
import { toast } from "react-toastify";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);




const Checkout = () => {

  const [message,setMessage]=useState("Initializing checkout...");
  const [clientSecret,setClientSecret]=useState("");

  const cartItems=useSelector(selectCartItems);
  const totalAmount=useSelector(selectCartTotalAmount);
  const customerEmail=useSelector(selectEmail);
  const shippingAdress=useSelector(selectShippingAdress);
  const billingAdress=useSelector(selectBillingAdress);

  const dispatch=useDispatch();
  
  useEffect(()=>{
    dispatch(CALCULATE_SUBTOTAL);
    dispatch(CALCULATE_TOTAL_QUANTITY);
  },[dispatch,cartItems])

  const description=`eShop payment: email:${customerEmail}, Amount:${totalAmount}`

  useEffect(()=>{
    fetch("https://ecommerce-class-backend-1-dtk5.onrender.com/create-payment-intent",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        items:cartItems,
        userEmail:customerEmail,
        shipping:shippingAdress,
        billing:billingAdress,
        description

      })
    })
    .then((res)=>{
      if(res.ok){
        return res.json()
      }
      return res.json().then((json)=>Promise.reject(json))
    })
    .then((data)=>{
      setClientSecret(data.clientSecret)
    })
    .catch((error)=>{
      setMessage("Failed to initialize checkout")
      toast.error("something went wrong")
    })
  },[])

  const appearance={
    theme:"stripe"

  }
  const options={
    clientSecret,
    appearance
  }

  return (
   <>
   <section>
    <div className="container">
      {!clientSecret && <h3>{message}</h3>}
    </div>
   </section>
   {clientSecret && (
    <Elements options={options} stripe={stripePromise}>
      <CheckoutForm/>
    </Elements>
   )}
   
   </>
  )
}

export default Checkout