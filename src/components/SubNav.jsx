import React from 'react'
import right from '../assets/right_.svg'
import { useDispatch, useSelector } from 'react-redux'
import { dashboardSelections } from './selectionSlice'

const SubNav = () => {
  const dispatch = useDispatch()
    const dashboardselections = useSelector(dashboardSelections)
    //return the entire dashboard slice
    const dashboardSlice = useSelector((state) => state.dashboardselections)

  return (
    <div className='subnav' style={{ 
        display:'flex',
        flexDirection: 'row',
        gap:'1rem',
        backgroundColor:'#1E4B5F',
        position:'absolute',
        top:'7.8vh',
        left:'-0.2vw',
        width:'100vw',
        height: '4vh',
        alignItems:'center',
        color:'#fff',
        fontSize:'18px',
        fontFamily:'sans-serif',
        paddingLeft:'15px'

        
        }}> 
        
    
          
        <span>LIP</span>
            |
            <span>{dashboardSlice.selected_country}</span>
            {/* {dashboardSlice.selected_country} */}

            { dashboardSlice.selected_district != '' ?

            <>
            <img src={right} alt="" className='right_icon' /> 
            <span>{dashboardSlice.selected_district}</span>
            </>
            : ''
             }


{ dashboardSlice.selected_indicator != '' ? 

<>
<img src={right} alt="" className='right_icon' /> 
            <span>{dashboardSlice.selected_indicator}</span>

</> : ''
 }
            
            

        
            

    </div>
  )
}

export default SubNav