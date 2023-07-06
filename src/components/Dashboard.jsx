import React from 'react'
import { useEffect, useRef, useState } from 'react';
import "leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

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
    const left_panel_icons = [crop, cloud, soil, land, moon, ancil]
    const left_links = ['Crop Production', 'Climate', 'Soil Fertility', 'Land Use', 'Night-time Light', 'Ancillary Data']

    let map = useRef(null);




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

          var container = L.DomUtil.get('map');
      if(container != null){
        container._leaflet_id = null;
      }


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
            layers: [mapboxLight]
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
            >{link}</span>
            
            )
        }
    </div>
       

        
    </div>

    <div id='map' style={{
        width:'100vw',
        height:'88vh',
        position:'absolute',
        top:'12vh',
        left:'0vw',
        // backgroundColor:'pink',
        zIndex:20
    }}></div>
    
    </>
  )
}

export default Dashboard