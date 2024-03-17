import React from 'react'
import AddToDo from './components/AddToDo'
import Todos from './components/Todos'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <>
      <h1>TODO REACT + TYPESCRIPT</h1>
      <Navbar/>
    
      <AddToDo/>
      <Todos />
    </>
    
  )
}

export default App
