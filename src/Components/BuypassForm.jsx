import axios from 'axios'
import React, { useState} from 'react'

function BuypassForm() {
    
  const data={name:"",
    email:""  ,
    pass_type:""
  }

const [inputData, setInputdata] = useState(data)
  
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputData)
    axios.post('http://127.0.0.1:8000/buypass/', inputData)
    .then((response) => { console.log(response)})
    .catch((err) => console.log(err) )
    // axiosInstance.post(`buypass/`,inputData

    // )

    axios.get('http://127.0.0.1:8000/buypass/')
    .then((response)=>
      // console.log(response.data[setInputdata.length - 1].pass_code, setInputdata.length)
    //   console.log(response.data)
    console.log(response.data[response.data.length-1].pass_code)
    // <div>{response.data[response.data.length-1].pass_code}</div>
    )
  }

  
  const handleChange = (e) => {
    setInputdata({...inputData, [e.target.name]:e.target.value})
  }
  return (
    <>
    
      <h5 className='text-3xl m-[5%]'>Buy a Pass</h5>
      <div className='flex flex-col items-center'>
      <label htmlFor="nametextbox">Name:</label>
      <input type="text" name="name" id='nametextbox' placeholder='Enter your name' 
      value={inputData.name}
      onChange={(e) =>handleChange(e)}
      className='outline w-[30%]'
      />
      {""}
      <br />

      <label htmlFor="emailtextbox">Email:</label>
      <input type="email" name="email" placeholder='Enter your email' id='emailtextbox'
      value={inputData.email}
      onChange={(e) =>handleChange(e)}
      className='outline w-[30%]'
       />
       <br />

       <label htmlFor="g1">Select Pass Type</label>
       <select name="pass_type" id='g1' className='outline' value={inputData.passtype} onChange={(e) => handleChange(e)}>
        <option value={10}>1-Day Pass - $10</option>
        <option value={30}>3-Day Pass - $30</option>
        <option value={60}>6-Day Pass - $60</option>
       </select>
       <br />

       <button type="submit"
       className='bg-green-600 m-2.5 p-2.5 rounded-2xl w-36 cursor-pointer'
       onClick={(e) => {handleSubmit(e)}}>Buy Pass</button>
</div>
</>
  )
}

export default BuypassForm