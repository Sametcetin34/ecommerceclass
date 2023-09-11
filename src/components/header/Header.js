// tüm linklerin olduğu başlık kısmı
import React, { useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import styles from "./Header.module.scss"
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa'
import { HiOutlineMenuAlt3 } from "react-icons/hi"
import { useState } from 'react'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../../firebase/config'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { SET_ACTIVE_USER,REMOVE_ACTIVE_USER} from '../../redux/slice/authSlice'
import { ShowOnLogin,ShowOnLogout } from '../hiddenLink/hiddenLink'
import { AdminOnlyLink } from '../adminOnlyRoute/AdminOnlyRoute'
import { CALCULATE_TOTAL_QUANTITY, selectCartItems, selectCartTotalQuantity } from '../../redux/slice/cartSlice'






const logo = (

  <div className={styles.logo}>
    <Link to="./">
      <h2>
        e<span>Shop</span>.
      </h2>

    </Link>
  </div>

)







const Header = () => {
 


  const [showMenu, setShowMenu] = useState(false)
  const [displayName,setDisplayName]=useState("")

  const cartTotalQuantity=useSelector(selectCartTotalQuantity);
  const cartItems=useSelector(selectCartItems)

  const cart =(


    <span className={styles.cart}>
       <Link to="./cart">
         Cart
         <FaShoppingCart size={20} />
         <p>{cartTotalQuantity}</p>
       </Link>
   
   
     </span>)
    

  const navigate = useNavigate()

  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(CALCULATE_TOTAL_QUANTITY())
  },[dispatch,cartItems])

  useEffect(()=>{
  onAuthStateChanged(auth,(user)=>{
    if(user){
      if(user.displayName === null){
        const u1=user.email.slice(0,user.email.lastIndexOf("@"))
        const uName=u1.charAt(0).toUpperCase()+ u1.slice(1)
        setDisplayName(uName)

      }
      else{
        // const uid=user.uid
        setDisplayName(user.displayName)
        // console.log(user);
      }
      

      dispatch(SET_ACTIVE_USER({
        email:user.email,
        userName:user.displayName ? user.displayName : displayName,
        userID:user.uid
      }))
    }
    else{
      setDisplayName("")
      dispatch(REMOVE_ACTIVE_USER())
    }
  })
  },[dispatch,displayName])

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }
  const hideMenu = () => {
    setShowMenu(false)
  }

  const logoutUser = () => {

    const auth = getAuth();
    signOut(auth).then(() => {
      toast.success("logout successfully..")
      navigate("/")
    }).catch((error) => {
      toast.error(error.message)
    });
  }


  const activeLink = (({ isActive }) => (isActive ? `${styles.active}` : ""))

  return (
    <header>
      <div className={styles.header}>
        {logo}


        <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}>
          <div className={showMenu ? `${styles["nav-wrapper"]}` : `${styles["hide-nav"]}`} onClick={hideMenu}>

          </div>
         

          <ul onClick={hideMenu}>
           
          <AdminOnlyLink>
            <Link to="/admin/home">
            <li>
              <button className='--btn --btn-primary'>Admin</button>
            </li>
            </Link>
          </AdminOnlyLink>
          
            <li>
              <NavLink to="./" className={activeLink}>Home</NavLink>
            </li>
            <li>
              <NavLink to="./contact" className={activeLink}>Contact Us</NavLink>
            </li>
          </ul>

          <div className={styles["header-right"]} >
            <span className={styles.links}>
              <ShowOnLogout>
              <NavLink to="./login" className={activeLink} onClick={hideMenu}>Login</NavLink>
              </ShowOnLogout>
             
              <ShowOnLogin>
              <a href='#home' style={{color:"#ff7722"}}> 
              <FaUserCircle size={16}/>
              &nbsp;Hi,{displayName}
              
              </a>
              <NavLink to="./order-history" className={activeLink} onClick={hideMenu} >My Orders</NavLink>
             
              <NavLink to="/" onClick={logoutUser} >Logout</NavLink>
              </ShowOnLogin>
              
            </span>
            {cart}

          </div>
        </nav>
        <div className={styles["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>

      </div>
    </header>
  )
}

export default Header
