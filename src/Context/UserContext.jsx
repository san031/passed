import React,{ createContext, useState } from "react";
import axiosInstance from "../Components/Axios";

export const UserContext = createContext("");

export const UserProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [cartId, setCartId] = useState("")
    const[cartItem,setCartItem] = useState("")
    const [count,setCount] = useState(0)
    const baseUrl="http://127.0.0.1:8000/"
    const handleCart = async() => {
      if(user){
    //   await fetch(`${baseUrl}cart/UserCart/`,
    //     {
    //       method:"GET",
    //       headers : {"Content-Type" :"application/json", "Authorization":`Token ${user.token}`}
    //     }
    //   )
    axiosInstance.get(`cart/UserCart/`)
      .then((response) =>  {
        const res =  response.data
        
        
        setCartItem(res.items)
        setCount(res.items.length)
        
        console.log(res) 
      })}
    }
    return (
        <UserContext.Provider value={{user,setUser,count,setCount,cartItem,setCartItem,handleCart}}>
            {children}
        </UserContext.Provider>
    )
}