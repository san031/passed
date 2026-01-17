import React from 'react'
import Select from './Select'
import {useForm } from 'react-hook-form'
import Input from './Input'
import Button from './Button'

function SearchBar({className=""}) {
  const {handleSubmit, register} = useForm()

  const handleSearch =() => {}
  return (
    <div className={`${className}`}>
      <form onSubmit={handleSubmit(handleSearch)} className='grid grid-cols-[auto_1fr] gap-8 '> 
        <div className='grid grid-rows-[auto_1fr] gap-2'>
          <Input placeholder="Enter location"
          className = 'input-wobble'
          {...register("location")}
        />
        <Select
        className = 'input-wobble'
         optionList={["Library","Historic Monument", "Meuseum","Temple","Park"]}
         {...register("category")}
         />
        </div>
        <div className='grid grid-rows-[auto_1fr] gap-2'>
          <Input
          className = 'input-wobble'
          type="date" placeholder="Enter start date" {...register("startDate")}/>
        <Input
        className = 'input-wobble'
        type="date" placeholder="Enter end date" {...register("endDate")}/>

        </div>
        <Button type="submit" >Explore</Button>
        
      </form>
    </div>
  )
}

export default SearchBar