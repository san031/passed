import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { UserContext } from '../Context/UserContext'
import Input from './Input'
import  Button  from '../Components/Button'
import axiosInstance from './Axios'

function CartForm({cartitemid,cartData}) {

    const baseUrl="http://127.0.0.1:8000/"

    const{user} = useContext(UserContext)

    const {handleSubmit,register} = useForm(
      {
        defaultValues:{
            start_date:cartData?.start_date||"",
     end_date:cartData?.end_date||"",
            members : cartData?.members||0
        }
    }
  )


    const addToCart = async(newData) => {
      console.log(cartitemid )
      console.log("newData",newData)
      console.log("cartData",cartData)
      
        if(cartData){
            const response = await fetch(`${baseUrl}cart/updatecart/${cartitemid}`,
                {
                    method:"PATCH",
                    headers :{
                      "Content-Type":"application/json",
                      "Authorization" : `Token ${user.token}`                  
                    },
                    body:JSON.stringify({
                      start_date : newData?.start_date,
                      end_date : newData?.end_date,
                      members : newData?.members,
                      touristSpot : `${cartitemid}`
                    })

                }
            )
            const data = await response.json()
            console.log(data)

            // axiosInstance.patch(`cart/updatecart/${cartitemid}`,
            //   {
            //           start_date : newData?.start_date,
            //           end_date : newData?.end_date,
            //           members : newData?.members,
            //           touristSpot : `${cartitemid}`
            //         }
            // )

        }
        else{
          console.log(cartitemid, user?.token)
      

      axiosInstance.post(`cart/addtocart/`,
        {
          members : newData.members,
          start_date : new Date(newData.start_date).toISOString().slice(0,10),
          end_date:new Date(newData.end_date).toISOString().slice(0,10),
          touristSpot :`${cartitemid}`
            }
      )
        
        }
}

  return (
    <div>
        <form onSubmit={handleSubmit(addToCart)}>

                  <Input className="mt-4" height="h-8 md:h-10" width="w-60 md:w-62" type = "date" label ="start_date" {...register("start_date",{required:true})}/>
                  {/* <input type='date' {...register("start_date", {required: true})}/>
                  <input type='date' {...register("end_date", {required:true})}/>
                  <input type='number' {...register("members",{required:true})}/> */}
                  <Input className="mt-4" height="h-8 md:h-10" width="w-60 md:w-62" type="date" label="End Date" {...register("end_date",{required:true})}/>
                  <Input className="mt-4" height="h-8 md:h-10" width="w-60 md:w-62" type="number" label="members" {...register("members",{required:true})}/>
                  <Button className="mt-4">{cartData? "UPDATE" :"MOVE TO TOUR CART" }</Button>
                  
                  
                </form> 
    </div>
  )
}

export default CartForm