import React, { useCallback, useContext, useState } from 'react'
import { FaCartShopping,FaXmark } from "react-icons/fa6";
import { UserContext } from '../Context/UserContext';
import Card from './Card';
import Button from './Button'
import Modal from './Modal';
import Loader from './Loader';
import CartForm from './CartForm';
import axiosInstance from './Axios';
import toast from 'react-hot-toast';

function CartCount({className=''}) {
    const [sidebarOpen,setSidebarOpen] = useState(false)
    // const [count,setCount] = useState(0)
    // const [cartItem,setCartItem] = useState("")
    const {user,setCartId,cartItem,count} = useContext(UserContext)
    const [passes,setPasses] = useState("")
    const [isOpen,setisOpen] = useState(false)
    const[isLoading,setIsLoading] = useState(false)

    const baseUrl="http://127.0.0.1:8000/"

    
    
    const removeTourItem = async(cartitemid) => {
        await fetch(`${baseUrl}cart/removecartitem/${cartitemid}/`,
          {method:"delete",
            headers:{"Content-Type":"application/json"}
          }
        )

      // const data = await response.json()
    }
    const toggleSidebar = () => (setSidebarOpen(!sidebarOpen))

    

    const generatePass = async() => {      
      axiosInstance.post(`pass/passed/`)
      getPassId()
    }

    const getPassId = async() => {
   
    try {
      const {data} = await axiosInstance.get(`pass/viewpass/`)
      if (data && data.length>0){
          const lastPasscode = data[data.length - 1].pass_code
          setPasses(lastPasscode)
          setisOpen(true)
      }
    } catch (error) {
       console.error('Error:', error);
    toast.error('Failed to fetch pass');
    }
    }


      
  return (
    <div>
    <div>
    <div onClick={toggleSidebar}  className={`${className}  relative inline-block `}>
        <div><FaCartShopping size={35} className='flicker-in-1'  /></div>
        <div className='  absolute -top-1 -right-2 h-5 w-5 flex items-center justify-center rounded-full bg-yellow-900 text-amber-50'>
            { count}
        </div>
       
    </div>

    <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
         onClick={toggleSidebar} >
    </div>

    <div className={`fixed top-0 right-0 h-full w-160 bg-white shadow-2xl z-50 transform transition-transform duration-300 overflow-y-auto ease-in-out ${
        sidebarOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-5 flex justify-between items-center border-b">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={toggleSidebar}>
            <FaXmark size={24} className="text-gray-500 hover:text-black" />
          </button>
        </div>
        
        {isLoading?<Loader/>:<div className="p-5">
          <div className="text-gray-600">{
            count === 0 ? 
            "YOUR CART IS EMPTY":
            cartItem.map((item) =>
            <div className='grid grid-cols-2' key={item.id}>
              <CartForm
              className = 'mb-5'
              cartitemid={item.id}
              cartData = 
                {{start_date:item.start_date ,
              end_date:item.end_date,
              members:item.members}
              }
               />
              <img className='w-50 h-50' src={`${baseUrl}${item?.spots?.images?.[0].image}`} alt="" />
              {/* <div className='flex place-items-center'>
                <button onClick = {() => removeTourItem(item.id)}>Remove Item</button>
              </div> */}
            </div>
            )
            }</div>
        </div>}
        <Button onClickAgain={generatePass}>Generate Pass</Button>
      </div>
    {isOpen && <Modal closeModal = {() => setisOpen(false)}><p>
      Your pass id is : {passes}
      </p></Modal>}
    </div>
    </div>
  )
}

export default CartCount