import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { UserContext } from '../Context/UserContext'
import Input from './Input'
import  Button  from '../Components/Button'
import axiosInstance from './Axios'
import toast from 'react-hot-toast';


function CartForm({cartitemid,cartData, className = ''}) {

    
    const{handleCart} = useContext(UserContext)

    const {handleSubmit,register} = useForm(
      {
        defaultValues:{
            start_date:cartData?.start_date||"",
     end_date:cartData?.end_date||"",
            members : cartData?.members||0
        }
    }
  )

  const removeTourItem = async() => {
    console.log(cartitemid)
       
         await axiosInstance.delete(`cart/removecartitem/${cartitemid}/`)
         .then((res) => {
          if(res.status === 204){
            toast.success("Item successfully removed from cart")
            handleCart();}
         })

    }


    const addToCart = async(newData) => {
      console.log(cartitemid )
      console.log("newData",newData)
      console.log("cartData",cartData)
      
        if(cartData){
            

        await axiosInstance.patch(`cart/updatecart/${cartitemid}/`,
              {
                      start_date : newData?.start_date,
                      end_date : newData?.end_date,
                      members : newData?.members,
                    }
            )
            .then((res) => {
          if(res.status === 201){
            toast.success("Item updated ")
            handleCart();}
         })
            

        }
        else{     
          try {
            axiosInstance.post(`cart/addtocart/`,
        {
          members : newData.members,
          start_date : new Date(newData.start_date).toISOString().slice(0,10),
          end_date:new Date(newData.end_date).toISOString().slice(0,10),
          touristSpot :`${cartitemid}`
            }
      ).then((res) => {
          if(res.status === 201){
            
            handleCart();
          toast.success("Item added to cart")
          }
         })
            
          } catch (error) {
            console.log("An error occured when added item to cart error", error.response.data?.['error']);
             toast.error(`An error occured when added item to cart`, error.response.data?.['error'])
          }
      
        
        }
}

  return (
    <div>
        <form className={`${className}`} onSubmit={handleSubmit(addToCart)}>

                  <Input className="mt-4" height="h-8 md:h-10" width="w-60 md:w-62" type = "date" label ="start_date" {...register("start_date",{required:true})}/>
                  <Input className="mt-4" height="h-8 md:h-10" width="w-60 md:w-62" type="date" label="End Date" {...register("end_date",{required:true})}/>
                  <Input className="mt-4" height="h-8 md:h-10" width="w-60 md:w-62" type="number" label="members" {...register("members",{required:true})}/>
                  <div className='flex'>
                    <Button type='submit' className="mt-4">{cartData? "UPDATE" :"MOVE TO TOUR CART" }</Button>
                    {cartData && <Button  onClickAgain = {() => removeTourItem()} className="mt-4 ml-4">REMOVE ITEM</Button>}
                  </div> 
                  
                  
                </form> 
                
    </div>
  )
}

export default CartForm