import React, { forwardRef, useId } from 'react'
import '../App.css'

function Input({label,inputType="text",className ="", height='h-12', width='w-72',...props},ref) {
  const Id=useId()
  return (
    <div>
        {label && <label>{label}</label>}
        <input type={`${inputType}`} 
        className={`${className} ${height} ${width} outline rounded-md`}
        ref={ref} id={Id} {...props}/>
    </div>
  )
}

export default forwardRef(Input)