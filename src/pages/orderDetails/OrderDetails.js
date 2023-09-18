// my orders kısmına tıkladığınızda orderhistory açılacaktır. orderlardan herhangibirine tıkladığınızda ise order details sayfasına yönlendirir.
import React, { useEffect, useState } from 'react'
import styles from "./OrderDetails.module.scss"
import { Link, useParams } from 'react-router-dom'
import useFetchDocument from '../../customHooks/useFetchDocument'
import spinnerImg from "../../assets/spinner.gif"

const OrderDetails = () => {

  const [order,setOrder]=useState(null)
  const  {id}=useParams();
  const document=useFetchDocument("orders",id)

  useEffect(()=>{
    setOrder(document)
  },[document])
 
 
  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Order Details</h2>
        <div>
          <Link to="/order-history">&larr; Back to Orders</Link>
        </div>
        <br/>
        {order === null ? (<img src={spinnerImg} alt='Loading...' style={{width:"50px"}}/>): (
          <>
          <p>
            <b>Order ID </b>{order.id}
            <b>Order Amount</b>{order.orderAmount}
            <b>Order Status</b>{order.orderStatus}
          </p>
          <br/> 
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {order.cartItems.map((cartItem,index)=>{
                const{id,name,price,imageURL,cartQuantity}=cartItem
                return (
                  <tr key={id}>
                    <td>
                      <b>{index+1}</b>
                    </td>
                    <td>
                      <p><b>{name}</b></p>
                      <img src={imageURL} alt={name} style={{width:"100px"}}/>
                    </td>
                    <td>{price}</td>
                    <td>{cartQuantity}</td>
                    <td>{(price*cartQuantity).toFixed(2)}</td>
                    <td className={styles.icon}>
                      <Link to={`/review-product/${id}`}>
                        <button className='--btn --btn-primary'>Review Product</button>
                      </Link>
                    </td>

                  </tr>
                )
              })}
            </tbody>
          </table>


          </>
        )}
      </div>


    </section>
  )
}

export default OrderDetails