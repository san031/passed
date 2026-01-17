import React,{ createContext, useState } from "react";

export const UserContext = createContext("");

export const UserProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [cartId, setCartId] = useState("")
    const[cartItem,setCartItem] = useState("")
    const [count,setCount] = useState(0)
    return (
        <UserContext.Provider value={{user,setUser,count,setCount,cartItem,setCartItem}}>
            {children}
        </UserContext.Provider>
    )
}