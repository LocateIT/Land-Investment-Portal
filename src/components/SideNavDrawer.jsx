import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { dashboardSelections } from './selectionSlice';
import './SideNavDrawer.css';


import CropBar from '../components/charts/CropBar';

const SideNavDrawer = ({ isOpen, onClose }) => {
  const dashboardselections = useSelector(dashboardSelections)
  //return the entire dashboard slice
  const dashboardSlice = useSelector((state) => state.dashboardselections)

  const [slider_value, setslider_value] = useState(0)
    let lulcChartData = {
        labels: dashboardSlice.stats_labels,
        datasets: [
          {
            data: dashboardSlice.stats_figures,
    
            backgroundColor: [
              'blue',
              "#a8a800",
              "#0c7437",
              "#6aff4e",
              "#ccc",
              "#bd6860",
              "green",
              "#fff1d2",
              "#55ff00",
              '#4dd7ff',
              '#d2efff'
            ],
            barThickness: 40,
         
         
          },
        ],
      }


      const input = document.querySelector("input");
const p = document.querySelector("label");

const sliderfunc = (e)  => {
  console.log('input event',e.target.value)
  // const value = Number(input.value) / 100;
  const value = e.target.value
  setslider_value(value)
  // input.style.setProperty("--thumb-rotate", `${value * 720}deg`);
  p.innerHTML = Math.round(value * 100);
};
  return (
    <div className={`side-nav-drawer ${isOpen ? 'open' : ''}`}>

      { dashboardSlice.selected_indicator === 'Crop Production' ?
       <> 


<span style={{fontFamily:'cursive', marginTop:'10vh'}}> { dashboardSlice.selected_product === 'Crop Suitability' ?
       `${dashboardSlice.selected_district}  ${dashboardSlice.selected_crop} Suitability` :
       dashboardSlice.selected_product === 'Agricultural Productivity' ? `${dashboardSlice.selected_district} Above Ground Biomass` : ''
      
      }</span>
      <div className="side-nav-content">
        { dashboardSlice.selected_product === 'Crop Suitability' ||   dashboardSlice.selected_product === 'Agricultural Productivity' ?

        <CropBar data={lulcChartData} />
        : 

        ''
        }
       
      
        
      </div>
       
       </> 
       : ''}

{ dashboardSlice.selected_indicator === 'Climate' ?
       <> 


<span className='chart_title' style={{fontFamily:'cursive', marginTop:'10vh'}}> { dashboardSlice.selected_climate === 'Elevation' ?
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


      
<p  style={{ fontFamily:'cursive'}}>Filter for Elevation</p>
<div className="slider-value" style={{ display:'flex' ,flexDirection:'row'}}>
<input type="range" name="slider" id="slider" onInput={sliderfunc} min={0} max={4000} step={100}/>
<p className='label' >{slider_value}</p>

</div>

<p  style={{ fontFamily:'cursive'}}>Filter for Temperature</p>
<div className="slider-value" style={{ display:'flex' ,flexDirection:'row'}}>
<input type="range" name="slider" id="slider" onInput={sliderfunc} min={0} max={4000} step={100}/>
<p className='label' >{slider_value}</p>

</div>


<p  style={{ fontFamily:'cursive'}}>Filter for Precipitation</p>
<div className="slider-value" style={{ display:'flex' ,flexDirection:'row'}}>
<input type="range" name="slider" id="slider" onInput={sliderfunc} min={0} max={4000} step={100}/>
<p className='label' >{slider_value}</p>

</div>

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
