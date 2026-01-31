import React from 'react'
import Logo from './Logo'

function Footer() {
  return (
    <div className='m-2 p-2.5'>
      <footer class="bg-gray-50">
  <div class="mx-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex  items-center justify-center">
    <div class="sm:flex sm:items-center sm:justify-between">
      <div class="flex justify-center text-teal-600 sm:justify-start">
       
        <div className=' w-30 ml-4'>
        <Logo/>

      </div>
      </div>

      <p class="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
        {/* Copyright © 2022. All rights reserved. */}
        Copyright © {new Date().getFullYear()} - All right reserved
      </p>
    </div>
  </div>
</footer>
      </div>
  )
}

export default Footer