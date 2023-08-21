import React from 'react'
import home_image from '../assets/agri.jpg'
import info from '../assets/about_.svg'
import './homepage.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './Navbar'

const HomePage = () => {
    const navigate = useNavigate() //navigate programmatically onclick
    const [isOpen, setisOpen] = useState(false)


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
      
        <div className='info_container'
        style={{
             display:'flex',
             flexDirection:'column',
              position:'absolute',
              top:'15vh',
              left:'20vw',
               justifyContent:'center', 
               alignItems:'center',
                backgroundColor:'#ccc',
                 zIndex:120, 
                 height:'65vh',
                 opacity:0.85,
                 padding:'20px',
                 paddingBottom:'60px',
                 borderRadius:'10px',
                 width:'60vw'}}>
                    <p className='title' style={{fontFamily:'sans-serif', fontSize:'40px', fontWeight:'bolder', color:'#1e4b5f'}}>Land Investment Portal</p>
                    <p  className='tagline' style={{fontFamily:'sans-serif', fontSize:'18px', fontWeight:'lighter'}}>Facilitating sustainable decision making to identify land for agricultural investment</p>
                    {/* <img src={info} alt="" style={{marginLeft:'20vw', marginTop:'2vh'}} /> */}
                    {/* <button style={{borderRadius:'20px',
                height: '40px',
                width:'200px', border:'none', color:'#fff', backgroundColor:'#164b75', cursor:'pointer'}}>More Info</button> */}

                
<br />
<div className="indicators" style={{ fontFamily:'sans-serif'}}>
<p style={{fontWeight:'bold'}}>Background Information</p>
<p> The Land Investment Portal is built so as to aid the government and Land Investors in decision making when it comes to agricultural Investment.</p>
<p>The portal utilizes data from various online repositories as well as those provided by UNECA and other partners for visualization</p>
                <p>
The dashboard consists of major indicators: </p>
  <div className="headings" style={{display:'flex', flexDirection:'column', gap:'1rem', fontFamily:'sans-serif', }}>
  <span>  <strong>Crop Productivity</strong>:Contains data on tea and cranberry suitability</span>
<span>  <strong>Climate</strong>:Contains data on elevation, evapotranspiration and soil carbon content</span> 
 <span> <strong>Soil Data</strong>:The data includes soil texture, Organic carbon, drainage, cations, nutrients</span> 
 
<span> <strong>Ancillary data</strong>:Contains visualization of market accessibility, economic activity by gender, road network, towns and demographics.</span>

{/* <span>Land Use</span>
<span>Night-time Light</span> */}
  </div>


  {/* <div className="sub_text" style={{display:'flex', flexDirection:'column', gap:'1rem', fontFamily:'sans-serif', marginTop:'-12.8vh', marginLeft:'8vw'}}>
 <span >Contains data on tea and cranberry suitability </span>
 <span style={{marginLeft:'-4.5vw'}}>The data displayed is of elevation, evapotranspiration and soil carbon content</span>
 <span style={{marginLeft:'-4vw'}}>The data inclides soil texture, Organic carbon, drainage, cations, nutrients</span>
 
 <span style={{marginLeft:'-1.5vw'}}>Contains visualization of market accessibility, economic activity by gender, road network, towns and demographics.

</span> 

  </div> */}
  

</div>

                <br />
                    <button type='button' className="button_slide slide_right" id='visit_dash'
                     style={{borderRadius:'20px',
                height: '40px',
                width:'200px', border:'none', color:'#fff', backgroundColor:'#164b75', marginTop:'2vh'}}
                onClick={() => navigate('dashboard')}>Visit Dashboard</button>
                 </div>
                
    </div>
    
  )
}

export default HomePage