import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Filter from '../Components/Filter'
import Card from '../Components/Card'
import Loader from '../Components/Loader'

function ViewSpots() {

  const [isloading,setIsLoading]= useState(false)                                   // input:checkbox
  const [spotsapi,setSpotsapi] = useState([])                                       // api: http://127.0.0.1:8000/
  




    useEffect(() => {
      setIsLoading(true)
      axios.get('http://127.0.0.1:8000/addAttractions/')
    .then((response) =>{setSpotsapi(response.data) 
      setIsLoading(false)
    })

    }, [])
    
  return (
    <div>
      {isloading?<Loader/> :
    

    <div className='flex flex-row-[auto_1fr] space-x-0.5 '>

      <div className='bg-[#F9F6F5] relative left-12 top-12'>
        <Filter/>
      </div>

      <div >
        
        <ul className='
      relative top-8 right-10 md:right-auto md:left-16
      flex flex-col
      gap-20
      md:grid
md:grid-cols-[repeat(2,_1fr)]
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