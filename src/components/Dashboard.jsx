import React from 'react'
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import "leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

import { dashboardSelections } from './selectionSlice';
import { changeSelectedCountry, changeSelectedCrop} from './selectionSlice';

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
    const dispatch = useDispatch()
    const dashboardselections = useSelector(dashboardSelections)
    //return the entire dashboard slice
    const dashboardSlice = useSelector((state) => state.dashboardselections)


    const left_panel_icons = [crop, cloud, soil, land, moon, ancil]
    const left_links = dashboardSlice.indicators
    const [country, setCountry] = useState('')
    const [clicked_link, setClicked_link] = useState('')
    const [selected_radio, setSelected_radio] = useState(dashboardSlice.products[1])
    const [crop_, setCrop] = useState('')
    const [indicator_, setIndicator] = useState('')

    let map = useRef(null);
    let country_name = useRef('')
    let crop_name = useRef('')
    let indicator = useRef('')


 const onCountryChanged = e => {
    const changed_country = e.target.value
    console.log(changed_country, 'changed_country')
    country_name.current = changed_country
  

      setCountry(e.target.value)

      //update the selected_region value using dispatch changeSelelcted region reducer
      dispatch(changeSelectedCountry(e.target.value))
    //  fetchRegion()
   
  
  

  }

  const onIndicatorChanged = e => {
    const changed_indicator = e.target.value
    console.log(changed_indicator, 'changed indicator')
    indicator.current = e.target.value
    setIndicator(e.target.value)
  }

  const onCropChanged = e => {
    const changed_crop = e.target.value
    console.log(changed_crop, 'changed_crop')
    crop_name.current = changed_crop
  

      setCrop(e.target.value)

      //update the selected_region value using dispatch changeSelelcted region reducer
      dispatch(changeSelectedCrop(e.target.value))
    //  fetchRegion()
   
  
  

  }

  const onRadioChange = e => {
    setSelected_radio(e.target.value)
    console.log(e.target.value) //logs agri prod, crop suitabbility

  }




 const countryOptions = dashboardselections.countries.map( selection => (
    <option key={selection} value={selection}>
        {selection}
</option>
))

const cropOptions = dashboardselections.crops.map( selection => (
    <option key={selection} value={selection}>
        {selection}
</option>
))



    //map setup

    const setLeafletMap = () => {
        const mapboxLight =  L.tileLayer(
            "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
            {
              attribution:
                'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
              // maxZoom: 18,
              id: "mapbox/light-v11",
              accessToken:
                "pk.eyJ1IjoiY2hyaXNiYXJ0IiwiYSI6ImNrZTFtb3Z2bDAweTMyem1zcmthMGY0ejQifQ.3PzoCgSiG-1-sV1qJvO9Og",
            }
          );
      const mapboxSatellite =  L.tileLayer(
           "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}{r}?access_token={accessToken}",
           {
             attribution:
               'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      
             id: "mapbox/satellite-v9",
             accessToken:
               "pk.eyJ1IjoiY2hyaXNiYXJ0IiwiYSI6ImNrZTFtb3Z2bDAweTMyem1zcmthMGY0ejQifQ.3PzoCgSiG-1-sV1qJvO9Og",
           }
         );
      
         const mapbox =  L.tileLayer(
           "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
           {
             attribution:
               'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
             // maxZoom: 18,
             id: "mapbox/streets-v11",
             accessToken:
               "pk.eyJ1IjoiY2hyaXNiYXJ0IiwiYSI6ImNrZTFtb3Z2bDAweTMyem1zcmthMGY0ejQifQ.3PzoCgSiG-1-sV1qJvO9Og",
           }
         );


         var baseMaps = {
            MapBoxLight: mapboxLight,
            MapBox: mapbox,
            MapBoxSatellite: mapboxSatellite,
          };

    //       var container = L.DomUtil.get('map');
    //   if(container != null){
    //     container._leaflet_id = null;
    //   }

    if (map.current !== undefined && map.current !== null) { map.current.remove(); }//added

           map.current = L.map("map", {
            zoomControl: false,
            layersControl: false,
            center: [-13.223928386050057, 33.92745761647985],
            // drawControl: true,
            // minZoom: 6.5,
            // maxZoom: 20,
            zoom: 7,
            // measureControl: true,
            // defaultExtentControl: true,
            layers: [mapboxSatellite]
          }); // add the basemaps to the controls
      
          L.control.layers(baseMaps).addTo(map.current);
    }


    useEffect(() => {
        setLeafletMap()
        // fetchRegion()
        // store.dispatch(setRegion())
        // eeInitialize();
        // fetchEarthEngine()
       
        
    
      
    }, [])

  return (
    <>
    <Navbar />
    <SubNav />
    <div className="selections" style={{
        display:'flex',
        flexDirection:'row',
        gap:'1rem',
        position:'absolute',
        top:'12.4vh',
        zIndex:100
    }}>
        <select name="" id="region_selection"
    placeholder=''
    value={country}
    onChange={onCountryChanged}
    style={{
        // position:'absolute',
        // top:'12vh',
        width: '170px',
        height: '40px',
        

    }}>
         <option value="" >Select Country</option>
         { countryOptions }
       
    </select>

    <select name="" id="region_selection"
    placeholder='Select Country'
    style={{
        // position:'absolute',
        // top:'12vh',
        width: '170px',
        height: '40px',
        

    }}
    >
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
        gap:'6rem'
    }}>
        
    {
            left_links.map((link) =>
            <span key={link}
            style={{
                cursor:'pointer',
                color:'#fff',
                 marginTop:'15px',
                marginLeft:'40px',
                wordBreak:'break-word'
               

            }}
            // onClick={onIndicatorChanged}
            onClick={ () => setClicked_link(link)}
            >{link}</span>
            
            )
        }
    </div>
       

        
    </div>

    <div id='map' style={{
        width:'100vw',
        height:'88vh',
        position:'absolute',
        top:'11.8vh',
        left:'0vw',
        // backgroundColor:'pink',
        zIndex:99
    }}></div>


{
    clicked_link === 'Crop Production'? 
    <div className="selection_panel" style={{
        position:'absolute',
        left:'6.4vw',
        top:'17.2vh',
        backgroundColor:'#fff',
        width:'400px',
        height:'765px',
        zIndex:100,
        borderRadius:'10px'
    }}>
        {
            clicked_link === 'Crop Production' ?
            
            
            <div className="radio_selections" 
            style={{
              
               
                display:'flex',
                flexDirection:'row',
                gap:'0.5rem',
                marginTop: '20px'
            }}
            >
                <div className="labels"
                 style={{ display:'flex',
                flexDirection:'row',
                gap:'2rem' }}
                >

                <input type="radio" name="" id="crop_suitability"
                value={dashboardSlice.products[1]}
                checked={selected_radio === dashboardSlice.products[1]}
                onChange={onRadioChange}
                 style={{height:'30px', outline: "none"}} />

                <label htmlFor="">{dashboardSlice.products[1]}</label>

                <input type="radio" name="" id="agricultural_productivity"
                 value={dashboardSlice.products[0]}
                 checked={selected_radio === dashboardSlice.products[0]}
                 onChange={onRadioChange}  
                 style={{height:'30px', outline: "none"}}/> 

                <label htmlFor="">{dashboardSlice.products[0]}</label>
                


               

                </div>
                
                
                
                
            </div>


            :
            ''



        }

        {
            selected_radio === 'Crop Suitability' ? 
            <select name="" id="crop_selection"
            placeholder=''
            value={crop_}
            onChange={onCropChanged}
            style={{
                // position:'absolute',
                // top:'12vh',
                width: '170px',
                height: '30px',
                borderRadius:'10px',
                marginTop:'15px',
                marginLeft:'10px'
                
            
            }}>
                 <option value="" >Select crop</option>
                 { cropOptions }
               
            </select> : ''
        }

        


    </div>
    : clicked_link === 'Climate'? 
    <>
    </>

    : ''
}
    
    
    </>
  )
}

export default Dashboard