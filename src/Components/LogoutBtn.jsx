import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContext'

function LogoutBtn() {
    const {setUser} = useContext(UserContext)

    const handleLogout = () => {
        localStorage.removeItem("user")
        setUser(null)
    }


  return (
    <button className='m-2.5 p-2.5 under-hover' onClick={() =>handleLogout()}>Logout</button>
  )
}

export default LogoutBtn