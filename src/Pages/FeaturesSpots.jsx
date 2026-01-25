import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from '../Components/Card'
import FeaturedCard from '../Components/FeaturedCard'
import Loader from '../Components/Loader'
import axiosInstance from '../Components/Axios'

function FeaturesSpots() {

    const [featurespot,setFeaturedSpots] = useState([])
    const[isLoading,setIsLoading] = useState(false)
    // const baseUrl="http://127.0.0.1:8000/"

    
  useEffect(() => {
    setIsLoading(true)
    axiosInstance.get(`featuredSpots/`)
        .then (( response) => {setFeaturedSpots(response.data)
          setIsLoading(false)
        })
  }, [])
  
  return (
    <div>
      {isLoading? <Loader/> : <div className='relative flex flex-row  gap-12 '>
      {
        featurespot && featurespot.map((item) => <FeaturedCard item={item} key={item.id}/>)
      }
    </div>}
    </div>
  )
}

export default FeaturesSpots