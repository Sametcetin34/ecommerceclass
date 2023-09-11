// kayıtlı kullanıcılar için giriş sayfası
import React from 'react'
import styles from "./auth.module.scss"
import loginImg from "../../assets/login.png"
import { Link,useNavigate } from 'react-router-dom'
import {FaGoogle} from "react-icons/fa"
import Card from '../../components/card/Card'
import { useState } from 'react'
import { signInWithEmailAndPassword,signInWithPopup} from "firebase/auth";
import { auth } from '../../firebase/config'
import { toast } from 'react-toastify'
import Loader from '../../components/loader/Loader'
import { GoogleAuthProvider } from "firebase/auth";
import { useSelector } from 'react-redux'
import { selectPreviousURL } from '../../redux/slice/cartSlice'



const Login = () => {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const [isLoading,setIsLoading]=useState(false);
  
  const navigate=useNavigate();
  const previousURL = useSelector(selectPreviousURL)

  const redirectUser=()=>{
    if(previousURL.includes("cart")){
      return navigate("/cart")
    }
    navigate("/")
  }
  
  const loginUser=(e)=>{
    e.preventDefault()
    // console.log(email,password)
    setIsLoading(true)
 
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
       setIsLoading(false)
      const user = userCredential.user;
      toast.success("Login successful..")
      redirectUser()
    })
    .catch((error) => {
      setIsLoading(false)
   toast.error(error.message)
    });
  }
  const provider = new GoogleAuthProvider();
  const signInWithGoogle=()=>{
    signInWithPopup(auth, provider)
  .then((result) => {
  
    const user = result.user;
   toast.success("Login successfully..")
 redirectUser()
  }).catch((error) => {
  toast.error(error.message)
  });
  }
  return (
    <>
    {isLoading && <Loader/>}
     <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
      <img src={loginImg} alt='login' width="400"/>

      </div>
      <Card cardClass={styles.form}>
        <h2>Login</h2>
        <form onSubmit={loginUser}>
          <input type='text' placeholder='Email' required value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type='password' placeholder='Password' required value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <button type="submit" className='--btn --btn-primary --btn-block'>Login</button>
          <div className={styles.links}>
            <Link to="/reset">Reset Password</Link>
          </div>
          <p>-- or --</p>
        </form>
        <button onClick={signInWithGoogle}  className='--btn --btn-danger --btn-block'><FaGoogle color="#fff"/> Login with Google</button>
        <span className={styles.register}>
          <p>Don't have an account</p>
          &nbsp;
          <Link to="/register">Register</Link>

        </span>

      </Card>

    </section>
    
    </>
   
  )
}

export default Login