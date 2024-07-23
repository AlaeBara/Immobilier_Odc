import React from 'react'
import NavBar from './NavBar/NavBar'
import { Outlet } from 'react-router-dom'

const Main_component = () => {
  return (
    <>
        <NavBar/>
        <Outlet/>
    </>
  )
}

export default Main_component