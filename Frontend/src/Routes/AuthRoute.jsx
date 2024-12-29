import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AuthRoute = () => {
  const token = localStorage.getItem("user-token")

  if(token){
    return <Navigate to={"/home"} />
  }
  return (
    <Outlet />
  )
}

export default AuthRoute