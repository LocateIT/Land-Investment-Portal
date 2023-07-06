/* eslint-disable no-unused-vars */
import React from 'react'
import Navbar from './Navbar'
import '.././index.css'
import SubNav from './SubNav'
import crop from '../assets/crop.svg'
import cloud from '../assets/cloud.svg'
import soil from '../assets/soil.svg'
import land from '../assets/land.svg'
import moon from '../assets/moon.svg'
import ancil from '../assets/ancil.svg'

const Dashboard = () => {

    const left_panel_icons = [crop, cloud, soil, land, moon, ancil]
    const left_links = ['Crop Production', 'Climate', 'Soil Fertility', 'Land Use', 'Night-time Light', 'Ancillary Data']

  return (
    <>
    <Navbar />
    <SubNav />
    <div className="selections" style={{
        display:'flex',
        flexDirection:'row',
        gap:'1rem',
        position:'absolute',
        top:'12vh',
    }}>
        <select name="" id="region_selection"
    placeholder='Select Country'
    style={{
        // position:'absolute',
        // top:'12vh',
        width: '170px',
        height: '40px',
        

    }}>
         <option value="" >Select Country</option>
        <option value="">Malawi</option>
        <option value="">Guiniea</option>
    </select>

    <select name="" id="region_selection"
    placeholder='Select Country'
    style={{
        // position:'absolute',
        // top:'12vh',
        width: '170px',
        height: '40px',
        

    }}>
         <option value="" >Select District</option>
        <option value="">Blantyre</option>
        <option value="">Balaka</option>
    </select>

    </div>
    <div className="left_side_panel" >

        <div className="left_side_icons"
         style={{
          
            display:'flex',
            flexDirection: 'column',
            gap:'5rem'
        }}>
        {
            left_panel_icons.map((icon) => 
            <img src={icon} alt="icon" key={icon} style={{
                height:'50px',
                width:'30px',
               
                cursor:'pointer',
                marginLeft:'5px',
                marginTop:'5px'

            }}/>
            )
        }


        </div>

        <div className="left_side_links"
    style={{
        position:'absolute',
        display:'flex',
        flexDirection: 'column',
        gap:'8rem'
    }}>
        
    {
            left_links.map((link) =>
            <span key={link}
            style={{
                cursor:'pointer',
                color:'#fff',
                 marginTop:'15px',
                marginLeft:'40px',
               

            }}
            >{link}</span>
            
            )
        }
    </div>
       

        
    </div>
   
    
    </>
  )
}

export default Dashboard




:root {
  /* font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424; */

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
  overflow: hidden;
  width:'100vw';
  height:'100vh';
  margin:'0';
  
}
/*
a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
} */

.navbar{
  position: absolute;
  background-color:#003247 ;
  margin-top: -10px;
  width: 100vw;
  height: 8vh;
  display: flex;
  flex-direction: row;
  gap: 2rem;
}
.logo{
  height: 50px;
  margin-top: 12px;
}
.proj_name{
  height: 50px;
  width: 300px;
  margin-top: 12px;

}
.link_icons{
  display: flex;
  flex-direction: row;
  gap: 5rem;
  height: 30px;
  margin-left: 52vw;
  margin-top: 20px;
}
#region_selection{
  border-radius: 10px;
border: 1px solid #8A8888;
background: #F0EFEF;
outline: none;
}
.left_side_panel{
  width: 140px;
height: 800px;
border-radius: 10px;
background: #1E4B5F;
position: absolute;
top: 16.5vh;
display: flex;
flex-direction: row;
gap: 5rem;
margin-top: 5px;
}





















