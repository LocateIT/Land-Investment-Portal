import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { dashboardSelections } from './selectionSlice';
import './SideNavDrawer.css';


import CropBar from '../components/charts/CropBar';
import CropPie from './charts/CropPie';

const SideNavDrawer = ({ isOpen, onClose , fetchFilteredData}) => {
  const dashboardselections = useSelector(dashboardSelections)
  //return the entire dashboard slice
  const dashboardSlice = useSelector((state) => state.dashboardselections)
  const [color_array, setcolor_array] = useState([])

  const [slider_value, setslider_value] = useState(0)
  const crop_color = ['blue',"#a8a800","#0c7437","#6aff4e","#ccc","#bd6860","green","#fff1d2"]
  const agb_color = ['#ee7245','#fdad61', '#fffebe', "#acd9e9","#2e7cb7", "#2c7bb6"]
  const precip_color = ["#c6cdd4", "#d1c8b0", "#d0bf90", "#7ba7b3", "#2871b0", "#08306b"]
  const temperature_color = ["#3aee5b", "#49883f", "#b8e38b", "#dbe5b3", "#e77d1a", "#f90f49"]
    let lulcChartData = {
        labels: dashboardSlice.stats_labels,
        datasets: [
          {
            data: dashboardSlice.stats_figures,
    
            backgroundColor:dashboardSlice.stats_color,
            barThickness: 40,
         
         
          },
        ],
      }

      let cropChartData = {
        labels: dashboardSlice.acreage_label,
        datasets: [
          {
            data: dashboardSlice.total_acreage,
    
            backgroundColor:dashboardSlice.stats_color,
            barThickness: 40,
         
         
          },
        ],
      }


      const input = document.querySelector("input");
const p = document.querySelector("label");

const sliderfunc = (e)  => {
  console.log('input event',e.target.value)
  fetchFilteredData(e.target.value)
  // const value = Number(input.value) / 100;
  const value = e.target.value
  setslider_value(value)
  // input.style.setProperty("--thumb-rotate", `${value * 720}deg`);
  p.innerHTML = Math.round(value * 100);
};



// useEffect(() => {
//   color_func()


 
// }, [color_array])

  return (
    <div className={`side-nav-drawer ${isOpen ? 'open' : ''}`}  >

      { dashboardSlice.selected_indicator === 'Crop Production' ?
       <> 


<span style={{fontFamily:'sans-serif', fontWeight:'600', color:'#1E4B5F', marginTop:'-12vh', marginLeft:'1vw'}}> { dashboardSlice.selected_product === 'Crop Suitability' ?
       `${dashboardSlice.selected_district}  ${dashboardSlice.selected_crop} Suitability` :
       dashboardSlice.selected_product === 'Agricultural Productivity' ? `${dashboardSlice.selected_district} Above Ground Biomass` : ''
      
      }</span>
      <div className="side-nav-content">
        { dashboardSlice.selected_product === 'Crop Suitability' ||   dashboardSlice.selected_product === 'Agricultural Productivity' ?

<>
<div  className="pie_chart_container" style={{ height: '350px', display:'flex',
             flexDirection:'column',
justifyContent:'center', 
// backgroundColor:'#f0f0f0',
padding:'10px',
               alignItems:'center',
               marginTop:'-6vh'}}>
                <CropPie data={lulcChartData} />
               </div>


<span style={{fontFamily:'sans-serif', fontWeight:'600', color:'#1E4B5F', marginTop:'10vh'}}> { dashboardSlice.selected_product === 'Crop Suitability' ?
       `${dashboardSlice.selected_district}  ${dashboardSlice.selected_crop} Total Acreage (Ha)` :
       dashboardSlice.selected_product === 'Agricultural Productivity' ? `${dashboardSlice.selected_district} Above Ground Biomass Total Acreage (Ha)` : ''
      
      }</span>

<div className="pie_chart_container" style={{ height: '350px', 
// backgroundColor:'#f0f0f0',
 padding:'10px'}}>
<CropBar data={cropChartData} /> </div>
      
      

      

      


</>
        

        
        : 

        ''
        }
       
      
        
      </div>
       
       </> 
       : ''}

{ dashboardSlice.selected_indicator === 'Climate' ?
       <> 


<span className='chart_title' style={{fontFamily:'sans-serif', marginTop:'10vh',fontFamily:'sans-serif', fontWeight:'600', color:'#1E4B5F',}}> { dashboardSlice.selected_climate === 'Elevation' ?
       `${dashboardSlice.selected_district}  ${dashboardSlice.selected_climate} (meters)`  :

       dashboardSlice.selected_climate === 'Precipitation' ?
       `${dashboardSlice.selected_district}  ${dashboardSlice.selected_climate} (mm)` :

       dashboardSlice.selected_climate === 'Temperature' ?
       `${dashboardSlice.selected_district}  ${dashboardSlice.selected_climate} ( °C)`:

       dashboardSlice.selected_climate === 'Evapotranspiration' ?
       `${dashboardSlice.selected_district}  ${dashboardSlice.selected_climate} ( °mm/s)`:


        ''
      
      }</span>
      <div className="side-nav-content">
        { dashboardSlice.selected_indicator === 'Climate' ?

        <CropBar data={lulcChartData} />
        : 

        ''
        }
       
      
        
      </div>


      
<p  style={{ fontFamily:'sans-serif', fontWeight:'550', color:'#1E4B5F',}}>Filter for Elevation</p>
<div className="slider-value" style={{ display:'flex' ,flexDirection:'row'}}>
<input type="range" name="slider" id="slider" onInput={sliderfunc} min={0} max={4000} step={100}/>
<p className='label' >{slider_value}</p>

</div>

<p  style={{ fontFamily:'sans-serif', fontWeight:'550', color:'#1E4B5F'}}>Filter for Temperature</p>
<div className="slider-value" style={{ display:'flex' ,flexDirection:'row'}}>
<input type="range" name="slider" id="slider" onInput={sliderfunc} min={0} max={4000} step={100}/>
<p className='label' >{slider_value}</p>

</div>


{/* <p  style={{ fontFamily:'sans-serif', fontWeight:'550', color:'#1E4B5F'}}>Filter for Precipitation</p>
<div className="slider-value" style={{ display:'flex' ,flexDirection:'row'}}>
<input type="range" name="slider" id="slider"  onChange={fetchFilteredData} onInput={sliderfunc} min={0} max={91} step={1}/>
<p className='label' >{slider_value}</p>

</div> */}

{/* <a className="twitter-link" href="https://twitter.com/phil_osophie" target="_blank" ></a> */}
      
       
       </> 
       : ''}
     
      {/* <button className="close-btn" onClick={onClose}>
        Close
      </button> */}
    </div>
  );
};

export default SideNavDrawer;
