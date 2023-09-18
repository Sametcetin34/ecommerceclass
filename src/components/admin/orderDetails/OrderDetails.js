//admin panelindeki orders componentinin içindeki order statusa tıklayınce çıkam order details componenti
import React, { useEffect, useState } from 'react'
import styles from "./OrderDetails.module.scss"
import spinnerImg from "../../../assets/spinner.gif"
import { Link, useParams } from 'react-router-dom'
import useFetchDocument from '../../../customHooks/useFetchDocument'
import { STORE_PRODUCTS, selectProducts } from '../../../redux/slice/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import useFetchCollection from '../../../customHooks/useFetchCollection'

import ChangeOrderStatus from '../changeOrderStatus/ChangeOrderStatus'



const OrderDetails = () => {
  const [order,setOrder]= useState(null)
  const {id}=useParams();
  const document=useFetchDocument("orders",id);
  const dispatch= useDispatch();
  const{data}=useFetchCollection("products");
  const products=useSelector(selectProducts)
  

  useEffect(()=>{
    setOrder(document)
  },[document])
  
  useEffect(()=>{
    dispatch(STORE_PRODUCTS({products:data}))
  },[dispatch,data])


 

  return (
    <>
    <div className={styles.table}>
      <h2>Order Details</h2>
      <div>
        <Link to="/admin/orders">&larr; back to Orders</Link>
      </div>
      <br/>
      {order=== null ? (<img src={spinnerImg} alt="Loading.." style={{width:"50px"}}/>):(
        <>
        <p><b>Order ID</b>{order.id}</p>
        <p><b>Order Amount</b>${order.orderAmount}</p>
        <p><b>Order Status</b>{order.orderStatus}</p>
        <p><b>Shipping Adress</b><br/>Adress: {order.shippingAdress.line1},{order.shippingAdress.line2},{order.shippingAdress.city}<br/>
        state: {order.shippingAdress.state}
        <br/>
        Country: {order.shippingAdress.country}</p>
        <br/>
        <table>
        <thead>
          <tr>
            <th>s/n</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {
            order.cartItems.map((data,index)=>{
              const{id,name,price,imageURL,cartQuantity}= data
           
              return (
                <tr key={id}>
                  <td>
                    <b>{index+1}</b>
                  </td>
                  <td>
                    <p>
                      <b>{name}</b>
                    </p>
                    <img src={products.imageURL} alt={name} style={{width:"100px"}} />
                  </td>
                  <td>{price}</td>
                  <td>{cartQuantity}</td>
                  <td>{(price*cartQuantity).toFixed(2)}</td>
                </tr>
              )
            })
          }
        </tbody>
        </table>
        
        </>
      )}
      <ChangeOrderStatus order={order} id={id}/>
    </div>
    

    </>
  )
}

export default OrderDetails