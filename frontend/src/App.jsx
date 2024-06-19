import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from './components/Form'
import toast, { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
      <Form />
      <Toaster />
    </>
  )
}

export default App
