import React, { useEffect, useState } from 'react'
// import agra_fort from '../ImageUtils/agra_fort.jpg'
import Taj_Mahal from '../ImageUtils/Taj_Mahal.jpeg'
import Runner from '../ImageUtils/Runner.png'
import Whoa from '../ImageUtils/Whoa.png'
import '../App.css';
import Container from '../Components/Container'
import passedCover from '../ImageUtils/passedCover_transparent.png'
import SearchBar from '../Components/SearchBar';
import pinaColada from '../ImageUtils/pinaColada.png'
import Button from '../Components/Button';
import FeaturesSpots from './FeaturesSpots';

function Home() {
  // const [inputvalue, setInputvalue] = useState(50)

  // useEffect(() => {
  //   document.body.style.setProperty('--pos',`${inputvalue}%`)
  // }, [inputvalue])
  
  return (
//     <div className='flex justify-center items-center p-22'>
//     <div className=" relative h-[25rem] w-[30rem] overflow px- par">
//   <div className="space-y-[-14rem]">
//     <div className="relative z-10 bg-white shadow-xl rounded-2xl p-4 w-full h-80">
//       <img src={agra_fort} alt="Agra Fort" className="w-full h-full object-cover rounded-xl" />
//     </div>

//     <div className="relative z-20 bg-white shadow-xl rounded-2xl p-4 w-full h-80">
//       <img src={Taj_Mahal} alt="Taj Mahal" className="w-full h-full object-cover rounded-xl" />
//     </div>

//     <div className="relative z-30 bg-white shadow-xl rounded-2xl p-4 w-full h-80">
//       <img src={some_other_image} alt="Other Spot" className="w-full h-full object-cover rounded-xl" />
//     </div>
//   </div>
// <div className="compare">
//   <div className="before">
//       <img src={Runner} alt="Agra Fort" className="w-full h-full object-cover rounded-xl" />
//   </div>
  
//   <div className="after">
//           <img src={Whoa} alt="Taj Mahal" className="w-full h-full object-cover rounded-xl" />

//   </div>
//   <input type="range" name="" id="range" onInput={(e) => setInputvalue(e.target.value)} value={inputvalue}/>
// </div>

// </div>




//     </div>
<div>
  <Container>

    <div className='image-container'>
<img src={passedCover} alt="hgdfhg" className='drop-shadow-[0_10px_10px_#603f2680] object-contain  w-[56%] h-auto relative lg:-right-140 -right-120  top-12 '/>

    </div>
      <div className='typewriter'><p className='absolute left-25 top-40 font-bold text-black text-5xl text-center   z-100   '>We find the best tours </p></div>


      <SearchBar className='absolute left-20 top-120'/>
  </Container>

  <Container className='lg:top-28' >
    <img src={pinaColada} className='drop-shadow-[0_10px_10px_#603f2680] object-contain lg:w-[32%] md:w-[40%] w-[60%] h-auto  relative top-30 lg:top-36'/>
    <p className='absolute lg:top-52 top-40 lg:right-56  md:-right-0 -right-72 text-4xl'>A new way to explore the world</p>
    <p className='absolute lg:top-72 top-60 lg:right-48  md:-right-0 -right-72 lg:w-136 w-116 text-xl'>For decades travellers have reached for Lonely Planet books when looking to plan and execute their perfect 
trip, but now, they can also let Lonely Planet Experiences lead the way</p>

<Button className='abosulte top-64 left-40 '>Learn more</Button>

  </Container>

  <FeaturesSpots/>
</div>
  )
}

export default Home