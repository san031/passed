import React, { useState } from 'react'
import '../App.css'

function Button({children, className='', onClickAgain ,...props}) {
  const [isClicked,setIsClicked] = useState(false)
  const handleClick = (e) => {setIsClicked(!isClicked)
    if(onClickAgain){
      onClickAgain(e)
    }
  }
  return (
    <div>
      <button type='submit'  {...props} onClick={handleClick} className={`
      ${className}
      ${isClicked ? 'jello-horizontal':''}

       bg-[#603f26] w-64 h-10 rounded-md text-amber-50`}>{children}</button>
    </div>
  )
}

export default Button