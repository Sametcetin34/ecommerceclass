// bu sayfa cart sayfasından checkout a tıkladığımızda gelen, checkoutdetails componentidir. içinde adres inputları ve checkoutsummary yer alır.

import React, { useState } from 'react'
import styles from "./CheckoutDetails.module.scss"
import Card from '../../components/card/Card'
import { CountryDropdown } from 'react-country-region-selector'
import { SAVE_BILLING_ADRESS, SAVE_SHIPPING_ADRESS } from '../../redux/slice/checkoutSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckoutSummary from '../../components/checkoutSummary/CheckoutSummary'






const initialState={
  name:"",
  line1:"",
  line2:"",
  city:"",
  state:"",
  postal_code:"",
  country:"",
  phone:""
}

const CheckoutDetails = () => {

  const [shippingAdress,setShippingAdress]=useState({...initialState})
  const [billingAdress,setBillingAdress]=useState({...initialState})
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleShipping=(event)=>{
    const {name,value}=event.target
    setShippingAdress({...shippingAdress,[name]:value})
    
  }
  const handleBilling=(event)=>{
    const {name,value}=event.target
    setBillingAdress({...billingAdress,[name]:value})

  }
  const handleSubmit=(e)=>{
e.preventDefault();
// console.log(shippingAdress)
// console.log(billingAdress)
dispatch(SAVE_SHIPPING_ADRESS(shippingAdress))
dispatch(SAVE_BILLING_ADRESS(billingAdress))
navigate("/checkout")

  }


  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Checkout Details</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={styles.card}>
              <h3>Shipping Adress</h3>
              <label>Recipient Name</label>
              <input type='text' placeholder='Recipient Name' required name="name" value={shippingAdress.name} onChange={(e)=>handleShipping(e)}></input>
              <label>Adress Line 1</label>
              <input type='text' placeholder='Adress Line 1' required name="line1" value={shippingAdress.line1} onChange={(e)=>handleShipping(e)}></input>
              <label>Adress Line 2</label>
              <input type='text' placeholder='Adress Line 2' name="line2" value={shippingAdress.line2} onChange={(e)=>handleShipping(e)}></input>
              <label>City</label>
              <input type='text' placeholder='City' required name="city" value={shippingAdress.city} onChange={(e)=>handleShipping(e)}></input>
              <label>State</label>
              <input type='text' placeholder='State' required name="state" value={shippingAdress.state} onChange={(e)=>handleShipping(e)}></input>
              <label>Postal Code</label>
              <input type='text' placeholder='Postal Code' required name="postal_code" value={shippingAdress.  postal_code} onChange={(e)=>handleShipping(e)}></input>
              <CountryDropdown className={styles.select} valueType='short' value={shippingAdress.country} onChange={(val)=>handleShipping({
                target:{
                  name:"country",
                  value:val
                }
              })}/>
              <label>Phone</label>
              <input type='text' placeholder='Phone' required name="phone" value={shippingAdress.phone} onChange={(e)=>handleShipping(e)}></input>


            </Card>
            <Card cardClass={styles.card}>
              <h3>Billing Adress</h3>
              <label>Name</label>
              <input type='text' placeholder='Name' required name="name" value={billingAdress.name} onChange={(e)=>handleBilling(e)}></input>
              <label>Adress Line 1</label>
              <input type='text' placeholder='Adress Line 1' required name="line1" value={billingAdress.line1} onChange={(e)=>handleBilling(e)}></input>
              <label>Adress Line 2</label>
              <input type='text' placeholder='Adress Line 2' name="line2" value={billingAdress.line2} onChange={(e)=>handleBilling(e)}></input>
              <label>City</label>
              <input type='text' placeholder='City' required name="city" value={billingAdress.city} onChange={(e)=>handleBilling(e)}></input>
              <label>State</label>
              <input type='text' placeholder='State' required name="state" value={billingAdress.state} onChange={(e)=>handleBilling(e)}></input>
              <label>Postal Code</label>
              <input type='text' placeholder='Postal Code' required name="postal_code" value={billingAdress.  postal_code} onChange={(e)=>handleBilling(e)}></input>
              <CountryDropdown className={styles.select} valueType='short' value={billingAdress.country} onChange={(val)=>handleBilling({
                target:{
                  name:"country",
                  value:val
                }
              })}/>
              <label>Phone</label>
              <input type='text' placeholder='Phone' required name="phone" value={billingAdress.phone} onChange={(e)=>handleBilling(e)}></input>

              <button type="submit" className="--btn --btn-primary">Proceed To Checkout</button>
            </Card>
          </div>
          <div>
            <Card cardClass={styles.card}>
              <CheckoutSummary/>
            </Card>
          </div>

        </form>
      </div>

    </section>
  )
}

export default CheckoutDetails