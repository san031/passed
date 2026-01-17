import React, { useContext, useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../Context/UserContext'
import LogoutBtn from './LogoutBtn'
import ProtectedRoute from './ProtectedRoute'
import CartCount from './CartCount'
import Logo from './Logo'
function Header() {
  const{user} = useContext(UserContext)


  const [isLogin, setIslogin] = useState(user !== null)


  useEffect(() => (

   setIslogin( user !== null )
  ), [user])
  

  return (
    <div className='m-2 p-2.5  flex justify-between items-center cursor-pointer font-mono space-between'>
      <div className=' w-30 ml-4'>
        <Logo/>

      </div>
      <div className='flex space-x-4 mr-4 text-xl'>
        <Link  className='m-2.5 p-2.5 under-hover'to='/'>Home</Link>
      {/* <Link className='m-2.5 p-2.5' to='/buypass'>Buy Pass</Link> */}
      {isLogin && <Link className='m-2.5 p-2.5 under-hover' to='/checkvalidity'>Check Pass Validity</Link>}
      <Link className='m-2.5 p-2.5 under-hover' to='/viewattractions'> View Tourist Spots</Link>
      
      {
        isLogin ?
        <LogoutBtn/>:
        <Link className='m-2.5 p-2.5 under-hover' to='/login'> LogIn</Link>
      }

      {
        isLogin &&  <CartCount className='m-2.5 p-2.5 '/>
      }
      
      </div>
    </div>
  )
}

export default Header