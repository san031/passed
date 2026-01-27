import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Filter from '../Components/Filter'
import Card from '../Components/Card'
import Loader from '../Components/Loader'
import { useLocation } from 'react-router-dom'
import SearchBar from '../Components/SearchBar'
import axiosInstance from '../Components/Axios'

function ViewSpots() {

  const [isloading,setIsLoading]= useState(false)                                   // input:checkbox
  const [spotsapi,setSpotsapi] = useState([])   
                                      // api: http://127.0.0.1:8000/
  

  const location = useLocation()

  const response = location.state || []

  console.log(response)

  // if(response){
  //   setSpotsapi(response)
  // }


    useEffect(() => {
      if(response.length!==0)
      {
        setSpotsapi(response)
      }
      else{
      setIsLoading(true)
      axiosInstance.get('addAttractions/')
    .then((response) =>{setSpotsapi(response.data) 
      setIsLoading(false)
    })}

    }, [setSpotsapi])
    
  return (
    <div>
      {isloading?<Loader/> :
    

    <div className='flex flex-row-[auto_1fr] '>
      <div className='bg-[#F9F6F5] relative left-4 top-12'>
        {/* <Filter/> */}
        {/* <SearchBar/> */}
      </div>

      <div >
        
        <ul className='
      relative top-8 right-10 md:right-auto md:left-16
      flex flex-col
      gap-20
      md:grid
md:grid-cols-[repeat(3,_1fr)]
md:grid-rows-[repeat(auto,_1fr)]
md:gap-40 card-list'>{
          spotsapi.map((item,id) => 
        <li key={id}>
          <Card item={item}/>
        </li>
        )}
        </ul>


      

      
      </div>
      
    </div>}

    </div>
  )
}

export default ViewSpots