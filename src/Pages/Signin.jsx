import React, { useContext, useState } from 'react'
import Container from '../Components/Container'
import catty from '../ImageUtils/catty.png'
import Input from '../Components/Input'
import Button from '../Components/Button'
import {useForm} from 'react-hook-form'
import { UserContext } from '../Context/UserContext'

function Signin() {
  const {register, handleSubmit} = useForm()
  const {user,setUser} = useContext(UserContext)

  const signin = async(data) => {
   try {
     const response = await fetch(
      'http://127.0.0.1:8000/register/',
      {
        method:'POST',
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          username:data.email,
          email:data.email,
          password:data.password,
          full_name : data.fullname
        })

      }
    )

    console.log(response);

    if(!response.ok)
      throw new Error("signup failed")

    const responseData = await response.json()

    console.log(responseData);
    // localStorage.setItem("user",JSON.stringify(responseData))
    setUser(responseData)
   } catch (error) {
    console.log("Error during registering", error);
   }
  }
  return (
    <div>
        <Container>
            <div className='grid grid-cols-2'>
              <form onSubmit={handleSubmit(signin)} className='relative left-16 top-12 flex'>
                <div>
                <h3 className='text-3xl mb-4'>Ready to start your trip?</h3>
                <p className='text-xl mb-4'>Sign up to our website and start discovering tour favourite places!</p>
                <Input label="Enter fullname" {...register("fullName")}
                className='mb-4'
                />
                <Input label="Enter email" 
                className='mb-4'
                inputType="email" {...register("email", {required:true,validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }} )}/>
                <Input label="Enter password"
                className='mb-4'
                inputType='password' 
                {...register("password", {required:true})}
                />
                <Button>Submit</Button>
              </div>
              </form>
              <img src={catty} alt="" className='drop-shadow-[0_10px_10px_#603f2680] object-contain w-[80%]' />
            </div>

        </Container>
    </div>
  )
}

export default Signin