////şifre resetleme sayfası
import React from 'react'
import styles from "./auth.module.scss"
import resetImg from "../../assets/forgot.png"
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from 'react-toastify'
import { auth } from '../../firebase/config'
import Loader from '../../components/loader/Loader'


const Reset = () => {

  const [email,setEmail]=useState("")
  const [isLoading,setIsLoading]=useState(false);

  const resetPassword=(e)=>{
    e.preventDefault();
    // alert(email);
   setIsLoading(true)
    sendPasswordResetEmail(auth, email)
  .then(() => {
    setIsLoading(false)
    toast.success("Success")
    
  })
  .catch((error) => {
    setIsLoading(false)
   toast.error(error.message)
  });
  }

  
  return (
    <>
    {isLoading && <Loader/>}
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={resetImg} alt="reset" width="400"></img>
      </div>
      <Card cardClass={styles.form}>
        <h2>Reset</h2>
        <form onSubmit={resetPassword}>
          <input type='text' placeholder='Email' required value={email} onChange={(e)=>setEmail(e.target.value)}></input>
          <button type='submit' className='--btn --btn-primary --btn-block'>Reset Password</button>
          <div className={styles.links}>
            <p>
              <Link to="/login">-Login</Link>
            </p>
            <p>
              <Link to="/register">-Register</Link>
            </p>
          </div>
        </form>
      </Card>

    </section>
    
    </>
   
  )
}

export default Reset