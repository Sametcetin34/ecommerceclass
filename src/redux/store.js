// burası redux store kayıt yeri
 import { configureStore,combineReducers } from "@reduxjs/toolkit";
 import authReducer from "./slice/authSlice"
import productReducer from "./slice/productSlice"
 import filterReducer from "./slice/filterSlice"
 import cartReducer from "./slice/cartSlice"
 import checkoutReducer from "./slice/checkoutSlice"

//Reducerlarımızı eklediğimiz yer

 const rootReducer=combineReducers({
    auth:authReducer,
   product:productReducer,
   filter:filterReducer,
   cart:cartReducer,
   checkout:checkoutReducer
 })

 //Reducerlar stora kaydediliyor
 const store=configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
    serializableCheck: false,
    })
 })

 export default store