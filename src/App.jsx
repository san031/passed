
import './App.css'
import BuypassForm from './Components/buypassForm'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from '../src/Root'
import PassValidity from './Pages/PassValidity'
import ViewSpots from './Pages/ViewSpots'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signin from './Pages/Signin'
import { useContext, useEffect } from 'react'
import { UserContext } from './Context/UserContext'
import LogoutBtn from './Components/LogoutBtn'
import Spot from './Pages/Spot'
import ProtectedRoute from './Components/ProtectedRoute'
import Search from './Pages/Search'
import { Toaster } from 'react-hot-toast';


function App() {

      const baseUrl="http://127.0.0.1:8000/"
      

  const { user,setUser,setCartItem,setCount} = useContext(UserContext)
  useEffect(() => {
    const storedUser = localStorage.getItem("user")

    if (storedUser){
      setUser(JSON.parse(storedUser))
    }
    else
      setUser(null)
  }, [])


  useEffect(() => {
    const handleCart = async() => {
      if(user){
      await fetch(`${baseUrl}cart/UserCart/`,
        {
          method:"GET",
          headers : {"Content-Type" :"application/json", "Authorization":`Token ${user.token}`}
        }
      )
      .then(async(response) =>  {
        const res = await response.json()
        
        
        setCartItem(res.items)
        setCount(res.items.length)
        
        console.log(res) 
      })}
    }

    handleCart();
    
  }, [user,setCartItem, setCount])
  

  
  

  const router = createBrowserRouter([
    {
      path:"",
      element:<Root/>,
      children:[
        {path:'', element:<Home/>},
        { path:"/buypass",element:<BuypassForm/> },
       
        {path:"/viewAttractions", element:<ViewSpots/>},
        {path:"/login",element:<Login/>},
        {path:"/signin",element:<Signin/>},
        {path:"/search", element:<Search/>},
        {
          path:"", 
          element: <ProtectedRoute/>,
          children:[
            {path:"/logout", element :<LogoutBtn/>},
            {path:"viewAttractions/:id", element:<Spot/>},
             { path:"/checkvalidity", element:<PassValidity/>},

          ]
        }
        // {path:"/logout", element:<LogoutBtn/>},
        // {path:"/viewAttractions/:id", element:<Spot/>},

      ]
    }
  ])
  
return(
  <div>
    <Toaster position="top-center" />
  <RouterProvider router={router}/>
  </div>
  )
}

export default App
