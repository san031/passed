import React, { useContext, useMemo, useState } from 'react'
import { FaCartShopping,FaXmark } from "react-icons/fa6";
import { UserContext } from '../Context/UserContext';
import Card from './Card';
import Button from './Button'
import Checkout from './Checkout'
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

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

    const totalPrice = useMemo(() => {
      if (!Array.isArray(cartItem)) return 0
      return cartItem.reduce((sum, item) => {
        const price = Number(item?.spots?.price) || 0
        const members = Number(item?.members) || 0
        return sum + price * members
      }, 0)
    }, [cartItem])

    const generatePass = async() => {
      try {
        await axiosInstance.post(`pass/passed/`)
        await getPassId()
      } catch (error) {
        console.error('Error generating pass:', error)
        toast.error('Failed to generate pass. Please try again.')
      }
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

    const handlePaymentSuccess = async () => {
      await generatePass()
      await handleCart()
      setSidebarOpen(false)
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

    <div className={`fixed top-0 right-0 h-full w-120 lg:w-160 bg-white shadow-2xl z-50 transform transition-transform duration-300 overflow-y-auto ease-in-out ${
        sidebarOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-5 flex justify-between items-center border-b">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={toggleSidebar}>
            <FaXmark size={24} className="text-gray-500 hover:text-black" />
          </button>
        </div>
        
        {isLoading ? <Loader /> : (
          <div className="p-5">
            {count === 0 ? (
              <div className="text-gray-600">YOUR CART IS EMPTY</div>
            ) : (
              <>
                <div className="text-gray-600 space-y-4">
                  {cartItem.map((item) => (
                    <div className='grid grid-cols-2 gap-4' key={item.id}>
                      <div>
                        <CartForm
                          className='mb-5'
                          cartitemid={item.id}
                          cartData={{
                            start_date: item.start_date,
                            end_date: item.end_date,
                            members: item.members,
                          }}
                        />
                      </div>
                      <img className='w-50 h-50 object-cover' src={`${item?.spots?.images?.[0].image}`} alt="" />
                    </div>
                  ))}
                </div>

                <div className='mt-6 border-t pt-4'>
                  <p className='text-lg font-semibold'>Total Price: ₹{totalPrice.toFixed(2)}</p>
                  <p className='text-sm text-gray-500'>Includes all cart items and member pricing.</p>
                </div>
              </>
            )}
          </div>
        )}
        <div className='p-5'>
          <Checkout
            amount={totalPrice}
            onSuccess={handlePaymentSuccess}
            disabled={count === 0 || totalPrice <= 0}
            className='w-full'
          />
        </div>
      </div>
    {isOpen&&passes && <Modal closeModal = {() => setisOpen(false)}><p>
      Your pass id is : {passes}
      </p></Modal>}
    </div>
    </div>
  )
}

export default CartCount