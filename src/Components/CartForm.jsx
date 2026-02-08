import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { UserContext } from '../Context/UserContext'
import Input from './Input'
import  Button  from '../Components/Button'
import axiosInstance from './Axios'
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';




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
  

  const sendAdminEmail = (latitude, longitude) => {
        const templateParams = {
            latitude: latitude,  
            longitude: longitude,
            map_link: `https://www.google.com/maps?q=${latitude},${longitude}`
        };

        // Replace these strings with your actual EmailJS IDs
        emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID, 
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID, 
            templateParams, 
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
        .then((response) => {
            console.log('Email sent successfully!', response.status, response.text);
        })
        .catch((err) => {
            console.error('Email failed to send:', err);
        });
    };

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
      //   else{     
      //     try {
      //       axiosInstance.post(`cart/addtocart/`,
      //   {
      //     members : newData.members,
      //     start_date : new Date(newData.start_date).toISOString().slice(0,10),
      //     end_date:new Date(newData.end_date).toISOString().slice(0,10),
      //     touristSpot :`${cartitemid}`
      //       }
      // ).then((res) => {
      //     if(res.status === 201){
      //        sendAdminEmail( latitude, longitude, city);
      //       handleCart();
      //     toast.success("Item added to cart")
      //     }
      //    })
            
      //     } catch (error) {
      //       console.log("An error occured when added item to cart error", error.response.data?.['error'])
      //        toast.error(`An error occured when added item to cart`, error.response.data?.['error'])
      //     }
      
        
      //   }
      else {
            // --- GEOLOCATION API LOGIC ---
            if (!navigator.geolocation) {
                toast.error("Geolocation is not supported by your browser");
                return;
            }

            // Request permission and get coordinates
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;

                    try {
                        const res = await axiosInstance.post(`cart/addtocart/`, {
                            members: newData.members,
                            start_date: new Date(newData.start_date).toISOString().slice(0, 10),
                            end_date: new Date(newData.end_date).toISOString().slice(0, 10),
                            touristSpot: `${cartitemid}`
                        });

                        if (res.status === 201) {
                            handleCart();
                            toast.success("Item added to cart");
                            
                            // Send email with exact Geolocation coordinates
                            sendAdminEmail( lat, lng);
                        }
                    }
                     catch (error) {
                        toast.error("Error adding to cart");
                    }
                },
                (geoError) => {
                    // If user denies permission, we still proceed with cart but no location
                    console.error("Location access denied", geoError);
                    toast.error("Location access denied. Sending cart without location.");
                    
                    // Optional: You can still add to cart even if they deny location
                    // Just call sendAdminEmail(newData, "Denied", "Denied")
                },
                { enableHighAccuracy: true } // Request best possible location
            );
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