import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { terminal } from 'virtual:terminal'

import './App.css'
import Create from './components/Create'
import toast, { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'
import Read from './components/Read'
import Update from './components/Update'
import AllUsers from './components/AllUsers'
import EditUser from './components/EditUser'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/read' element={<Read />} />
        <Route path='/update' element={<Update />} />
        <Route path='/allusers' element={<AllUsers />} />
        <Route path='/edit-user/:id' element={<EditUser />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App
