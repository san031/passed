import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Card from '../Components/Card'

function Search() {
    const location = useLocation()

  const response = location.state || []

  const[isSearch,setisSearch] = useState([])

  useEffect(() => {
    if(response.length!==0){
        setisSearch(response)
    }
  },[setisSearch,response.length!==0])
  return (
    <div>
        <ul className='
      relative top-8 right-10 md:right-auto md:left-16
      flex flex-col
      gap-20
      md:grid
md:grid-cols-[repeat(2,_1fr)]
md:grid-rows-[repeat(auto,_1fr)]
md:gap-40 card-list'>{
          isSearch.map((item,id) => 
        <li key={id}>
          <Card item={item}/>
        </li>
        )}
        </ul>
    </div>
  )
}

export default Search