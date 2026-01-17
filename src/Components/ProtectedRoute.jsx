import React, { useContext } from 'react'
import {Navigate, Outlet, useLocation} from 'react-router-dom'
import { UserContext } from '../Context/UserContext'
function ProtectedRoute() {

    const {location} = useLocation
    const {user} = useContext(UserContext)
    const localUser = localStorage.getItem("user")
    console.log(localUser)
    if (user === "undefined")
        return null

  return (
    localUser ? <Outlet/> : <Navigate to="/login" replace state={{from:location}}/>
  )
}

export default ProtectedRoute