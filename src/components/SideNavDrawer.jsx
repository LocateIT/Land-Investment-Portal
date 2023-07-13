import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { dashboardSelections } from './selectionSlice';
import './SideNavDrawer.css';


import CropBar from '../components/charts/CropBar';

const SideNavDrawer = ({ isOpen, onClose }) => {
  const dashboardselections = useSelector(dashboardSelections)
  //return the entire dashboard slice
  const dashboardSlice = useSelector((state) => state.dashboardselections)

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


<span style={{fontFamily:'cursive', marginTop:'10vh'}}> { dashboardSlice.selected_climate ?
       `${dashboardSlice.selected_district}  ${dashboardSlice.selected_climate}` :
        ''
      
      }</span>
      <div className="side-nav-content">
        { dashboardSlice.selected_indicator === 'Climate' ?

        <CropBar data={lulcChartData} />
        : 

        ''
        }
       
      
        
      </div>
       
       </> 
       : ''}
     
      {/* <button className="close-btn" onClick={onClose}>
        Close
      </button> */}
    </div>
  );
};

export default SideNavDrawer;
