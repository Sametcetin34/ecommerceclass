// kayıtlı olmayan kulllanıcılar için kayıt sayfası
import React from 'react'
import styles from "./auth.module.scss"
import Card from '../../components/card/Card'
import registerImg from "../../assets/register.png"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { auth } from '../../firebase/config'
import {createUserWithEmailAndPassword} from "firebase/auth"
import Loader from '../../components/loader/Loader'

const Register = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [cPassword,setCPassword]=useState("")
  const [isLoading,setIsLoading]=useState(false)

  const navigate=useNavigate();

  const registerUser=(e)=>{
    e.preventDefault()
    // console.log(email,password,cPassword)
    if(password!== cPassword){
      toast.error("Password do not match!")
    }
    else{
   setIsLoading(true)
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
  
    const user = userCredential.user;
    // console.log(user);
    setIsLoading(false)
    toast.success("Registration successfull..");
    navigate("/login")
   
  })
  .catch((error) => {
    setIsLoading(false)
   toast.error(error.message)
   
  });
    }
  }
  return (
    <>
    {isLoading && <Loader/>}
<section className={`container ${styles.auth}`}>
      <Card cardClass={styles.form}>
        <h2>Register</h2>
        
        <form onSubmit={registerUser}>
          <input type='text' placeholder='Email' required value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type='Password' placeholder='Password' required value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <input type='Password' placeholder='ConfirmPassword' required value={cPassword} onChange={(e)=>setCPassword(e.target.value)}/>
          <button type='submit' className='--btn --btn-primary --btn-block'>Register</button>
        </form>
        <span className={styles.register}>
          &nbsp;<p>Already have an account?</p>
          <Link to="/login">Login</Link>
        </span>
      </Card>
      <div className={styles.img}>
        <img src={registerImg} alt="login" width="400"/>
      </div>

    </section>
    </>
    
  )
}

export default Register