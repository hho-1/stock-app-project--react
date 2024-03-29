import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFail, fetchStart, getSuccess } from "../features/stockSlice";
import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import useAxios from "./useAxios";

const useStockCall = () => {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);

  const { axiosWithToken } = useAxios();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  //   const getFirms = async () => {
  //     dispatch(fetchStart());
  //     try {
  //       const url = "firms";
  //       const { data } = await axios(`${BASE_URL}stock/${url}/`, {
  //         headers: {
  //           Authorization: `Token ${token}`,
  //         },
  //       });
  //       console.log(data);
  //       // dispatch(getSuccess({data, url:"firms"}))
  //       dispatch(getSuccess({ data, url })); // {data:data,url:url}
  //     } catch (error) {
  //       dispatch(fetchFail());
  //     }
  //   };
  //   const getBrands = async () => {
  //     dispatch(fetchStart());
  //     try {
  //       const url = "brands";
  //       const { data } = await axios(`${BASE_URL}stock/${url}/`, {
  //         headers: {
  //           Authorization: `Token ${token}`,
  //         },
  //       });
  //       console.log(data);
  //       // dispatch(getSuccess({data, url:"firms"}))
  //       dispatch(getSuccess({ data, url })); // {data:data,url:url}
  //     } catch (error) {
  //       dispatch(fetchFail());
  //     }
  //   };
  //* DRY
  //! yukarıdaki gibi her seferinde yazmak yerine daha modüler bir yapı kurarak tek bir fonksiyonla bir den fazla get işlemini gerçekleştirebiliyoruz
  const getStockData = async url => {
    dispatch(fetchStart());
    try {
      // const { data } = await axios(`${BASE_URL}stock/${url}/`, {
      //   headers: {
      //     Authorization: `Token ${token}`,
      //   },
      // });
      const { data } = await axiosWithToken(`stock/${url}/`);
      console.log(data);
      // dispatch(getSuccess({data, url:"firms"}))
      dispatch(getSuccess({ data, url })); // {data:data,url:url}
    } catch (error) {
      dispatch(fetchFail());
    }
  };
  //! istek atarken ortak olan base_url  ve token gibi değerleri her seferinde yazmak yerine axios instance kullanarak bunları orada tanımlıyoruz. Ve sonrasında sadece istek atmak istediğimiz end pointi yazmamız yeterli oluyor.
  const deleteStockData = async (url, id) => {
    dispatch(fetchStart());
    try {
      // await axios.delete(`${BASE_URL}stock/${url}/${id}/`, {
      //   headers: {
      //     Authorization: `Token ${token}`,
      //   },
      // });
      await axiosWithToken.delete(`stock/${url}/${id}/`);
      getStockData(url);
      toastSuccessNotify(`${url} successfuly deleted!`);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${url} not successfuly deleted!`);
    }
  };

  const postStockData = async (url,info) => {
    dispatch(fetchStart());
    try {
      const {data} = await axiosWithToken.post(`stock/${url}/`,info);

      getStockData(url);
      toastSuccessNotify(`${url} successfuly created!`);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${url} not successfuly created!`);
    }
  };

  const putStockData = async (url, info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`stock/${url}/${info.id}/`, info);

      getStockData(url);
      toastSuccessNotify(`${url} successfuly updated!`);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${url} not successfuly updated!`);
    }
  };

  return {
    // getFirms,
    //  getBrands,
    getStockData,
    deleteStockData,
    postStockData,
    putStockData,
  };
};

export default useStockCall;

// https://react.dev/learn/reusing-logic-with-custom-hooks

//! Birden fazla componentte aynı fonksiyona veya fonksiyonlara ihtiyacım varsa (fetch gibi) ve bu fonksiyonlar içerisinde hooklara ihtiyaç duyuyorsam dispatch,state gibi o zaman custom hook yazmak mantıklıdır.
//* custom hooklar "use" kelimesiyle başlar.
//+ custom hooklar jsx return etmez.
//* custom hookslar parametre alabilirler.
//? birden fazla değer veya fonksiyon paylaşabiliriz. Eğer tek bir değer veya fonskiyon paylaşacaksak return deger dememiz yeterli. Ama birden fazlaysa o zaman object içerisinde değerlerimi, fonksiyonlarımı paylaşabilirim.
//? Tek değer paylaştığımızda kullancağımız componentte direk olarka çağırabiliriz. Ama birden fazla değer paylaşıyorsak kullanırken destructuring yapmalıyız.


// const useFetch=(url)=>{
//     const [mydata,setData] = useState([])

//     const getData=()=>{
//         const {data} = await axios(url)
//         setData(data)
//     }

//     return {mydata}
// }

// home const {mydata,getData} = useFetch('https....lasdas')
// products const {mydata,getData} = useFetch('https....fakestoreapi')