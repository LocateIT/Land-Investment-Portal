import React from 'react'
import home_image from '../assets/homepage.jpg'
import './homepage.css'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate() //navigate programmatically onclick
  return (
    <div className='homepage'>
        <img src={home_image} alt="" style={{height:'100vh', width:'100vw', marginLeft:'-0.43vw', marginTop:'-0.4vw', zIndex:50}}/>
        <div 
        style={{
             display:'flex',
             flexDirection:'column',
              position:'absolute',
              top:'15vh',
              left:'32vw',
               justifyContent:'center', 
               alignItems:'center',
                backgroundColor:'#ccc',
                 zIndex:120, 
                 height:'35vh',
                 opacity:0.7,
                 padding:'20px',
                 paddingBottom:'60px',
                 borderRadius:'10px',
                 width:'30vw'}}>
                    <p style={{fontFamily:'sans-serif', fontSize:'40px', fontWeight:'bolder'}}>Land Investment Portal</p>
                    <p style={{fontFamily:'sans-serif', fontSize:'18px', fontWeight:'lighter'}}>Facilitating sustainable decision making to identify land for agricultural investment</p>
                    <button type='button' class="button_slide slide_right" style={{borderRadius:'20px',
                height: '40px',
                width:'200px', border:'none'}}
                onClick={() => navigate('dashboard')}>Visit Dashboard</button>
                 </div>
                
    </div>
    
  )
}

export default HomePage