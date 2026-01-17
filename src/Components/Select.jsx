import React, {  useId } from 'react'
import '../App.css'

function Select({label,size,optionList,optionClass = '' ,height='h-12', width='w-72', className='' ,...props},ref) {
  
  const Id = useId()
  // console.log(optionList.length);
  return (
    <>

      {label && <label>{label}</label>}
        <select id={Id} ref={ref}
        size={size}
        className={`outline rounded-md ${height} ${width} ${className}`} {...props}>{label}
        {optionList.map((option) => (<option className={`${optionClass}`} key={option} value={option}>{option}</option>))}
        
        </select>

    </>
  )
}

export default Select