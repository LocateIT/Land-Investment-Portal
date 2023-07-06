import React from 'react'
import right from '../assets/right_.svg'

const SubNav = () => {
  return (
    <div className='subnav' style={{ 
        display:'flex',
        flexDirection: 'row',
        gap:'1rem',
        backgroundColor:'#1E4B5F',
        position:'absolute',
        top:'7.8vh',
        width:'100vw',
        height: '4vh',
        alignItems:'center',
        color:'#fff',
        fontSize:'20px',
        fontFamily:'sans-serif'
        
        }}>
            <span>LIP</span>
            |
            <span>Malawi</span>
            <img src={right} alt="" className='right_icon' /> 
            <span>Blantyre</span>

    </div>
  )
}

export default SubNav