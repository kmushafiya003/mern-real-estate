import React from 'react'
import { useSelector } from 'react-redux'
import Profile from '../pages/Profile'
import Signin from '../pages/Signin'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {

    const {user} = useSelector((state)=> state.user)
    
     const {currentUser} = user;

    

  return currentUser ? <Outlet /> : <Navigate to="/sign-in"/>
       
    
}

export default PrivateRoute