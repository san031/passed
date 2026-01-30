import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

function FeaturedCard({item}) {


  return (
    <Link to={`/viewAttractions/${item.my_id}`} className='clipimage   h-80 w-100 .jello-diagonal-2'>
      <img src={`${item.images[0].image}`} className =' h-60 w-80'/>
      <div className=''>
        {item.title}
      </div>

    </Link>
  )
}

export default FeaturedCard