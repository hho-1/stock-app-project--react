import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import stockReducer from '../features/stockSlice'
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: "root",// storage veriler key-value şeklinde saklanır. Buraki key storagedaki keyi temsil ediyor.
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    stock: stockReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

export let persistor = persistStore(store);
export default store;


//?Prop drilling: Propsun dededen torunlara uzun uzun aktarilmasi
//Bunun önüne gecmek icin Global State management kullaniyoruz. Yani Redux, mobx, Zustand, Context APi gibi seyler
// Context API Reactin kendine ait, ancak digerleri 3. parti kütüphaneler, yani bunlari disardan import etmek gerekecek
//!Redux reacttan daha eski bir kütüphane, diger toollarla da kullanilabiliyor.