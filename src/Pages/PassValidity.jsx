
import React, { useContext } from 'react'
import { useState } from 'react'
import { UserContext } from '../Context/UserContext'
import { useForm } from 'react-hook-form'
import Button from '../Components/Button'
import Input from '../Components/Input'
import PassCard from '../Components/PassCard'

function PassValidity() {
    const {user} = useContext(UserContext)
    const[spotty,setSpotty] = useState([])
    // const [passid,setPassid] = useState('')
    const [isPassCard,setisPassCard] = useState(false)
    const [passcode,setPasscode] = useState("")
    const {register, handleSubmit} = useForm()
    const checkpassvalidity =async(passdata) =>{

        // {console.log(passdata)}
        setPasscode(passdata.pass_id)
        const response=await fetch('http://127.0.0.1:8000/pass/viewpass/',
            {
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization" :`Token ${user.token}`
                }
            }
        )
        const data = await response.json()
        data.map((passs) => {passs.pass_code === passdata.passid ? 
             setSpotty(passs)
            : 
            ""}
        )
        if(spotty)
            setisPassCard(true)
       
    }

   
    
  return (
    <div>
        <div className='font-bold text-3xl'>Check Pass Validity</div>
        <form onSubmit={handleSubmit(checkpassvalidity)} className='m-2.5 p-2.5 flex flex-col'>
            {/* <label htmlFor="passid">Enter your Pass ID:</label> */}


            <Input type="text" name="pass_code" id="passid" label = 'Enter pass ID:'
            {...register('passid',{required:true})}
            // value={passid}
            // onChange={(e) => {handleChange(e)}}
            className='outline h-7 w-2xl ml-32 justify-center'  />


            <Button type="submit" className='cursor-pointer'>Check</Button>
        </form>

        <div className='flex  justify-center'>
          {  isPassCard &&  <PassCard passcode = {passcode} spotty={spotty} />}
        </div>
    </div>
  )
}

export default PassValidity