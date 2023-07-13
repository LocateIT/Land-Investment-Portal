import React from 'react'
import logo from '../assets/uneca_logo.png'
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
        <img className="logo" src={logo} />
        <img className="proj_name" src={proj_name} />
        <div className="link_icons">
            {/* {
                link_icons.map( (icon) => 
                <img src={icon} alt="" key={icon}  />
                )
            } */}
            <img src={home} alt="" onClick={() => navigate('/')}/>
            <img src={dashboard} alt="" />
            <img src={about} alt="" />
            <img src={language} alt="" />
        </div>


    </div>
  )
}

export default Navbar