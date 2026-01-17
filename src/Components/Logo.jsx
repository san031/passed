import React from 'react'
import passedLogo from '../ImageUtils/passed_cover.png'

function Logo(height="200px" , width="350px", className = "") {
  return (
    <img src={passedLogo}  width={width} className={`${className} mix-blend-multiply `} style={{height}}/>
  )
}

export default Logo