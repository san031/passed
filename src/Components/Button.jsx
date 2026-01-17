import React, { useState } from 'react'
import '../App.css'

function Button({children, className=''}) {
  const [isClicked,setIsClicked] = useState(false)
  const handleClick = () => {setIsClicked(!isClicked)}
  return (
    <div>
      <button type='submit' onClick={handleClick} className={`
      ${className}
      ${isClicked ? 'jello-horizontal':''}

       bg-[#603f26] w-64 h-10 rounded-md text-amber-50`}>{children}</button>
    </div>
  )
}

export default Button