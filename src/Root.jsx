import React from 'react'
import Header from './Components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './Components/Footer'
import './App.css'

function Root() {
  return (
    <div className='bg-amber-50 h-screen min-h-screen text-black top-0 left-0'>
      <Header/>
      <Outlet className= "content"/>
      <Footer/>
    </div>
  )
}

export default Root