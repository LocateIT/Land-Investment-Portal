import React from 'react'
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import "leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

import { dashboardSelections } from './selectionSlice';
import { changeSelectedCountry,  changeSelectedDistrict, changeSelectedCrop, changeClimateProduct, changeSoilProduct} from './selectionSlice';

import Navbar from './Navbar'
import '.././index.css'
import SubNav from './SubNav'
import Index from './index'
import crop from '../assets/crop.svg'
import cloud from '../assets/cloud.svg'
import soil from '../assets/soil.svg'
import land from '../assets/land.svg'
import moon from '../assets/moon.svg'
import ancil from '../assets/ancil.svg'
import close from '../assets/close_.svg'
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
    const [open, setOpen] = useState(true)
    const [climate, setClimate] = useState('')
    const [soil_, setSoil] = useState('')
    const [district, setDistrict] = useState('')
    const ancil_data_list = dashboardSlice.ancil_data

    let map = useRef(null);
    let country_name = useRef('')
    let crop_name = useRef('')
    let indicator = useRef('')
    let wmsLayer = useRef(null)
    // let climate = useRef('')


 const onCountryChanged = e => {
    const changed_country = e.target.value
    console.log(changed_country, 'changed_country')
    country_name.current = changed_country
  

      setCountry(e.target.value)

      //update the selected_region value using dispatch changeSelelcted region reducer
      dispatch(changeSelectedCountry(e.target.value))
    //  fetchRegion()
   
  
  

  }
  const onDistrictChanged = e => {
    const changed_district = e.target.value
    console.log(changed_district, 'changed_district')
    // country_name.current = changed_country
  

      setDistrict(e.target.value)

      //update the selected_region value using dispatch changeSelelcted region reducer
      dispatch(changeSelectedDistrict(e.target.value))
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
  const onClimateChanged = e => {
    const changed_climate = e.target.value
    console.log(changed_climate, 'changed_climate')
    // climate.current = changed_climate
  

      setClimate(e.target.value)

      //update the selected_region value using dispatch changeSelelcted region reducer
      dispatch(changeClimateProduct(e.target.value))
    
  }
  const onSoilChanged = e => {
    const changed_soil = e.target.value
    console.log(changed_soil, 'changed_soil')
    // climate.current = changed_climate
  

      setSoil(e.target.value)

      //update the selected_region value using dispatch changeSelelcted region reducer
      dispatch(changeSoilProduct(e.target.value))
    
  }

  const onRadioChange = e => {
    setSelected_radio(e.target.value)
    console.log(e.target.value) //logs agri prod, crop suitabbility

  }


  const close_selection = () => {
    setOpen(false)
  }



 const countryOptions = dashboardselections.countries.map( selection => (
    <option key={selection} value={selection}>
        {selection}
</option>
))

const cropOptions = dashboardselections.crops.map( selection => (
    <option key={selection} value={selection} style={{ }}>
        {selection}
</option>
))

const climateOptions = dashboardselections.climate_products.map( selection => (
  <option key={selection} value={selection}>
      {selection}
</option>
))
const soilOptions = dashboardselections.soil_products.map( selection => (
  <option key={selection} value={selection}>
      {selection}
</option>
))
const districtOptions = dashboardselections.districts.map( selection => (
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

//fetch crop data
const fetchCrop = () => {
  if(wmsLayer.current)map.current.removeLayer(wmsLayer.current)
  map.current.createPane("pane400").style.zIndex = 200;
  if(clicked_link === 'Crop Production' && selected_radio === 'Crop Suitability') {
    
      wmsLayer.current =  L.tileLayer.wms("http://139.84.229.39:8080/geoserver/wms?", {
        pane: 'pane400',
        layers: `Landinvestment_datasets:${dashboardSlice.selected_crop}_Crop_Production_Crop_Suitability`,
        crs:L.CRS.EPSG4326,
        styles: `Crop_Production_Crop_Suitability_${dashboardSlice.selected_crop}_${district}`,
        // bounds: map.current.getBounds(custom_polygon.current).toBBoxString(),
      
        format: 'image/png',
        transparent: true,
        opacity:1.0
        
        
       
   });
  
   wmsLayer.current.addTo(map.current);
  
    }
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

    <select name="" id="district_selection"
  
    value={district}
    onChange={onDistrictChanged}
    style={{
      borderRadius: '10px',
      border: '1px solid #8A8888',
      backgroundColor: '#F0EFEF',
      outline: "none",
        width: '170px',
        height: '40px',
        

    }}
    >
         <option value="" >Select District</option>
                {districtOptions}
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
            onClick={ () =>{
              setClicked_link(link);setOpen(true)

            } }
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
    clicked_link === 'Crop Production' && open? 
    <div className="selection_panel" style={{
        position:'absolute',
        left:'6.4vw',
        top:'17.2vh',
        backgroundColor:'#fff',
        width:'400px',
        height:'355px',
        zIndex:100,
        borderRadius:'10px',
        color:'#1E4B5F',
        fontWeight:'700',
        fontFamily:'sans-serif',
        fontSize:'14px'
    }}>
      <img src={close} alt="" style={{ marginLeft:'19.5vw', marginTop:'3px'}}  onClick={ close_selection} />
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
            <div 
           
            style={{
                // position:'absolute',
                // top:'12vh',
                // width: '170px',
                // height: '30px',
                color:'white',
                borderRadius:'10px',
                marginTop:'25px',
                marginLeft:'70px',
                outline:'none',zIndex:101
                
                
            
            }}>
                 <Index />

                 <button type='button' style={{marginTop:'20vh',  marginLeft:'70px'}} onClick={fetchCrop}>fetch</button>
               
            </div> 
            
            : <p style={{
             marginTop:'25px',
             marginLeft:'100px'
            }}>Above Ground Biomass</p>
            
        }

        


    </div>
    : 



    
    clicked_link === 'Climate'? 
    <>
    <select name="" id="climate_selection"
            placeholder=''
            value={climate}
            onChange={onClimateChanged}
            style={{
                position:'absolute',
                top:'31.8vh',
                left:'1.2vw',
                width: '170px',
                height: '35px',
                borderRadius:'10px',
                marginTop:'25px',
                marginLeft:'100px',
                outline:'none',
                zIndex:100
                
                
            
            }}>
                 <option value="" >Select Product</option>
                 { climateOptions }
               
            </select>
    </>
    
    : 

    clicked_link === 'Soil Fertility'? 
    <>
    <select name="" id="soil_selection"
            placeholder=''
            value={soil_}
            onChange={onSoilChanged}
            style={{
                position:'absolute',
                top:'45.8vh',
                left:'1.2vw',
                width: '170px',
                height: '35px',
                borderRadius:'10px',
                marginTop:'25px',
                marginLeft:'100px',
                outline:'none',
                zIndex:100
                
                
            
            }}>
                 <option value="" >Select Product</option>
                 { soilOptions }
               
            </select>
    </>
    
    : 
    clicked_link === 'Ancillary Data' && open ? 
    
    <div className="ancil_panel" style={{
      position:'absolute',
      left:'6.4vw',
      top:'77vh',
      backgroundColor:'#fff',
      width:'500px',
      height:'205px',
      zIndex:100,
      borderRadius:'10px',
      color:'#1E4B5F',
      fontWeight:'700',
      fontFamily:'sans-serif',
      fontSize:'14px'
    }}>
      <img src={close} alt="" style={{ marginLeft:'24.5vw', marginTop:'3px'}}  onClick={ close_selection} />
     
      {
        ancil_data_list.map((item) => 
        <>
         
        
        <div style={{ display: 'flex', flexDirection:'row', gap:'0.1rem', padding:'4px', marginTop:'5px'}}>
        <input type="checkbox" name="" id="" key={item} />
        <span >{item}</span>
        </div>
        </>
        
        )

      }



    </div>
    :

    clicked_link === 'Land Use' ?
    <div className="landuse" 
    style={{ position:'absolute',
    left:'6.4vw',
    top:'64vh',
    zIndex:100}}>
         <Index />
    </div>
 
    :
    ''

}





    
    
    </>
  )
}

export default Dashboard