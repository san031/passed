import React, { useState } from 'react'
import Select from './Select'
import {useForm } from 'react-hook-form'
import Input from './Input'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

function SearchBar({className=""}) {
  const {handleSubmit, register} = useForm()
  const [result, setResult] = useState([])
  const navigate = useNavigate()


  const handleSearch =async(searchLocation) => {
    console.log(searchLocation)
    const response = await fetch(`http://127.0.0.1:8000/addAttractions/?title=${searchLocation.location}`,{
      method:"GET",
        headers:{"Content-Type":"application/json"},
    })
    const data = await response.json()

    setResult(data)

    if (result.length ===0)
    return "No spots found"

    if(result)
    navigate('/search', {state:result})
  }
  
  
  return (
    <div className={`${className}`}>
      <form onSubmit={handleSubmit(handleSearch)} className='grid grid-cols-[auto_1fr] gap-8 '> 
        <div className='grid grid-rows-[auto_1fr] gap-2'>
          <Input placeholder="Enter location"
          className = 'input-wobble'
          {...register("location")}
        />
        {/* <Select
        className = 'input-wobble'
         optionList={["Library","Historic Monument", "Meuseum","Temple","Park"]}
         {...register("category")}
         /> */}
        </div>
        {/* <div className='grid grid-rows-[auto_1fr] gap-2'>
          <Input
          className = 'input-wobble'
          type="date" placeholder="Enter start date" {...register("startDate")}/>
        <Input
        className = 'input-wobble'
        type="date" placeholder="Enter end date" {...register("endDate")}/>

        </div> */}
        <Button type="submit" >Explore</Button>
        
      </form>
    </div>
  )
}

export default SearchBar