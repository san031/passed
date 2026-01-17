import React from 'react'
import { FaCheck } from "react-icons/fa6";
import '../App.css'


function Modal(props) {
    const {closeModal}  = props

    const closeicon = () =>(
        <FaCheck
        name = "times"
        onClick={closeModal}
        style={{
            color:"#000000",
            padding:'10px',
            cursor:"pointer",
            backgroundColor:"transparent",
            border:0,
            position:'absolute',
            top:"0.3rem",
            right:"0.5rem"
        }}
        />
    )
  return (
    <div className='overlay'>
        <div className='content'>
            {closeicon()}
            {props.children}
        </div>
    </div>
  )
}

export default Modal