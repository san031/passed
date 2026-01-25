import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import '../App.css'


function Modal(props) {
    const {closeModal}  = props

    const closeicon = () =>(
        <AiOutlineClose
        name = "times"
        onClick={closeModal}
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