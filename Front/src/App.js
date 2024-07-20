import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Sign from './components/Sign/Sign'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Sign />}/>
        <Route path='/test' element={<NavBar />}/>
      </Routes>
    </>
  )
}

export default App