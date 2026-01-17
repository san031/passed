import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from './Input'
import Select from './Select'
import Button from './Button'
import { GiHamburgerMenu } from "react-icons/gi";
import '../App.css'

function Filter() {
    const {handleSubmit, register} = useForm()
    const [isOpen,setIsOpen] = useState(false)

    const handleDate = () => {}
    const handleCategory = () => {}

  return (
    <div className='flex-col-3 space-y-12 '>
      <div className='block lg:hidden'>
        <button
        className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"  
        onClick={() => setIsOpen(!isOpen)}>
        <GiHamburgerMenu    />
      </button>
      </div>
        <div><form
        className='border-0 shadow-[0_10px_10px_#603f2680]'
        onSubmit={handleSubmit(handleDate)}>
            <p>Availability</p>
            <Input label="Start Date" type='date' 
            className='flex flex-col-2'
            {...register("startDate",{required:true})}/>
            <Input label="End Date" type='date' 
            className='flex flex-col-2'
            {...register("endDate",{required:true})}/>

            <Button type='submit'>Check Availability</Button>
        </form></div>
        <div>
          <form 
                  className='border-0 shadow-[0_10px_10px_#603f2680] h-max'

          onSubmit={handleSubmit(handleCategory)}>
            <p >Category</p>
          <Select 
          optionClass=" w-2xs px-1 py-2" height='h-max' size='5' className='overflow-y-visible overflow-x-visible w-fit gap-2.5'
         optionList={["Library","Historic Monument", "Meuseum","Temple","Park"]}
         {...register('category',{required:true})}
        />

         <Button type='submit'>Check category</Button>
        </form>
        </div>
        <div>
          <form>
            
            <Input placeholder="enter location" label="Location"
            className='flex flex-col-2'
            />
         <Button type='submit'>Check location</Button>
          </form>
        </div>
    </div>
  )
}

export default Filter