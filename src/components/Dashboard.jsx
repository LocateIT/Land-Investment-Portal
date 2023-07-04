import React from 'react'
import Navbar from './Navbar'
import '.././index.css'
import SubNav from './SubNav'

const Dashboard = () => {
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
    <div className="left_side_panel">
        
    </div>
    
    </>
  )
}

export default Dashboard