import React, { createContext, useState } from "react";
export const userContext = createContext();
const Mycontext = (props) => {
  const [allProduct, setAllProduct] = useState([]);
  const [product, setproduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartitems] = useState([]);
  const [loginFlag, setLoginFlag] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  return (
    <>
      <userContext.Provider
        value={{
          product,
          setproduct,
          categories,
          setCategories,
          allProduct,
          setAllProduct,
          cartItems,
          setCartitems,
          loginFlag,
          setLoginFlag,
          userInfo,
          setUserInfo,
        }}
      >
        {props.children}
      </userContext.Provider>
    </>
  );
};
export default Mycontext;
