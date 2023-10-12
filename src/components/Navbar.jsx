import React from 'react'
import logo from '../assets/unecalogo.svg'
import proj_name from '../assets/proj_name.svg'
import home from '../assets/home.svg'
import dashboard from '../assets/dashboard.svg'
import about from '../assets/about.svg'
import language from '../assets/language.svg'
import '../index.css'
import { useNavigate } from 'react-router-dom'



const Navbar = () => {
  const navigate = useNavigate() //navigate programmatically onclick
    let link_icons = [home, dashboard, about, language]
  return (
    <div className='navbar'>
        <img className="logo" src={logo}  alt='The United Nations Economic Commission for Africa'/>
        <img className="proj_name" src={proj_name} alt='Land Investment Portal for Malawi, Guinea and Madagascar' />
        {/* <span>deliver ideas and actions for an empowered and transformed Africa</span> */}
        <div className="link_icons">
            {/* {
                link_icons.map( (icon) => 
                <img src={icon} alt="" key={icon}  />
                )
            } */}
            <img src={home} alt="homepage" onClick={() => navigate('/')} title='Homepage' style={{cursor:'pointer'}}/>
            <img src={dashboard} alt="dashboard" onClick={() => navigate('dashboard')} title='Dashboard' style={{cursor:'pointer'}} />
            <img src={about} alt="about" title='About' onClick={() => navigate('/')}  style={{cursor:'pointer'}}/>
            <img src={language} alt="language translation" title='Translations' style={{cursor:'pointer'}} />
        </div>


    </div>
  )
}

export default Navbar