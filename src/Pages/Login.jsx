import React, { useContext, useState } from 'react';
import axios from 'axios'
import Container from '../Components/Container'
import Logo from '../Components/Logo';
import { useForm } from 'react-hook-form'
import { UserContext } from '../Context/UserContext';
import Input from '../Components/Input';
import Button from '../Components/Button';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

    const {register, handleSubmit} = useForm()
    const {user,setUser} = useContext(UserContext)
    const navigate = useNavigate()

    const handleLogin = async(data) => {
        try {
             console.log(data);
        const response = await fetch("http://127.0.0.1:8000/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        })

        console.log(response);
        // if(!response.ok)
        //     throw new Error("Login failed")

        

        const responseData = await response.json()

        // console.log(responseData);
        

        localStorage.setItem("user", JSON.stringify(responseData))

        setUser(responseData)
        if(user)
            navigate('/')
        } catch (error) {
         console.log("Login error", error.statusText);   
        }
       

    }
    return (
        <Container className='bg-amber-50 h-full w-full'>
            <div className='absolute h-full w-[60%] right-0  rounded-bl-full' >
                
                <div className='absolute flex flex-col'>
                    <Logo />
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <div>
                            <Input type="email" placeholder="Enter email" 
                            className='m-4'
                            {...register("email",{required:true})}
                            />
                            <Input type="password" placeholder="Enter Password"
                            className='m-4'
                            {...register("password",{required:true})}
                            />
                            <Button type="submit" className='m-4' >LogIn</Button>

                            <div>Don't have account?
                                <Link to='/signin'>SignUp here</Link>
                                 </div>
                        </div>
                    </form>
                </div>
            </div>
        </Container>
    );
}

export default Login;