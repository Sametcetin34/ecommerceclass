// burada google firebase ile etkileşime buradan girilecek.

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

//Authentication işlemleri için giriş ve yetkilendirme
import {getAuth} from "firebase/auth"
//Firestore database erişimi için(verilerin kayıt yeri)
import {getFirestore} from "firebase/firestore"
//storage erişimi için(resim kayıt yeri)
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: "eshop-129f3.firebaseapp.com",
  projectId: "eshop-129f3",
  storageBucket: "eshop-129f3.appspot.com",
  messagingSenderId: "735965596963",
  appId: "1:735965596963:web:be490ca329d1a757abd096",
  measurementId: "G-FDQV99QCD5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);
export const db =getFirestore(app);
export const storage=getStorage(app);
export default app;