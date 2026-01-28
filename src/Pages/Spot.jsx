import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import Button from '../Components/Button'
import { useForm } from 'react-hook-form'
import Input from '../Components/Input'
import { UserContext } from '../Context/UserContext'
import Loader from '../Components/Loader'
import CartForm from '../Components/CartForm'
import axiosInstance from '../Components/Axios'


function Spot() {
    const {handleSubmit,register} = useForm()
    const {id} = useParams()
    
    const isDevelopment = import.meta.env.MODE === 'development'

const baseUrl = isDevelopment ? import.meta.env.VITE_API_URL_LOCAL : import.meta.env.VITE_API_URL_DEPLOY
    const [spots,setSpots] = useState([])
    const {user,cartId} = useContext(UserContext)

    const[isloading,setIsLoading] = useState(false)


    useEffect(() => {
     const fetchSpots = async() => {
      setIsLoading(true)
      axiosInstance.get(`addAttractions/${id}`)
      .then((response) => {setSpots(response.data), setIsLoading(false)} )}
      
      fetchSpots();
    }, [])
    
   
  return (
    <div>

       {/* {spots&&spots.images.map((item) => console.log(item) )} */}
       {isloading?<Loader/>:
       <div>
        <div className=' flex flex-row-[1fr_2fr_auto] '>
        <div className='md:w-96 w-62 flex flex-col'>
          <div className='relative top-20 left-8 lg:left-8  lg:text-3xl text-2xl'>{spots.title}  <hr/></div>
          
          <div className='relative top-30 lg:top-40 left-5 break-words max-w-screen-md w-full overflow-y lg:text-lg text-sm'>{spots.location}</div>
          

          <div className='relative top-40 lg:top-50 left-5  '>
            <hr/>
            Visiting Time : {spots.opening_time} to {spots.closing_time}</div>
        </div>
         
          <img className='mix-blend-multiply drop-shadow-[0_10px_10px_#603f2680] lg:h-140 md:h-90 w-auto' src={`${baseUrl}${spots?.images?.[0]?.image}`}/> 
          <div className='relative top-24'>{spots.category}
            
        {console.log(`${spots.my_id}`)}
        <CartForm cartitemid = {`${spots.my_id}`}/>
        <hr className='m-2'/>
        <div className='relative left-auto  md:text-2xl text-lg'> Ticket Price : Rs.{spots.price}</div>
          </div>
         </div>
         <div className='flex flex-rows'>
          {spots?.images?.map((image) => 
          // console.log(image?.['image'])
          <Link className='border-2 rounded-3xl'>
          <img className='w-32 h-36 object-fit' src={`${baseUrl}${image?.image}`}/>
          </Link>
          )}
         </div>
       </div>}
         {/* {isloading ? "loading":
         console.log(spots?.images?.[0]?.image)}
        {spots.category}
        {spots.price}
        <form onSubmit={handleSubmit(addToCart)}>
          <Input type = "date" label ="start_date" {...register("start_date",{required:true})}/>
          <Input type="date" label="End Date" {...register("end_date",{required:true})}/>
          <Input type="number" label="members" {...register("members",{required:true})}/>
          <Button>MOVE TO TOUR CART</Button>
          
          
        </form> */}
        
        
    </div>
  )
}

export default Spot