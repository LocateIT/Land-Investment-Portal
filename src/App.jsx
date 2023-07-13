import { useState } from 'react'
import Dashboard from './components/Dashboard'
import HomePage from './components/HomePage'
import { Routes, Route, useNavigate } from 'react-router-dom'

// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes > 
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='dashboard' element={
         <div style={{
    
          marginLeft:'-6.2px',
          
      
        }}>
        <Dashboard />
        </div>
      }></Route>

    </Routes>
   
    
  )
}

export default App
