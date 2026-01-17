import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

function FeaturedCard({item}) {
  const baseUrl="http://127.0.0.1:8000/"

  return (
    <Link to={`/viewAttractions/${item.my_id}`} className='clipimage   h-80 w-100 .jello-diagonal-2'>
      <img src={`${baseUrl}${item.images[0].image}`} className =' h-60 w-80'/>
      <div className=''>
        {item.title}
      </div>

    </Link>
  )
}

export default FeaturedCard