import React from 'react'
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import "leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import  axios from 'axios'

import { dashboardSelections } from './selectionSlice';
import { changeSelectedCountry,  changeSelectedDistrict,  changeSelectedCrop, changeClimateProduct, changeSoilProduct, changeStatsFigures, changeStatsLabels, changeSelectedProduct, changeSelectedIndicator} from './selectionSlice';
import Select from 'react-select'

import Navbar from './Navbar'
import '.././index.css'
import SubNav from './SubNav'
import Index from './index'
import ClimateIndex from './ClimateIndex'
import CustomClimateSelect from './CustomClimate';
import SideNavDrawer from './SideNavDrawer';
import crop from '../assets/crop.svg'
import cloud from '../assets/cloud.svg'
import soil from '../assets/soil.svg'
import land from '../assets/land.svg'
import moon from '../assets/moon.svg'
import ancil from '../assets/ancil.svg'
import close from '../assets/close_.svg'
import open_icon from '../assets/open.svg'
import close_icon from '../assets/close_icon.svg'
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
    const [district_option, setdistrict_option] = useState([])
    const [selected_district_id, setselected_district_id] = useState(null)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDrawerOpen2, setIsDrawerOpen2] = useState(true);
    const [stats_figures, setstats_figures] = useState([])
    const [stats_labels, setstats_labels] = useState([])
    
    const ancil_data_list = dashboardSlice.ancil_data

    let map = useRef(null);
    let country_name = useRef('')
    let crop_name = useRef('')
    let indicator = useRef('')
    let wmsLayer = useRef(null)
    let current_response = useRef(null)
    let current_geojson = useRef(null)
    let agb_legend = useRef(null)
    let crop_legend = useRef(null)
    let climate_legend = useRef(null)

    const handleDrawerToggle = () => {
      setIsDrawerOpen(true);
      // setIsDrawerOpen(!isDrawerOpen) to toggle open and close
      
      // document.getElementsByClassName("leaflet-bottom.leaflet-right .leaflet-control").style.position = "absolute"

    //  if(isDrawerOpen === true && crop_legend != null) {
    //   document.querySelector(".leaflet-bottom.leaflet-right .leaflet-control").style.position = "absolute"
    //   document.querySelector(".leaflet-bottom.leaflet-right .leaflet-control").style.right = "24.8vw"
    //   document.querySelector(".leaflet-bottom.leaflet-right .leaflet-control").style.top = "-15vh"

    //  }
    
    //     if(!isDrawerOpen && crop_legend != null) {
    //       document.querySelector(".leaflet-bottom.leaflet-right .leaflet-control").style.position = "absolute"
    //     document.querySelector(".leaflet-bottom.leaflet-right .leaflet-control").style.right = "0.2vw"
    //     document.querySelector(".leaflet-bottom.leaflet-right .leaflet-control").style.top = "-17vh"

    //     }
      
     
    };
   


 const onCountryChanged = e => {
    const changed_country = e
    console.log(changed_country, 'changed_country')
    country_name.current = changed_country
  

      setCountry(changed_country.value)

      //update the selected_region value using dispatch changeSelelcted region reducer
      dispatch(changeSelectedCountry(changed_country.value))
     fetchRegion()
   
  
  

  }
  const onDistrictChanged = e => {
    const changed_district = e
    console.log(changed_district, 'changed_district')
    // country_name.current = changed_country
  

      setDistrict({id:changed_district.value, name:changed_district.label})
      // console.log(e.target.value, 'e.target.value')

      //update the selected_region value using dispatch changeSelelcted region reducer
      dispatch(changeSelectedDistrict(changed_district.label))
    
    fetchDistricts(changed_district.value)
   
  
  

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
    // fetchRegion()
    // fetchRegion
   
  
  

  }
  // const onClimateChanged = e => {
  //   const changed_climate = e.target.getAttribute("data-name")
  //   console.log(changed_climate, 'changed_climate')
  //   // climate.current = changed_climate
  

  //     setClimate(e.target.getAttribute("data-name"))

  //     //update the selected_region value using dispatch changeSelelcted region reducer
  //     dispatch(changeClimateProduct(e.target.getAttribute("data-name")))
    
  // }
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
    dispatch(changeSelectedProduct(e.target.value))

  }


  const close_selection = () => {
    setOpen(false)
  }



 const countryOptions = dashboardselections.countries.map( selection => (
    selection
))
console.log(countryOptions, 'country options')

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

const snack_options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const districtOptions2 = district_option.map( selection => (
  <option key={selection.value} value={selection.label}>
      {selection.label}
</option>
))
const customoptions = (anArray) =>{
  var opt = anArray.map((item) => {
     return (
        <option key={item.value} value={item.label}  > 
        {item.label} 
        </option>
     )
  })
return opt
  
}
console.log(district_option, 'district option')




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

const fetchOptions = async() => {
    const wms = await axios.get(`http://139.84.229.39:8700/uneca-api-0.1/geojson/getgeojsoninfo/?district_names=ALL`);
        console.log(wms.data)
        var wms_resp = wms.data
        const cql_fiter_column = wms_resp['wms']['cql_column']
        const wms_layer_name = wms_resp['wms']['layer_name']
        const id = wms_resp['district_id']
        console.log(id, 'wms resp ids')
        const custom_districts = () => {
          var option = id.map( (item) => {
            return({ value: item.district_id, label:item.distinct_name

            })
            
          })
          console.log(option, 'options')

    
          // const districtids = district_option.map( (selection) => selection.value)
          // console.log(districtids, 'distritct ids')
       return  setdistrict_option(option)
          //  return option

        }
        custom_districts()

      
      }

    //fetch countries
    const fetchRegion = async() => {
  
      try {   
        if(current_geojson.current) map.current.removeLayer(current_geojson.current)
        if(wmsLayer.current)map.current.removeLayer(wmsLayer.current)
        // console.log(current_name.current, 'curent name')
        // var basin = current_name.current
        // console.log(basin, 'basin current')


        const wms = await axios.get(`http://139.84.229.39:8700/uneca-api-0.1/geojson/getgeojsoninfo/?district_names=ALL`);
        console.log(wms.data)
        var wms_resp = wms.data
        const cql_fiter_column = wms_resp['wms']['cql_column']
        const wms_layer_name = wms_resp['wms']['layer_name']
        const district_cql = cql_fiter_column + "=" +district['district_id']

        const resp = await axios.get(`http://139.84.229.39:8080/geoserver/wfs?request=GetFeature&service=WFS&version=1.0.0&typeName=${wms_layer_name}&outputFormat=application/json`);
       
        var aoi_data = resp.data
        console.log(aoi_data, 'aoi response')
        current_response.current = aoi_data
        console.log(current_response.current, 'current aoi')
    
        console.log(current_response.current.features[0].geometry.coordinates, 'multipolygon')
           // map.createPane("pane1000").style.zIndex = 300;
           current_geojson.current = L.geoJSON(current_response.current, {
            style: {
              color: "black",
              opacity: 1,
              fillOpacity:0,
              weight: 4
            }
            // pane: 'pane1000'
          })
          current_geojson.current.addTo(map.current)
          
          map.current.fitBounds(current_geojson.current.getBounds(), {
                  padding: [50, 50],
                });
       
        
        
      } catch (error) {
        console.log( error)
        
      }

      fetchOptions()
      // customoptions()
    }
    //fetch countries
    const fetchDistricts = async(id) => {
  
      try {   
        if(current_geojson.current) map.current.removeLayer(current_geojson.current)
        if(wmsLayer.current)map.current.removeLayer(wmsLayer.current)
        // console.log(current_name.current, 'curent name')
        // var basin = current_name.current
        // console.log(basin, 'basin current')


       
        
        // function titleCase(str) {
        //   str = str.toLowerCase().split(' ');
        //   for (var i = 0; i < str.length; i++) {
        //       str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
        //   }
        //   return str.join(' ');
        //   }
     
        // const mapped = id.map((item) => {
        //   return ({ value: item.district_id, label:item.district_name}) 
           
        // })
        // console.log(mapped, 'mapped object ids')

        // console.log(id[0].district_id, 'idddddd') 
        if(district_option != null) {
          console.log(district_option)
          const wms = await axios.get(`http://139.84.229.39:8700/uneca-api-0.1/geojson/getgeojsoninfo/?district_names=ALL`);
        console.log(wms.data)
        var wms_resp = wms.data
        const cql_fiter_column = wms_resp['wms']['cql_column']
        const wms_layer_name = wms_resp['wms']['layer_name']
        // const id = wms_resp['district_id']
        const district_cql = cql_fiter_column + "="  +id
        

        // const resp = await axios.get(`http://139.84.229.39:8080/geoserver/wfs?request=GetFeature&service=WFS&version=1.0.0&typeName=${wms_layer_name}&outputFormat=application/json`);
        
          const resp = await axios.get("http://139.84.229.39:8080/geoserver/wfs?request=GetFeature&service=WFS&version=1.0.0&typeName="
          +wms_layer_name+"&outputFormat=application/json&CQL_FILTER="+district_cql);

       
        var aoi_data = resp.data
        console.log(aoi_data, 'aoi response')
        current_response.current = aoi_data
        console.log(current_response.current, 'current aoi')
    
        // console.log(current_response.current.features[0].geometry.coordinates, 'multipolygon')
           // map.createPane("pane1000").style.zIndex = 300;
           current_geojson.current = L.geoJSON(current_response.current, {
            style: {
              color: "black",
              opacity: 1,
              fillOpacity:0,
              weight: 4
            }
            // pane: 'pane1000'
          })
          current_geojson.current.addTo(map.current)
          
          map.current.fitBounds(current_geojson.current.getBounds(), {
                  padding: [50, 50],
                });

        }
        
       
        
        
      } catch (error) {
        console.log( error)
        
      }
    }
//fetch stats
 const fetchCropStats = async () => {
 
  try {
    const response = await axios.get(`http://139.84.229.39:8700/uneca-api-0.1/data/get_statistics/?data_name=${dashboardSlice.selected_crop}&district_name=${district.name}&country_name=Malawi`);
    console.log('crop stats',response.data)
    var labels = Object.keys(response.data[0])
    var figures = Object.values(response.data[0])
    console.log('stats figures and labels', figures, labels)
    setstats_figures(figures)
    dispatch(changeStatsFigures(figures))


    setstats_labels(labels)
    dispatch(changeStatsLabels(labels))
  } catch (error) {
    
  }

}

const fetchAGBStats = async () => {
 
  try {
    const response = await axios.get(`http://139.84.229.39:8700/uneca-api-0.1/data/get_statistics/?data_name=Above Ground Biomass&district_name=${district.name}&country_name=Malawi`);
    console.log('crop stats',response.data)
    var labels = Object.keys(response.data[0])
    var figures = Object.values(response.data[0])
    console.log('stats figures and labels', figures, labels)
    setstats_figures(figures)
    dispatch(changeStatsFigures(figures))


    setstats_labels(labels)
    dispatch(changeStatsLabels(labels))
  } catch (error) {
    
  }

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
        styles: `Crop_Production_Crop_Suitability_${dashboardSlice.selected_crop}_${district.name}`,
        // bounds: map.current.getBounds(custom_polygon.current).toBBoxString(),
      
        format: 'image/png',
        transparent: true,
        opacity:1.0
        
        
       
   });
  
   wmsLayer.current.addTo(map.current);

    //add legend
    const addCropLegend = () => {
      if(crop_legend.current)map.current.removeControl(crop_legend.current)
      if(agb_legend.current)map.current.removeControl(agb_legend.current)
      if(wmsLayer.current){
        var legend = L.control({position:'bottomright'});
        crop_legend.current = legend
  
        crop_legend.current.onAdd = function(map) {
          var div = L.DomUtil.create("div", `${isDrawerOpen ? 'legend2' : 'legend'}`)
          // if( isDrawerOpen == true) {
          //   var div = L.DomUtil.create("div", 'legend')
          // } else{
          //   var div = L.DomUtil.create("div", 'legend2')
          // }
          
       
          
      div.innerHTML += (`<p>${dashboardSlice.selected_district} ${selected_radio}</p>`) + '<img src="' + `http://139.84.229.39:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=Landinvestment_datasets:${dashboardSlice.selected_crop}_Crop_Production_Crop_Suitability&LEGEND_OPTIONS=border:true;dx:10;fontSize:7;bgColor:0xFFFFFF;dpi:150" + '' />` ;
  
          
      let draggable = new L.Draggable(div); //the legend can be dragged around the div
      draggable.enable();
  
      return div;
      };
  
      crop_legend.current.addTo(map.current);
      }
  
     }
     addCropLegend()


     fetchCropStats()
  
    }

    if(clicked_link === 'Crop Production' && selected_radio === 'Agricultural Productivity') {
    
      wmsLayer.current =  L.tileLayer.wms("http://139.84.229.39:8080/geoserver/wms?", {
        pane: 'pane400',
        layers: `Landinvestment_datasets:Above_Ground_Biomass_Crop_Production_Agricultural_Productivity`,
        crs:L.CRS.EPSG4326,
        styles: `Crop_Production_Agricultural_Productivity_Above_Ground_Biomass_${district.name}`,
        // bounds: map.current.getBounds(custom_polygon.current).toBBoxString(),
      
        format: 'image/png',
        transparent: true,
        opacity:1.0
        
        
       
   });
  
   wmsLayer.current.addTo(map.current);

   //add legend
   const addAGBLegend = () => {
    if(agb_legend.current)map.current.removeControl(agb_legend.current)
    if(crop_legend.current)map.current.removeControl(crop_legend.current)
    if(wmsLayer.current){
      var legend = L.control({position:'bottomright'});
      agb_legend.current = legend

      agb_legend.current.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
        
    div.innerHTML += (`<p>${dashboardSlice.selected_district} Above Ground Biomass </p>`) + '<img src="' + "http://139.84.229.39:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=Landinvestment_datasets:Elevation_Climate_and_Geography_Climate&LEGEND_OPTIONS=border:true;dx:10;fontSize:7;bgColor:0xFFFFFF;dpi:150" + '" />' ;

        
    let draggable = new L.Draggable(div); //the legend can be dragged around the div
    draggable.enable();

    return div;
    };

    agb_legend.current.addTo(map.current);
    }

   }
   addAGBLegend()

   fetchAGBStats()
  
    }

  
}
const fetchClimate = (e) => {
  console.log(e, 'event')
  const climate_name = e
  dispatch(changeClimateProduct(climate_name))
  // console.log('climate data')
  setClimate(climate_name)
  
if(wmsLayer.current)map.current.removeLayer(wmsLayer.current)
map.current.createPane("pane400").style.zIndex = 200;
  if(clicked_link === 'Climate') {
    wmsLayer.current =  L.tileLayer.wms("http://139.84.229.39:8080/geoserver/wms?", {
      pane: 'pane400',
      layers: `Landinvestment_datasets:${climate_name}_Climate_and_Geography_Climate`,
      crs:L.CRS.EPSG4326,
      styles: `Climate_and_Geography_Climate_${climate_name}_${district.name}`,
      // bounds: map.current.getBounds(custom_polygon.current).toBBoxString(),
    
      format: 'image/png',
      transparent: true,
      opacity:1.0
      
      
     
 });

 wmsLayer.current.addTo(map.current);

  //add legend
  const addClimateLegend = () => {
    if(climate_legend.current)map.current.removeControl(climate_legend.current)
    if(crop_legend.current)map.current.removeControl(crop_legend.current)
    if(agb_legend.current)map.current.removeControl(agb_legend.current)
    if(wmsLayer.current){
      var legend = L.control({position:'bottomright'});
      climate_legend.current = legend

      climate_legend.current.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
        
    div.innerHTML += (`<p>${dashboardSlice.selected_district} ${climate_name}</p>`) + '<img src="' + `http://139.84.229.39:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=Landinvestment_datasets:${climate_name}_Climate_and_Geography_Climate&LEGEND_OPTIONS=border:true;dx:10;fontSize:7;bgColor:0xFFFFFF;dpi:150" + '' />` ;

        
    let draggable = new L.Draggable(div); //the legend can be dragged around the div
    draggable.enable();

    return div;
    };

    climate_legend.current.addTo(map.current);
    }

   }
   addClimateLegend()



   const fetchClimateStats = async () => {
 
    try {
      console.log(climate_name,'selected climate')
      const response = await axios.get(`http://139.84.229.39:8700/uneca-api-0.1/data/get_statistics/?data_name=${climate_name}&district_name=${district.name}&country_name=Malawi`);
      console.log('climate stats',response.data)
      var labels = Object.keys(response.data[0])
      var figures = Object.values(response.data[0])
      console.log('stats figures and labels', figures, labels)
      setstats_figures(figures)
      dispatch(changeStatsFigures(figures))
  
  
      setstats_labels(labels)
      dispatch(changeStatsLabels(labels))
    } catch (error) {
      
    }
  
  }


    fetchClimateStats()
    handleDrawerToggle()
 

  }

}







    useEffect(() => {
        setLeafletMap()
        
        // fetchRegion()
        // store.dispatch(setRegion())
        // eeInitialize();
        // fetchEarthEngine()
       
        
    
      
    }, [])
    useEffect(() => {
      // setLeafletMap()
      
      // fetchRegion()
      // store.dispatch(setRegion())
      // eeInitialize();
      // fetchEarthEngine()
     
     
      
  
    
  }, [district_option, district.name])

  return (
    <>
    <Navbar />
    <SubNav />
    <div className="selections" style={{
        display:'flex',
        flexDirection:'row',
        gap:'0.2rem',
        position:'absolute',
        top:'12.4vh',
        zIndex:100
    }}>
        {/* <select  id="region_selection"
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
       
    </select> */}

<Select 
    defaultValue={'Select Country'}
    onChange={onCountryChanged}
    options={countryOptions}
    placeholder={'Select Country'}
    />

    {/* <select name="" id="district_selection"
  
   
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
        
                <option value="" hidden>Select District</option>
         {customoptions(district_option)}
    </select> */}


    <Select 
    defaultValue={'Select District'}
    onChange={onDistrictChanged}
    options={district_option}
    placeholder={'Select District'}
    />

    </div>
    

    <div className="left_side_panel" >

        <div className="left_side_icons"
         style={{
          
            display:'flex',
            flexDirection: 'column',
            gap:'2.6rem'
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
        gap:'3.3rem'
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
              setClicked_link(link);setOpen(true);dispatch(changeSelectedIndicator(link))

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
        top:'30.2vh',
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

                
               
            </div> 
            
            : <p style={{
             marginTop:'25px',
             marginLeft:'100px'
            }}>Above Ground Biomass</p>
            
        }

<button type='button' 
                 style={{
                  width: '100px', 
                  height:'30px',
                  marginTop:'8vh',  
                  marginLeft:'140px', 
                  borderRadius:'10px', 
                  backgroundColor:'#1E4B5F',
                  color:'#fff',
                  outline:'none',
                  border:'none'}} onClick = { ()=> { fetchCrop();handleDrawerToggle()}}>fetch</button>
                  

    </div>
    : 



    
    clicked_link === 'Climate'? 
    <>
    {/* <select name="" id="climate_selection"
            placeholder=''
            value={climate}
            onChange={onClimateChanged}
            style={{
                position:'absolute',
                top:'39.8vh',
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
               
            </select> */}
            <div id="climate_selection" 
            style={{
              position:'absolute',
              top:'39.8vh',
              left:'1.2vw',
              width: '170px',
              height: '35px',
              borderRadius:'10px',
              marginTop:'25px',
              marginLeft:'100px',
              outline:'none',
              zIndex:100,
              color:'white',
              fontWeight:'600',
              fontFamily:'sans-serif',
              fontSize:'14px'
              
              
          
          }}>
            <CustomClimateSelect 
           fetchClimateData={  fetchClimate }
            />
              
            </div>
            
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
                top:'49.8vh',
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

{ isDrawerOpen == false ?  <img src={open_icon} alt=""  
style={{ position:'absolute', zIndex:120, right:'0.2vw', top:'50vh'}} 
onClick={ () => {isDrawerOpen == true? setIsDrawerOpen(false) : setIsDrawerOpen(true) }}
 /> : 

 <img src={close_icon} alt=""  
style={{ position:'absolute', zIndex:120, right:'24.9vw', top:'52vh'}} 
onClick={ () => {isDrawerOpen == true? setIsDrawerOpen(false) : setIsDrawerOpen(true) }}
 />

}


<SideNavDrawer isOpen={isDrawerOpen} onClose={handleDrawerToggle} />





    
    
    </>
  )
}

export default Dashboard