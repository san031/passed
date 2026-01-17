import React from 'react'
import { Link } from 'react-router-dom'

function Card({item}) {

const baseUrl="http://127.0.0.1:8000/"
  return (
    <Link className=' bg-[#ead9dd] relative left-32 h-96 w-96 flex flex-col rounded-4xl  spacing-x-12 hero ' key={item.my_id} 
    // to={`${baseUrl}/addAttractions/${item.my_id}`}
    
    to={`/viewAttractions/${item.my_id}`}
    >
         
            <img src={`${baseUrl}${item.images[0].image}`} alt={`${item.title}`} className='drop-shadow-[0_10px_10px_#603f2680]  imgscrim' />
          <div className=' shadycontent  absolute z-10 -bottom-70 left-6 text-amber-100 text-2xl ' >
            <div>{item.category}</div>
            <div>{item.title}</div>
            <div>{item.price}$</div>
            <div>{`${item.my_id}`}</div>
          </div>
         
          
          </Link>
  )
}

export default Card