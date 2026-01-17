import React from 'react'

function Container({width='w-full', height='h-170', className='', children}) {
  return (
    <div className={`${width} ${height} ${className} relative `}>{children}</div>
  )
}

export default Container