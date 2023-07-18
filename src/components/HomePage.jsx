import React from 'react'
import home_image from '../assets/homepage.jpg'
import './homepage.css'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

const HomePage = () => {
    const navigate = useNavigate() //navigate programmatically onclick
  return (
    <div className='homepage' style={{display:'flex',
    flexDirection:'column',
justifyContent:'center', 
      alignItems:'center'}}>
        <img src={home_image} alt="" style={{height:'100vh', width:'100vw', marginLeft:'0', marginTop:'-0.4vw', zIndex:50}}/>
        <div className="navbar" style={{  zIndex:120, position:'absolute',
              top:'2vh', marginLeft:'0.1vw'}}>
        <Navbar />
        </div>
      
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
                 opacity:0.85,
                 padding:'20px',
                 paddingBottom:'60px',
                 borderRadius:'10px',
                 width:'30vw'}}>
                    <p style={{fontFamily:'sans-serif', fontSize:'40px', fontWeight:'bolder', color:'#1e4b5f'}}>Land Investment Portal</p>
                    <p style={{fontFamily:'sans-serif', fontSize:'18px', fontWeight:'lighter'}}>Facilitating sustainable decision making to identify land for agricultural investment</p>
                    <button type='button' class="button_slide slide_right" id='visit_dash'
                     style={{borderRadius:'20px',
                height: '40px',
                width:'200px', border:'none', color:'#fff', backgroundColor:'#164b75'}}
                onClick={() => navigate('dashboard')}>Visit Dashboard</button>
                 </div>
                
    </div>
    
  )
}

export default HomePage