import React from 'react'
import { useEffect, useRef, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import "leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import  axios from 'axios'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
// import { CachedTileLayer } from "@yaga/leaflet-cached-tile-layer"
// import { Deck } from "@deck.gl/core"
import CircularProgress from '@mui/material/CircularProgress'

import { dashboardSelections } from './selectionSlice';
import { changeSelectedCountry,  changeSelectedDistrict,  changeSelectedCrop, changeClimateProduct, changeSoilProduct, 
  changeStatsFigures, changeStatsLabels, changeAcreageLabel, changeTotalAcreage,
   changeSelectedProduct, changeSelectedIndicator, changeStatsColor} from './selectionSlice';
import Select from 'react-select'

import Navbar from './Navbar'
import '.././index.css'
import SubNav from './SubNav'
import Index from './index'
import ClimateIndex from './ClimateIndex'
import CustomClimateSelect from './CustomClimate';
import CustomSoil from './CustomSoil'
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
import add from '../assets/add.svg'
import minus from '../assets/minus.svg'
import layers from '../assets/layers.svg'
import CustomAncilSelect from './CustomAncil';
const Dashboard =  () => {
  const baseurl = 'http://139.84.229.39'
  
    const dispatch = useDispatch()
    const dashboardselections = useSelector(dashboardSelections)
    //return the entire dashboard slice
    const dashboardSlice = useSelector((state) => state.dashboardselections)


    const left_panel_icons = [crop, cloud, soil, land, moon, ancil]
    const left_links = dashboardSlice.indicators
    const [country, setCountry] = useState('')
    const [clicked_link, setClicked_link] = useState('')
    const [selected_radio, setSelected_radio] = useState(dashboardSlice.products[1])
    const [selected_ancil, setSelected_ancil] = useState(dashboardSlice.ancil_data[4])
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
    const [acreage_label, setacreage_label] = useState([])
    const [total_acreage, settotal_acreage] = useState([])
    const [baseMaps, setbaseMaps] = useState({})
    // const [clicked_basemap, setclicked_basemap] = useState('')
    const [currentBasemap, setCurrentBasemap] = useState(null);
    
  const [slider_value, setslider_value] = useState('')
  const [temp_slider_value, settemp_slider_value] = useState('')
  const [elevation_slider_value, set_elevation_slider_value] = useState('')


    const [color_array, setcolor_array] = useState([])
    const crop_color = ['blue',"#a8a800","#0c7437","#6aff4e","#ccc","#bd6860","green","#fff1d2"]
    const tobacco_color = ['#e8c5be',"#f8a36b","#faaf17","#a6b036","#136300"]
    const agb_color = ["#f2f2a3", "#ffff00", "#ff0000", "#b007ed", "#071dad"]
    const agb_color2 = ["magenta", "magenta", "magenta", "red", "purple"]
    const precip_color = ["#c6cdd4", "#d1c8b0", "#d0bf90", "#7ba7b3", "#2871b0", "#08306b"]
    const temperature_color = ["#3aee5b", "#49883f", "#b8e38b", "#dbe5b3", "#e77d1a", "#f90f49"]
    const elevation_color = ['#ee7245','#fdad61', '#fffebe', "#acd9e9","#2e7cb7", "#2c7bb6"]
    const [loader, setloader] = useState(false)
    const [ntl_layer, setntl_layer] = useState(null)
  
    
    const ancil_data_list = dashboardSlice.ancil_data

    let map = useRef(null);
    let country_name = useRef('')
    let crop_name = useRef('')
    let indicator = useRef('')
    let wmsDemographicsLayer = useRef(null)
    let wmsLayer = useRef(null)
    let wmsNTLLayer = useRef(null)
    let current_response = useRef(null)
    let current_wms_response = useRef(null)
    let current_geojson = useRef(null)
    //  let wmsCountryLayer = useRef(null)
    let agb_legend = useRef(null)
    let district_agb_legend = useRef(null)
    let crop_legend = useRef(null)
    let district_crop_legend = useRef(null)
    let climate_legend = useRef(null)
    let district_climate_legend = useRef(null)
    let ntl_legend = useRef(null)
    let district_lulc_legend = useRef(null)
    let lulc_legend = useRef(null)
    let soil_legend = useRef(null)
    let pop_legend = useRef(null)
    let accessibility_legend = useRef(null)
    // let baseMaps = useRef(null)
    let clicked_basemap = useRef('')
    let base_map_ctrl_selections = useRef(false)
    let base_map_ctrl_cliked = useRef(false) 

    let country_code = useRef(null)
    let bounds = useRef([])
    let ancil_check = useRef(null)
    let climate_ref = useRef('')
    let wmsCountryLayer = useRef(null)
    let opacity_value = useRef('1')
    let wmsLULC = useRef(null)
    let wmsDistrictLULC = useRef(null)
    let separated_soil_product = useRef(null)
    let loading = useRef(null)
    let layergroup_ntl = useRef(null)
    let wms_ntl = useRef(null)
    let districtname = useRef(null)


    const handleDrawerToggle = () => {
      setIsDrawerOpen(true);
     
      
     
    };
   


 const onCountryChanged = async (e)  => {
    const changed_country = e
    console.log(changed_country, 'changed_country')
    country_name.current = changed_country.value
  

      setCountry(changed_country.value)

      //update the selected_region value using dispatch changeSelelcted region reducer
      dispatch(changeSelectedCountry(changed_country.value))
      if(wmsLULC.current)map.current.removeLayer(wmsLULC.current)
      // if(wmsNTLLayer.current)map.current.removeLayer(wmsNTLLayer.current)
      if(wmsLayer.current)map.current.removeLayer(wmsLayer.current)
      if(wmsDistrictLULC.current)map.current.removeLayer(wmsDistrictLULC.current)
      // if(ntl_layer)map.current.removeLayer(ntl_layer)

     fetchRegion()
    //  fetchNTL()
    
    // if(layergroup_ntl.current != null) layergroup_ntl.current.clearLayers()


    if(clicked_link === 'Night-time Light' && wmsCountryLayer.current != null ) { //&& current_geojson.current === null
      var taifa = country_name.current
      
      if(wmsLayer.current)map.current.removeLayer(wmsLayer.current)
      if(wmsNTLLayer.current)map.current.removeLayer(wmsNTLLayer.current)
      // if(ntl_layer)map.current.removeLayer(ntl_layer)
      if(wmsDemographicsLayer.current)map.current.removeLayer(wmsDemographicsLayer.current)
      if(wmsLULC.current)map.current.removeLayer(wmsLULC.current)
      if(wmsDistrictLULC.current)map.current.removeLayer(wmsDistrictLULC.current)
     map.current.createPane("pane400").style.zIndex = 200;
    //  console.log('NTL')
  
  
    const wmsresponse = await axios.get(`${baseurl}:8700/uneca-api-0.1/data/getwmslayer/?product=Socioeconomics&sub_product=Ntl&data_name=Night Time Light&country_name=${taifa}`, {
     
    })
    
    current_wms_response.current = wmsresponse.data
    const ntl_wms = current_wms_response.current
    console.log(current_wms_response.current, 'current ntl use response')
  
     wmsNTLLayer.current = L.tileLayer.wms(`${baseurl}:8080/geoserver/wms?`, {
       pane: 'pane400',
       layers: ntl_wms.layername,
       crs:L.CRS.EPSG4326,
       styles:ntl_wms.sldname,
       format: 'image/png',
       transparent: true,
       opacity:1.0
       
       
      
  });
  
  // layergroup_ntl.current  = L.layerGroup().addTo(map.current)
  // = layergroup
  // setntl_layer(wmsNTLLayer.current)
  
  wmsNTLLayer.current.addTo(map.current);
  const addNTLLegend = () => {
    // clearLegends()
    if(pop_legend.current)map.current.removeControl(pop_legend.current)
        if(lulc_legend.current)map.current.removeControl(lulc_legend.current)
        if(soil_legend.current)map.current.removeControl(soil_legend.current)
        if(climate_legend.current)map.current.removeControl(climate_legend.current)
        if(district_climate_legend.current)map.current.removeControl(district_climate_legend.current)
        if(ntl_legend.current)map.current.removeControl(ntl_legend.current)
        if(crop_legend.current)map.current.removeControl(crop_legend.current)
        if(agb_legend.current)map.current.removeControl(agb_legend.current)
        if(district_crop_legend.current)map.current.removeControl(district_crop_legend.current)
        if(district_lulc_legend.current)map.current.removeControl(district_lulc_legend.current)
  
  
    if(wmsNTLLayer.current){
      var legend = L.control({position:'bottomright'});
      ntl_legend.current = legend
  
      ntl_legend.current.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
        
    div.innerHTML += (`<p>${country_name.current} Night-time Light</p>`) + '<img src="' + `${baseurl}:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=Landinvestment_datasets:${country_name.current}_Night_Time_Light_Socioeconomics_Ntl&LEGEND_OPTIONS=border:true;dx:10;fontSize:7;bgColor:0xFFFFFF;dpi:150" + '' />` ;
  
        
    let draggable = new L.Draggable(div); //the legend can be dragged around the div
    draggable.enable();
  
    return div;
    };
  
    ntl_legend.current.addTo(map.current);
    }
  
   }
   addNTLLegend()
    }

    //land use
    if(clicked_link === 'Land Use' && wmsCountryLayer.current != null ) {
      // setloading(true)
      // loading.current = true
      console.log(loading.current , 'first Loading state')
      
      
      if(wmsLayer.current)map.current.removeLayer(wmsLayer.current)
      if(wmsLULC.current)map.current.removeLayer(wmsLULC.current)
      if(wmsNTLLayer.current)map.current.removeLayer(wmsNTLLayer.current)
      if(wmsDistrictLULC.current)map.current.removeLayer(wmsDistrictLULC.current)
      if(wmsDemographicsLayer.current)map.current.removeLayer(wmsDemographicsLayer.current)
      
      // current_geojson.current = null
      var taifa = country_name.current
      map.current.createPane("pane400").style.zIndex = 200;
      console.log('LAND USE')
  
  
      const wmsresponse = await  axios.get(`${baseurl}:8700/uneca-api-0.1/data/getwmslayer/?product=Socioeconomics&sub_product=Otherlayers&data_name=Land Use&country_name=${taifa}`, {
     
      })
      const land_wms = wmsresponse.data 
      current_wms_response.current = wmsresponse.data
  
      console.log(current_wms_response.current, 'current land use response')
      
      wmsLULC.current =  L.tileLayer.wms(`${baseurl}:8080/geoserver/wms?`, {
        pane: 'pane400',
        layers: land_wms.layername,
        crs:L.CRS.EPSG4326,
        styles: land_wms.sldname,
        format: 'image/png',
        transparent: true,
        opacity:1.0
        
        
       
   });
   
   
   wmsLULC.current.addTo(map.current);
  
   const addLULCLegend = () => {
    // clearLegends()
        if(district_climate_legend.current)map.current.removeControl(district_climate_legend.current)
        if(climate_legend.current)map.current.removeControl(climate_legend.current)
        if(pop_legend.current)map.current.removeControl(pop_legend.current)
        if(lulc_legend.current)map.current.removeControl(lulc_legend.current)
        if(district_lulc_legend.current)map.current.removeControl(district_lulc_legend.current)
        if(soil_legend.current)map.current.removeControl(soil_legend.current)
        if(climate_legend.current)map.current.removeControl(climate_legend.current)
        if(ntl_legend.current)map.current.removeControl(ntl_legend.current)
        if(crop_legend.current)map.current.removeControl(crop_legend.current)
        if(agb_legend.current)map.current.removeControl(agb_legend.current)
        if(district_crop_legend.current)map.current.removeControl(district_crop_legend.current)
  
    // if(wmsDistrictLULC.current){
      var legend = L.control({position:'bottomright'});
      lulc_legend.current = legend
  
      lulc_legend.current.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
  
    var taifa = country_name.current
        
    div.innerHTML += (`<p>${taifa} Land Use</p>`) + '<img src="' + `${baseurl}:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=Landinvestment_datasets:${taifa}_Land_Use_Socioeconomics_Otherlayers&LEGEND_OPTIONS=border:true;dx:10;fontSize:7;bgColor:0xFFFFFF;dpi:150" + '' />` ;
  
        
    let draggable = new L.Draggable(div); //the legend can be dragged around the div
    draggable.enable();
  
    return div;
    };
  
    lulc_legend.current.addTo(map.current);
    // }
  
   }
   addLULCLegend()
  }
   
 
  
    
  }
  const onDistrictChanged = async (e) => {

    if(wmsLULC.current)map.current.removeLayer(wmsLULC.current)
    if(current_geojson.current) map.current.removeLayer(current_geojson.current)
    if(wmsCountryLayer.current) map.current.removeLayer(wmsCountryLayer.current)
    if(wmsLayer.current)map.current.removeLayer(wmsLayer.current)
    if(wmsCountryLayer.current)map.current.removeLayer(wmsCountryLayer.current)
    if(wmsNTLLayer.current)map.current.removeLayer(wmsNTLLayer.current)
    if(wmsDistrictLULC.current)map.current.removeLayer(wmsDistrictLULC.current)


    const changed_district = e
    console.log(changed_district, 'changed_district')
    // country_name.current = changed_country
  

      setDistrict({id:changed_district.value, name:changed_district.label})
      // console.log(e.target.value, 'e.target.value')

      //update the selected_region value using dispatch changeSelelcted region reducer
      dispatch(changeSelectedDistrict(changed_district.label))
    
    fetchDistricts(changed_district.value)

    districtname.current = changed_district.label
    
         //district level ntl
  if(clicked_link === 'Night-time Light' ) { 
    console.log(district.name, 'district in ntl')
    if(wmsLayer.current)map.current.removeLayer(wmsLayer.current)
    if(wmsNTLLayer.current)map.current.removeLayer(wmsNTLLayer.current)
    // if(ntl_layer)map.current.removeLayer(ntl_layer)
    if(wmsDemographicsLayer.current)map.current.removeLayer(wmsDemographicsLayer.current)
    if(wmsLULC.current)map.current.removeLayer(wmsLULC.current)
    if(wmsDistrictLULC.current)map.current.removeLayer(wmsDistrictLULC.current)

    var taifa = country_name.current
   map.current.createPane("pane400").style.zIndex = 200;
   console.log('NTL')


//district.name //to be returned if need be

   
  const wmsresponse = await  axios.get(`${baseurl}:8700/uneca-api-0.1/data/getwmslayer/?product=Socioeconomics&sub_product=Ntl&data_name=Night Time Light&district_name=${changed_district.label}&country_name=${taifa}`, {
   
  })
  
  current_wms_response.current = wmsresponse.data
  const ntl_wms = current_wms_response.current
  console.log(current_wms_response.current, 'current ntl use response')


   wmsNTLLayer.current = L.tileLayer.wms(`${baseurl}:8080/geoserver/wms?`, {
    pane: 'pane400',
    layers: ntl_wms.layername,
    crs:L.CRS.EPSG4326,
    styles:ntl_wms.sldname,
     format: 'image/png',
     transparent: true,
     opacity:1.0
     
     
    
});

wmsNTLLayer.current.addTo(map.current);


const addNTLLegend = () => {
 // clearLegends()
 if(pop_legend.current)map.current.removeControl(pop_legend.current)
     if(lulc_legend.current)map.current.removeControl(lulc_legend.current)
     if(soil_legend.current)map.current.removeControl(soil_legend.current)
     if(climate_legend.current)map.current.removeControl(climate_legend.current)
     if(district_climate_legend.current)map.current.removeControl(district_climate_legend.current)
     if(ntl_legend.current)map.current.removeControl(ntl_legend.current)
     if(crop_legend.current)map.current.removeControl(crop_legend.current)
     if(agb_legend.current)map.current.removeControl(agb_legend.current)
     if(district_lulc_legend.current)map.current.removeControl(district_lulc_legend.current)

 if(wmsNTLLayer.current){
   var legend = L.control({position:'bottomright'});
   ntl_legend.current = legend

   ntl_legend.current.onAdd = function(map) {
 var div = L.DomUtil.create("div", "legend");
     
 div.innerHTML += (`<p>${districtname.current} Night-time Light</p>`) + '<img src="' + `${baseurl}:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=Landinvestment_datasets:${country_name.current}_Night_Time_Light_Socioeconomics_Ntl&LEGEND_OPTIONS=border:true;dx:10;fontSize:7;bgColor:0xFFFFFF;dpi:150" + '' />` ;

     
 let draggable = new L.Draggable(div); //the legend can be dragged around the div
 draggable.enable();

 return div;
 };

 ntl_legend.current.addTo(map.current);
 }

}
addNTLLegend()
}

   //land use
   if(clicked_link === 'Land Use' ) {
    console.log(district.name, 'selected district')

    var taifa = country_name.current
    map.current.createPane("pane400").style.zIndex = 200;
    console.log('lAND USE')

    districtname.current = e.label
    console.log(districtname.current, 'land use event')

    const wmsresponse = await axios.get(`${baseurl}:8700/uneca-api-0.1/data/getwmslayer/?product=Socioeconomics&sub_product=Otherlayers&data_name=Land Use&district_name=${districtname.current}&country_name=${taifa}`, {
   
    })
    
    current_wms_response.current = wmsresponse.data
    const land_wms = current_wms_response.current
    console.log(current_wms_response.current, 'current land use response')
    
   

    wmsNTLLayer.current =  L.tileLayer.wms(`${baseurl}:8080/geoserver/wms?`, {
      pane: 'pane400',
      layers: land_wms.layername,
      crs:L.CRS.EPSG4326,
      styles: land_wms.sldname,
      format: 'image/png',
      transparent: true,
      opacity:1.0
      
  
      
     
  });
  
  wmsNTLLayer.current.addTo(map.current);

  const addLULCLegend = () => {
    // clearLegends()
        if(district_climate_legend.current)map.current.removeControl(district_climate_legend.current)
        if(climate_legend.current)map.current.removeControl(climate_legend.current)
        if(pop_legend.current)map.current.removeControl(pop_legend.current)
        if(lulc_legend.current)map.current.removeControl(lulc_legend.current)
        if(district_lulc_legend.current)map.current.removeControl(district_lulc_legend.current)
        if(soil_legend.current)map.current.removeControl(soil_legend.current)
        if(climate_legend.current)map.current.removeControl(climate_legend.current)
        if(ntl_legend.current)map.current.removeControl(ntl_legend.current)
        if(crop_legend.current)map.current.removeControl(crop_legend.current)
        if(agb_legend.current)map.current.removeControl(agb_legend.current)
        if(district_crop_legend.current)map.current.removeControl(district_crop_legend.current)
  
    // if(wmsDistrictLULC.current){
      var legend = L.control({position:'bottomright'});
      lulc_legend.current = legend
  
      lulc_legend.current.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
  
    var taifa = country_name.current
        
    div.innerHTML += (`<p>${districtname.current } Land Use</p>`) + '<img src="' + `${baseurl}:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=Landinvestment_datasets:${taifa}_Land_Use_Socioeconomics_Otherlayers&LEGEND_OPTIONS=border:true;dx:10;fontSize:7;bgColor:0xFFFFFF;dpi:150" + '' />` ;
  
        
    let draggable = new L.Draggable(div); //the legend can be dragged around the div
    draggable.enable();
  
    return div;
    };
  
    lulc_legend.current.addTo(map.current);
    // }
  
   }
   addLULCLegend()
  
  // const addLULCLegend = () => {
  //   // clearLegends()
  //       if(district_climate_legend.current)map.current.removeControl(district_climate_legend.current)
  //       if(climate_legend.current)map.current.removeControl(climate_legend.current)
  //       if(accessibility_legend.current)map.current.removeControl(accessibility_legend.current)
  //       if(pop_legend.current)map.current.removeControl(pop_legend.current)
  //       if(lulc_legend.current)map.current.removeControl(lulc_legend.current)
  //       if(soil_legend.current)map.current.removeControl(soil_legend.current)
  //       if(climate_legend.current)map.current.removeControl(climate_legend.current)
  //       if(ntl_legend.current)map.current.removeControl(ntl_legend.current)
  //       if(crop_legend.current)map.current.removeControl(crop_legend.current)
  //       if(agb_legend.current)map.current.removeControl(agb_legend.current)
  //       if(district_crop_legend.current)map.current.removeControl(district_crop_legend.current)
  
  //   // if(wmsDistrictLULC.current){
  //     var legend = L.control({position:'bottomright'});
  //     district_lulc_legend.current = legend
  
  //     district_lulc_legend.current.onAdd = function(map) {
  //   var div = L.DomUtil.create("div", "legend");
  
  //   var taifa = country_name.current
        
  //   div.innerHTML += (`<p>${dashboardSlice.selected_district} Land Use</p>`) + '<img src="' + `${baseurl}:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=Landinvestment_datasets:${taifa}_Land_Use_Socioeconomics_Otherlayers&LEGEND_OPTIONS=border:true;dx:10;fontSize:7;bgColor:0xFFFFFF;dpi:150" + '' />` ;
  
        
  //   let draggable = new L.Draggable(div); //the legend can be dragged around the div
  //   draggable.enable();
  
  //   return div;
  //   };
  
  //   district_lulc_legend.current.addTo(map.current);
  //   // }
  
  //  }
  //  addLULCLegend()
  }
  
  
  

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
   
   
  
  

  }
  
  const onSoilChanged = e => {
    const changed_soil = e.target.value
    console.log(changed_soil, 'changed_soil')
    // climate.current = changed_climate
  

      setSoil(e.target.value)

      //update the selected_region value using dispatch changeSelelcted region reducer
      // dispatch(changeSoilProduct(e.target.value))
    
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
                'UNECA ',
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
             ' UNECA ',
      
             id: "mapbox/satellite-v9",
             accessToken:
               "pk.eyJ1IjoiY2hyaXNiYXJ0IiwiYSI6ImNrZTFtb3Z2bDAweTMyem1zcmthMGY0ejQifQ.3PzoCgSiG-1-sV1qJvO9Og",
           }
         );
      
         const mapbox =  L.tileLayer(
           "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
           {
             attribution:
             ' UNECA ',
             // maxZoom: 18,
             id: "mapbox/streets-v11",
             accessToken:
               "pk.eyJ1IjoiY2hyaXNiYXJ0IiwiYSI6ImNrZTFtb3Z2bDAweTMyem1zcmthMGY0ejQifQ.3PzoCgSiG-1-sV1qJvO9Og",
           }
         );


         var basemaps_object = {
            MapBoxLight: mapboxLight,
            MapBox: mapbox,
            MapBoxSatellite: mapboxSatellite,
          };
          setbaseMaps(basemaps_object)

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
            layers:[mapboxSatellite]
          }); // add the basemaps to the controls
      
          L.control.layers(basemaps_object).addTo(map.current);
    }

const fetchOptions = async() => {
  console.log(country_name.current, 'selected countryyyyyyyyyyyyyy')
  var taifa = country_name.current
  console.log(taifa, 'taifa')
    const wms = await axios.get(`${baseurl}:8700/uneca-api-0.1/geojson/getgeojsoninfo/?district_names=ALL&country_name=${taifa}`);
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

// const removeCountryWMSLayer = () => {
//         if(wmsNTLLayer.current)map.current.removeLayer(wmsNTLLayer.current) 
//         if(wmsLULC.current)map.current.removeLayer(wmsLULC.current)
//         if(wmsCountryLayer.current) map.current.removeLayer(wmsCountryLayer.current)
//         if(current_geojson.current) map.current.removeLayer(current_geojson.current)
//         if(wmsLayer.current)map.current.removeLayer(wmsLayer.current)
//         if(wmsDistrictLULC.current)map.current.removeLayer(wmsDistrictLULC.current)
//       }

    //fetch countries
    const fetchRegion = async() => {
  
  
      try {  
       
        if(wmsNTLLayer.current)map.current.removeLayer(wmsNTLLayer.current) 
        if(wmsLULC.current)map.current.removeLayer(wmsLULC.current)
        if(wmsCountryLayer.current) map.current.removeLayer(wmsCountryLayer.current)
        if(current_geojson.current) map.current.removeLayer(current_geojson.current)
        if(wmsLayer.current)map.current.removeLayer(wmsLayer.current)
        if(wmsDistrictLULC.current)map.current.removeLayer(wmsDistrictLULC.current)
        if(wmsDemographicsLayer.current)map.current.removeLayer(wmsDemographicsLayer.current)
        
        
        // if(district.name != null)map.current.removeLayer(wmsNTLLayer.current)
        
        var taifa = country_name.current

        const wms = await axios.get(`${baseurl}:8700/uneca-api-0.1/geojson/getgeojsoninfo/?district_names=ALL&country_name=${taifa}`);
        console.log(wms.data)
        var wms_resp = wms.data
        const cql_fiter_column = wms_resp['wms']['cql_column']
        const wms_layer_name = wms_resp['wms']['layer_name']
        const district_cql = cql_fiter_column + "=" +district['district_id']
        // const district_cql2 = cql_fiter_column + "=" +country
        const country_filter = wms_resp['country_details']['country_id']
        console.log('COUNTRY FILTER',country_filter)
        // const resp = await axios.get("${baseurl}:8080/geoserver/wfs?request=GetFeature&service=WFS&version=1.0.0&typeName=Landinvestment_datasets:District&outputFormat=application/json&CQL_FILTER=country_id="+country_filter);
      


                
                const resp2 = await axios.get(`${baseurl}:8070/uneca-api-0.1/geojson/getcountryinfo/?country_names=ALL`)
                console.log(resp2.data.regions_info['Southern Africa']['country_code'], 'RESP2 DATA') 
                // var country_code_object = resp2.data.regions_info['Southern Africa']['country_code']
                // var country_code_array = country_code_object.map((item) => item.country_code)
                // console.log(country_code_array, 'country_code_array')
                // if(wmsLayer.current)map.current.removeLayer(wmsLayer.current)
                map.current.createPane("pane400").style.zIndex = 400;
                 if(taifa === 'Malawi') {
                  country_code.current = '152'
                  bounds.current = [
                    [ -17.1288105, 32.67395],
                    [ -9.36754, 35.932 ]
                   ]
                 }
                 if(taifa === 'Guinea') {
                  country_code.current ='106'
                  bounds.current = [
                    [ 7.19355000004337, -15.0757013],
                    [ 12.6762127721554, -7.64107 ]
                   ]
                 }
                 if(taifa === 'Madagascar') {
                  country_code.current ='150'
                  bounds.current = [
                    [ -25.6071002, 43.188156],
                    [-11.9497945, 50.4921515 ]
                   ]
                  
                 }

                 console.log(country_code.current)
               
   wmsCountryLayer.current =  L.tileLayer.wms(`${baseurl}:8080/geoserver/wms?`, {
        pane: 'pane400',
        layers: `Landinvestment_datasets:geoportal_adminlevelzero`,
        crs:L.CRS.EPSG4326,
        CQL_FILTER: `country_code=${country_code.current}`,
        // styles: `Crop_Production_Crop_Suitability_${dashboardSlice.selected_crop}_${district.name}`,
        // bounds: map.current.getBounds(custom_polygon.current).toBBoxString(),
      
        format: 'image/png',
        transparent: true,
        opacity:1.0
        
        
       
   });
   wmsCountryLayer.current.addTo(map.current)
   if(wmsDistrictLULC.current)map.current.removeLayer(wmsDistrictLULC.current)
    // if(current_geojson.current) current_geojson.current = null
   
      
   

   map.current.flyToBounds(bounds.current)



                
       
        
        
      } catch (error) {
        console.log( error)
        toast.error('Requested data is not available', { position: toast.POSITION.TOP_CENTER })
        
      }
      finally{
     
      }

      fetchOptions()
      // customoptions()
    }
    //fetch countries
    const fetchDistricts = async(id) => {
      // if(wmsLULC.current)map.current.removeLayer(wmsLULC.current)
      
      // removeCountryWMSLayer()
    
  
      try {   
        
       
        
        if(district_option != null) {

          // if(wmsNTLLayer.current)map.current.removeLayer(wmsNTLLayer.current) 
          // if(wmsLULC.current)map.current.removeLayer(wmsLULC.current)
          // if(wmsCountryLayer.current) map.current.removeLayer(wmsCountryLayer.current)
          // // if(current_geojson.current) map.current.removeLayer(current_geojson.current)
          // if(wmsLayer.current)map.current.removeLayer(wmsLayer.current)
          // if(wmsDistrictLULC.current)map.current.removeLayer(wmsDistrictLULC.current)
          // if(wmsDemographicsLayer.current)map.current.removeLayer(wmsDemographicsLayer.current)


          console.log(district_option)
          var taifa = country_name.current
          const wms = await axios.get(`${baseurl}:8700/uneca-api-0.1/geojson/getgeojsoninfo/?district_names=ALL&country_name=${taifa}`);
        console.log(wms.data)
        var wms_resp = wms.data
        const cql_fiter_column = wms_resp['wms']['cql_column']
        const wms_layer_name = wms_resp['wms']['layer_name']
        // const id = wms_resp['district_id']
        const district_cql = cql_fiter_column + "="  +id
        const district_cql2 = 'country_name' + "=" +country
        // const country_filter = wms_resp['country_details']['country_id']
        

        // const resp = await axios.get(`${baseurl}:8080/geoserver/wfs?request=GetFeature&service=WFS&version=1.0.0&typeName=${wms_layer_name}&outputFormat=application/json`);
        
          const resp = await axios.get(`${baseurl}:8080/geoserver/wfs?request=GetFeature&service=WFS&version=1.0.0&typeName=${wms_layer_name}&outputFormat=application/json&CQL_FILTER=${district_cql}`);

       
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
          if(wmsLULC.current)map.current.removeLayer(wmsLULC.current)
          if(wmsDistrictLULC.current)map.current.removeLayer(wmsDistrictLULC.current)
          
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
    const response = await axios.get(`${baseurl}:8700/uneca-api-0.1/data/get_statistics/?data_name=${dashboardSlice.selected_crop}&district_name=${district.name}&country_name=Malawi`);
    console.log('crop stats',response.data)
    var labels = Object.keys(response.data[0])
    var figures = Object.values(response.data[0])

    var acerage_labels = Object.keys(response.data[1])
    var acerage = Object.values(response.data[1])
    console.log('stats figures and labels', figures, labels)
    setstats_figures(figures)
    dispatch(changeStatsFigures(figures))


    setstats_labels(labels)
    dispatch(changeStatsLabels(labels))

    setacreage_label(acerage_labels)
    dispatch(changeAcreageLabel(acerage_labels))


    settotal_acreage(total_acreage)
    dispatch(changeTotalAcreage(acerage))
    

  } catch (error) {
    toast.error('Requested data is not available', { position: toast.POSITION.TOP_CENTER })
    
  }

}

const fetchAGBStats = async () => {
 
  try {
    const response = await axios.get(`${baseurl}:8700/uneca-api-0.1/data/get_statistics/?data_name=Above Ground Biomass&district_name=${district.name}&country_name=Malawi`);
    console.log('crop stats',response.data)
    var labels = Object.keys(response.data[0])
    var figures = Object.values(response.data[0])

    var acerage_labels = Object.keys(response.data[1])
    var acerage = Object.values(response.data[1])
    console.log('stats figures and labels', figures, labels)
    setstats_figures(figures)
    dispatch(changeStatsFigures(figures))


    setstats_labels(labels)
    dispatch(changeStatsLabels(labels))

    setacreage_label(acerage_labels)
    dispatch(changeAcreageLabel(acerage_labels))


    settotal_acreage(total_acreage)
    dispatch(changeTotalAcreage(acerage))
  } catch (error) {
    // toast.error('Requested data is not available', { position: toast.POSITION.TOP_CENTER })
    
  }

}

const color_func = () => {
  if(dashboardSlice.selected_product === 'Agricultural Productivity'  ) {
    setcolor_array(agb_color)
    dispatch(changeStatsColor(agb_color))

  }
  if(dashboardSlice.selected_product === 'Crop Suitability' ) {
    setcolor_array(crop_color) 
    dispatch(changeStatsColor(crop_color))
  }
  if(dashboardSlice.selected_product === 'Crop Suitability'  && dashboardSlice.selected_crop === 'Tobacco') {
    setcolor_array(tobacco_color) 
    dispatch(changeStatsColor(tobacco_color))
  }
  if(dashboardSlice.selected_product === 'Crop Suitability'  && dashboardSlice.selected_crop === 'Maize') {
    setcolor_array(tobacco_color) 
    dispatch(changeStatsColor(tobacco_color))
  }



  

}



const fetchCountryCrop = async () => {

try {
  if(wmsLayer.current)map.current.removeLayer(wmsLayer.current)
  if(wmsLULC.current)map.current.removeLayer(wmsLULC.current)
  if(wmsNTLLayer.current)map.current.removeLayer(wmsNTLLayer.current)
  if(wmsDistrictLULC.current)map.current.removeLayer(wmsDistrictLULC.current)
  if(wmsDemographicsLayer.current)map.current.removeLayer(wmsDemographicsLayer.current)
  map.current.createPane("pane400").style.zIndex = 200;
var taifa = country_name.current

  if( wmsCountryLayer.current != null && clicked_link === 'Crop Production' && selected_radio === 'Crop Suitability' && current_geojson.current == null) {

    const wmsresponse = await axios.get(`${baseurl}:8700/uneca-api-0.1/data/getwmslayer/?product=Crop Production&sub_product=Crop Suitability&data_name=${dashboardSlice.selected_crop}&country_name=${taifa}`, {
   
    })
    
    current_wms_response.current = wmsresponse.data
    const crop_wms = current_wms_response.current

    console.log(current_wms_response.current, 'current crop response')
    
    
    wmsLayer.current =  L.tileLayer.wms(`${baseurl}:8080/geoserver/wms?`, {
      pane: 'pane400',
      layers: crop_wms.layername,
      crs:L.CRS.EPSG4326,
      styles: crop_wms.sldname,
      // bounds: map.current.getBounds(custom_polygon.current).toBBoxString(),
    
      format: 'image/png',
      transparent: true,
      opacity:1.0
      
      
     
 });

 wmsLayer.current.addTo(map.current);

  //add legend
  const addCropLegend = () => {
    // clearLegends()
    
    if(climate_legend.current)map.current.removeControl(climate_legend.current)
    if(crop_legend.current)map.current.removeControl(crop_legend.current)
    if(district_crop_legend.current)map.current.removeControl(district_crop_legend.current)
    if(agb_legend.current)map.current.removeControl(agb_legend.current)
    if(ntl_legend.current)map.current.removeControl(ntl_legend.current)
    if(pop_legend.current)map.current.removeControl(pop_legend.current)
      if(lulc_legend.current)map.current.removeControl(lulc_legend.current)
      if(soil_legend.current)map.current.removeControl(soil_legend.current)
  if(district_agb_legend.current)map.current.removeControl(district_agb_legend.current)
    
    
    // if(wmsLayer.current){
      var legend = L.control({position:'bottomright'});
      crop_legend.current = legend
  
      crop_legend.current.onAdd = function(map) {
        var div = L.DomUtil.create("div", "legend");
      
        div.innerHTML += (`<p>${country_name.current} ${dashboardSlice.selected_crop} Suitability</p>`) + '<img src="' + `${baseurl}:8080/geoserver/wms?${current_wms_response.current.legendurl}bgColor:0xFFFFFF;dpi:150" + '' />`;
  
        
    let draggable = new L.Draggable(div); //the legend can be dragged around the div
    draggable.enable();
  
    return div;
    };
  
    crop_legend.current.addTo(map.current);
    
  
   }
   addCropLegend()
 
   


  //  fetchCropStats()
  //  color_func()

  }

  if( wmsCountryLayer.current != null && clicked_link === 'Crop Production' && selected_radio === 'Agricultural Productivity') {
    var taifa = country_name.current
    const wmsresponse = await axios.get(`${baseurl}:8700/uneca-api-0.1/data/getwmslayer/?product=Crop Production&sub_product=Agricultural Productivity&data_name=Above Ground Biomass&country_name=${taifa}`, {
   
    })
    current_wms_response.current = wmsresponse.data
    const biomass_wms = current_wms_response.current

    console.log(current_wms_response.current, 'current biomass response')


    
    wmsLayer.current =  L.tileLayer.wms(`${baseurl}:8080/geoserver/wms?`, {
      pane: 'pane400',
      layers: biomass_wms.layername,
      crs:L.CRS.EPSG4326,
      styles: biomass_wms.sldname,
      format: 'image/png',
      transparent: true,
      opacity:1.0
      
      
     
 });

 wmsLayer.current.addTo(map.current);

 //add legend
 const addAGBLegend = () => {
  // clearLegends()
//  if(agb_legend.current)map.current.removeControl(agb_legend.current)
  if(crop_legend.current)map.current.removeControl(crop_legend.current)
  if(ntl_legend.current)map.current.removeControl(ntl_legend.current)

  if(climate_legend.current)map.current.removeControl(climate_legend.current)
  if(crop_legend.current)map.current.removeControl(crop_legend.current)
  if(district_crop_legend.current)map.current.removeControl(district_crop_legend.current)
  if(agb_legend.current)map.current.removeControl(agb_legend.current)
  if(ntl_legend.current)map.current.removeControl(ntl_legend.current)
  if(pop_legend.current)map.current.removeControl(pop_legend.current)
    if(lulc_legend.current)map.current.removeControl(lulc_legend.current)
    if(soil_legend.current)map.current.removeControl(soil_legend.current)
if(district_agb_legend.current)map.current.removeControl(district_agb_legend.current)

  // if(wmsLayer.current){
    var legend = L.control({position:'bottomright'});
    agb_legend.current = legend

    agb_legend.current.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
      
  div.innerHTML += (`<p>${country_name.current} Above Ground Biomass </p>`) + '<img src="' + `${baseurl}:8080/geoserver/wms?${current_wms_response.current.legendurl}bgColor:0xFFFFFF;dpi:150" + '' />`;

      
  let draggable = new L.Draggable(div); //the legend can be dragged around the div
  draggable.enable();

  return div;
  };

  agb_legend.current.addTo(map.current);
  // }

 }
 addAGBLegend()

//  fetchAGBStats()
//  color_func()

  }
  
} catch (error) {
  console.log(error)
  toast.error('Requested data is not available', { position: toast.POSITION.TOP_CENTER })
  
}
 
}

//fetch crop data
const fetchCrop = async () => {
  if(wmsLayer.current)map.current.removeLayer(wmsLayer.current)
  if(wmsNTLLayer.current)map.current.removeLayer(wmsNTLLayer.current)
  if(wmsLULC.current)map.current.removeLayer(wmsLULC.current)
  if(wmsDistrictLULC.current)map.current.removeLayer(wmsDistrictLULC.current)
  if(wmsDemographicsLayer.current)map.current.removeLayer(wmsDemographicsLayer.current)
  map.current.createPane("pane400").style.zIndex = 200;
  var taifa = country_name.current
  console.log(district.name, 'district state')
  

  try {
    if(clicked_link === 'Crop Production' && selected_radio === 'Crop Suitability' && current_geojson.current != null) {
      const wmsresponse = await axios.get(`${baseurl}:8700/uneca-api-0.1/data/getwmslayer/?product=Crop Production&sub_product=Crop Suitability&data_name=${dashboardSlice.selected_crop}&country_name=${taifa}&district_name=${district.name}`, {
   
      })
      
      current_wms_response.current = wmsresponse.data
      const crop_wms = wmsresponse.data
  
      console.log(current_wms_response.current, 'current crop response')
      
      
      wmsLayer.current =  L.tileLayer.wms(`${baseurl}:8080/geoserver/wms?`, {
        pane: 'pane400',
        layers: crop_wms.layername,
        crs:L.CRS.EPSG4326,
        styles: crop_wms.sldname,
       
        format: 'image/png',
        transparent: true,
        opacity:1.0
        
        
       
   });
  
   wmsLayer.current.addTo(map.current);



   const addCropLegend = () => {
    // clearLegends()
    
    if(district_crop_legend.current)map.current.removeControl(district_crop_legend.current)
    if(climate_legend.current)map.current.removeControl(climate_legend.current)
    if(crop_legend.current)map.current.removeControl(crop_legend.current)
    if(district_crop_legend.current)map.current.removeControl(district_crop_legend.current)
    if(agb_legend.current)map.current.removeControl(agb_legend.current)
    if(ntl_legend.current)map.current.removeControl(ntl_legend.current)
    if(pop_legend.current)map.current.removeControl(pop_legend.current)
      if(lulc_legend.current)map.current.removeControl(lulc_legend.current)
      if(soil_legend.current)map.current.removeControl(soil_legend.current)
  if(district_agb_legend.current)map.current.removeControl(district_agb_legend.current)
    
    // if(wmsLayer.current){
      var legend = L.control({position:'bottomright'});
      district_crop_legend.current = legend
  
      district_crop_legend.current.onAdd = function(map) {
       var div = L.DomUtil.create("div", "legend");
        
       div.innerHTML += (`<p>${dashboardSlice.selected_district} ${dashboardSlice.selected_crop} Suitability</p>`) + '<img src="' + `${baseurl}:8080/geoserver/wms?${current_wms_response.current.legendurl}bgColor:0xFFFFFF;dpi:150" + '' />`;
  
        
    let draggable = new L.Draggable(div); //the legend can be dragged around the div
    draggable.enable();
  
    return div;
    };
  
    district_crop_legend.current.addTo(map.current);
    
  
   }
   addCropLegend()
  


     fetchCropStats()
     color_func()
  
    }

    if( clicked_link === 'Crop Production' && selected_radio === 'Agricultural Productivity') {
      var taifa = country_name.current

      const wmsresponse = await axios.get(`${baseurl}:8700/uneca-api-0.1/data/getwmslayer/?product=Crop Production&sub_product=Agricultural Productivity&data_name=Above Ground Biomass&district_name=${district.name}&country_name=${taifa}`, {
   
      })
      
      current_wms_response.current = wmsresponse.data
      const biomass_wms = current_wms_response.current
  
      console.log(current_wms_response.current, 'current district biomass response')
  
  
      
      wmsLayer.current =  L.tileLayer.wms(`${baseurl}:8080/geoserver/wms?`, {
        pane: 'pane400',
        layers: biomass_wms.layername,
        crs:L.CRS.EPSG4326,
        styles: biomass_wms.sldname,
        // bounds: map.current.getBounds(custom_polygon.current).toBBoxString(),
      
        format: 'image/png',
        transparent: true,
        opacity:1.0
        
        
       
   });
  
   wmsLayer.current.addTo(map.current);

   //add legend
   const addAGBLegend = () => {
    // clearLegends()
    if(district_crop_legend.current)map.current.removeControl(district_crop_legend.current)
    if(pop_legend.current)map.current.removeControl(pop_legend.current)
      if(lulc_legend.current)map.current.removeControl(lulc_legend.current)
      if(soil_legend.current)map.current.removeControl(soil_legend.current)
      if(climate_legend.current)map.current.removeControl(climate_legend.current)
      if(ntl_legend.current)map.current.removeControl(ntl_legend.current)
      if(crop_legend.current)map.current.removeControl(crop_legend.current)
      if(agb_legend.current)map.current.removeControl(agb_legend.current)
      if(district_agb_legend.current)map.current.removeControl(district_agb_legend.current)

    // if(wmsLayer.current){
      var legend = L.control({position:'bottomright'});
      district_agb_legend.current = legend

      district_agb_legend.current.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
        
    div.innerHTML += (`<p>${dashboardSlice.selected_district} Above Ground Biomass </p>`) + '<img src="' + `${baseurl}:8080/geoserver/wms?${current_wms_response.current.legendurl}bgColor:0xFFFFFF;dpi:150" + '' />`;

        
    let draggable = new L.Draggable(div); //the legend can be dragged around the div
    draggable.enable();

    return div;
    };

    district_agb_legend.current.addTo(map.current);
    // }

   }
   addAGBLegend()

   fetchAGBStats()
   color_func()
  
    }

    
  } catch (error) {
    console.log(error, 'error')
    // toast.error('Requested data is not available', { position: toast.POSITION.TOP_CENTER })
    
  }
  
}

const fetchCountryClimate = async (e) => {
  console.log(e, 'event')
  const climate_name = e
  climate_ref.current = climate_name
  dispatch(changeClimateProduct(e))
  // console.log('climate data')
  setClimate(climate_name)


 
  
  if(wmsLayer.current)map.current.removeLayer(wmsLayer.current)
  if(wmsLULC.current)map.current.removeLayer(wmsLULC.current)
  if(wmsNTLLayer.current)map.current.removeLayer(wmsNTLLayer.current)
  if(wmsDistrictLULC.current)map.current.removeLayer(wmsDistrictLULC.current)
  if(wmsDemographicsLayer.current)map.current.removeLayer(wmsDemographicsLayer.current)
map.current.createPane("pane400").style.zIndex = 200;

if(clicked_link === 'Climate' && climate_name != null && wmsCountryLayer.current != null ) {
  var taifa = country_name.current
  const wmsresponse = await axios.get(`${baseurl}:8700/uneca-api-0.1/data/getwmslayer/?country_name=${taifa}&product=Climate and Geography&sub_product=Climate&data_name=${climate_name}`, {
   
  })
  const climate_wms = wmsresponse.data 
  current_wms_response.current = wmsresponse.data 

  console.log(current_wms_response.current, 'current climate response')


  wmsLayer.current =  L.tileLayer.wms(`${baseurl}:8080/geoserver/wms?`, {
    pane: 'pane400',
    layers:climate_wms.layername,
    crs:L.CRS.EPSG4326,
    styles: climate_wms.sldname,
    // bounds: map.current.getBounds(custom_polygon.current).toBBoxString(),
  
    format: 'image/png',
    transparent: true,
    opacity:1.0
    
    
   
});

wmsLayer.current.addTo(map.current);

//add legend
const addClimateLegend = () => {
  // clearLegends()
  if(climate_legend.current)map.current.removeControl(climate_legend.current)
  if(district_climate_legend.current)map.current.removeControl(district_climate_legend.current)
  if(district_agb_legend.current)map.current.removeControl(district_agb_legend.current)
  if(district_crop_legend.current)map.current.removeControl(district_crop_legend.current)
  if(pop_legend.current)map.current.removeControl(pop_legend.current)
  if(lulc_legend.current)map.current.removeControl(lulc_legend.current)
  if(soil_legend.current)map.current.removeControl(soil_legend.current)
  
 
  if(ntl_legend.current)map.current.removeControl(ntl_legend.current)
  if(crop_legend.current)map.current.removeControl(crop_legend.current)
  if(agb_legend.current)map.current.removeControl(agb_legend.current)

  // if(wmsLayer.current){
    var legend = L.control({position:'bottomright'});
    district_climate_legend.current = legend

    district_climate_legend.current.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  var taifa = country_name.current
      
  div.innerHTML += (`<p>${taifa} ${climate_name}</p>`) + '<img src="' + `${baseurl}:8080/geoserver/wms?${current_wms_response.current.legendurl}bgColor:0xFFFFFF;dpi:150" + '' />`;

      
  let draggable = new L.Draggable(div); //the legend can be dragged around the div
  draggable.enable();

  return div;
  };

  district_climate_legend.current.addTo(map.current);
  // }

 }
 addClimateLegend()

}


}
const fetchClimate = async (e) => {

  if(wmsLayer.current)map.current.removeLayer(wmsLayer.current)
  if(wmsNTLLayer.current)map.current.removeLayer(wmsNTLLayer.current)
  if(wmsLULC.current)map.current.removeLayer(wmsLULC.current)
  if(wmsDistrictLULC.current)map.current.removeLayer(wmsDistrictLULC.current)
  if(wmsDemographicsLayer.current)map.current.removeLayer(wmsDemographicsLayer.current)


  // console.log(e, 'event')
  const climate_name = e
  climate_ref.current = climate_name
  dispatch(changeClimateProduct(e))
  // console.log('climate data')
  setClimate(climate_name)


  if( climate_name === 'Precipitation' ) {
    setcolor_array(precip_color)
    dispatch(changeStatsColor(precip_color))
  }
          
  if( climate_name === 'Elevation'){
    setcolor_array(agb_color)
    dispatch(changeStatsColor(elevation_color))
  }
  
  if( climate_name === 'Temperature' ) {
    setcolor_array(temperature_color)
    dispatch(changeStatsColor(temperature_color))

  }
  

   // clearLegends()
   if(district_agb_legend.current)map.current.removeControl(district_agb_legend.current)
   if(district_crop_legend.current)map.current.removeControl(district_crop_legend.current)
   if(pop_legend.current)map.current.removeControl(pop_legend.current)
   if(lulc_legend.current)map.current.removeControl(lulc_legend.current)
   if(soil_legend.current)map.current.removeControl(soil_legend.current)
   if(climate_legend.current)map.current.removeControl(climate_legend.current)
   if(district_climate_legend.current)map.current.removeControl(district_climate_legend.current)
   if(ntl_legend.current)map.current.removeControl(ntl_legend.current)
   if(crop_legend.current)map.current.removeControl(crop_legend.current)
   if(agb_legend.current)map.current.removeControl(agb_legend.current)
   if(district_lulc_legend.current)map.current.removeControl(district_lulc_legend.current)
map.current.createPane("pane400").style.zIndex = 200;



  try {
    if(clicked_link === 'Climate' && climate_name && current_geojson.current != null) {

      var taifa = country_name.current
  const wmsresponse = await axios.get(`${baseurl}:8700/uneca-api-0.1/data/getwmslayer/?country_name=${taifa}&product=Climate and Geography&sub_product=Climate&data_name=${climate_name}&district_name=${district.name}`, {
   
  })
  const climate_wms = wmsresponse.data 
  current_wms_response.current = wmsresponse.data 

  console.log(current_wms_response.current, 'current climate response')


  wmsLayer.current =  L.tileLayer.wms(`${baseurl}:8080/geoserver/wms?`, {
    pane: 'pane400',
    layers:climate_wms.layername,
    crs:L.CRS.EPSG4326,
    styles: climate_wms.sldname,
    // bounds: map.current.getBounds(custom_polygon.current).toBBoxString(),
  
    format: 'image/png',
    transparent: true,
    opacity:1.0
    
    
   
});

  
   wmsLayer.current.addTo(map.current);
  
  
  
    //add legend
    const addClimateLegend = () => {
      // clearLegends()
      if(district_agb_legend.current)map.current.removeControl(district_agb_legend.current)
      if(district_crop_legend.current)map.current.removeControl(district_crop_legend.current)
      if(pop_legend.current)map.current.removeControl(pop_legend.current)
      if(lulc_legend.current)map.current.removeControl(lulc_legend.current)
      if(soil_legend.current)map.current.removeControl(soil_legend.current)
      if(climate_legend.current)map.current.removeControl(climate_legend.current)
      if(district_climate_legend.current)map.current.removeControl(district_climate_legend.current)
      if(ntl_legend.current)map.current.removeControl(ntl_legend.current)
      if(crop_legend.current)map.current.removeControl(crop_legend.current)
      if(agb_legend.current)map.current.removeControl(agb_legend.current)
      if(district_lulc_legend.current)map.current.removeControl(district_lulc_legend.current)

      // if(wmsLayer.current){
        var legend = L.control({position:'bottomright'});
        district_climate_legend.current = legend
  
        district_climate_legend.current.onAdd = function(map) {
      var div = L.DomUtil.create("div", "legend");
      var taifa = country_name.current
          
      div.innerHTML += (`<p>${dashboardSlice.selected_district} ${climate_name}</p>`) + '<img src="' + `${baseurl}:8080/geoserver/wms?${current_wms_response.current.legendurl}bgColor:0xFFFFFF;dpi:150" + '' />`;
  
          
      let draggable = new L.Draggable(div); //the legend can be dragged around the div
      draggable.enable();
  
      return div;
      };
  
      district_climate_legend.current.addTo(map.current);
      // }
  
     }
     addClimateLegend()
  
  
  
     const fetchClimateStats = async () => {
   
      try {
        console.log(climate_name,'selected climate')
        const response = await axios.get(`${baseurl}:8700/uneca-api-0.1/data/get_statistics/?data_name=${climate_name}&district_name=${district.name}&country_name=Malawi`);
        console.log('climate stats',response.data)
        var labels = Object.keys(response.data[0])
        var figures = Object.values(response.data[0])
        console.log('stats figures and labels', figures, labels)
        setstats_figures(figures)
        dispatch(changeStatsFigures(figures))
    
    
        setstats_labels(labels)
        dispatch(changeStatsLabels(labels))
      } catch (error) {
        toast.error('Requested data is not available', { position: toast.POSITION.TOP_CENTER })
        
      }
    
    }
  
  
      fetchClimateStats()
      handleDrawerToggle()
  
     
   
  
    }
    
  } catch (error) {
    toast.error('Requested data is not available', { position: toast.POSITION.TOP_CENTER })

    
  }

}

 
const fetchSoilDataa = async (e) => {
  console.log('soil',e)
  
  const soil_product = e
  dispatch(changeSoilProduct(soil_product))


  if(wmsLayer.current)map.current.removeLayer(wmsLayer.current)
  if(wmsDemographicsLayer.current)map.current.removeLayer(wmsDemographicsLayer.current)
  if(wmsLULC.current)map.current.removeLayer(wmsLULC.current)
  if(wmsNTLLayer.current)map.current.removeLayer(wmsNTLLayer.current)
  if(lulc_legend.current)map.current.removeControl(lulc_legend.current)
  if(wmsDistrictLULC.current)map.current.removeLayer(wmsDistrictLULC.current)
map.current.createPane("pane400").style.zIndex = 200;

const soilTexture = soil_product;
console.log(soilTexture, 'soil product selected')
const separatedSoilTexture = soilTexture.split(' ').join('_');
console.log(separatedSoilTexture, 'soil texture underscore'); 
separated_soil_product.current = separatedSoilTexture

var taifa = country_name.current

if(clicked_link === 'Soil Fertility' && separatedSoilTexture != 'Organic_Carbon' && current_geojson.current != null ) {

  const wmsresponse = await axios.get(`${baseurl}:8700/uneca-api-0.1/data/getwmslayer/?product=Crop Production&sub_product=Soil&data_name=${soilTexture}&country_name=${taifa}&district_name=${district.name}`, {
   
  })
  const soil_wms = wmsresponse.data 
  current_wms_response.current = wmsresponse.data 

  console.log(current_wms_response.current, 'current soil response')



  wmsLayer.current =  L.tileLayer.wms(`${baseurl}:8080/geoserver/wms?`, {
    pane: 'pane400',
    layers: soil_wms.layername,
    crs:L.CRS.EPSG4326,
    styles: soil_wms.sldname,
    // bounds: map.current.getBounds(custom_polygon.current).toBBoxString(),
    format: 'image/png',
    transparent: true,
    opacity:1.0
    
    
   
});

wmsLayer.current.addTo(map.current);

const addSoilLegend =  () => {
  if(accessibility_legend.current)map.current.removeControl(accessibility_legend.current)
  if(pop_legend.current)map.current.removeControl(pop_legend.current)
  if(lulc_legend.current)map.current.removeControl(lulc_legend.current)
  if(soil_legend.current)map.current.removeControl(soil_legend.current)
  if(climate_legend.current)map.current.removeControl(climate_legend.current)
  if(ntl_legend.current)map.current.removeControl(ntl_legend.current)
  if(crop_legend.current)map.current.removeControl(crop_legend.current)
  if(agb_legend.current)map.current.removeControl(agb_legend.current)
  if(district_lulc_legend.current)map.current.removeControl(district_lulc_legend.current)
console.log(separated_soil_product.current)
if(wmsLayer.current && separated_soil_product.current != 'Organic Carbon'){
var legend = L.control({position:'bottomright'});
soil_legend.current = legend

soil_legend.current.onAdd =  function(map) {
var div = L.DomUtil.create("div", "legend");

var taifa = country_name.current
var soil = separated_soil_product.current 
const separatedSoilTexture = soil.split('_').join(' ');



div.innerHTML += (`<p>${dashboardSlice.selected_district} ${separatedSoilTexture}</p>`) + '<img src="' + `${baseurl}:8080/geoserver/wms?${current_wms_response.current.legendurl}bgColor:0xFFFFFF;dpi:150" + '' />`;

  
let draggable = new L.Draggable(div); //the legend can be dragged around the div
draggable.enable();

return div;
};

soil_legend.current.addTo(map.current);
}

if(wmsLayer.current && separated_soil_product.current === 'Organic_Carbon'){
if(soil_legend.current)map.current.removeControl(soil_legend.current)
var legend = L.control({position:'bottomright'});
soil_legend.current = legend

soil_legend.current.onAdd = function(map) {
var div = L.DomUtil.create("div", "legend");

var taifa = country_name.current
var soil = separated_soil_product.current 
const separatedSoilTexture = soil.split('_').join(' ');
  
div.innerHTML += (`<p>${dashboardSlice.selected_district} ${separatedSoilTexture}</p>`) + '<img src="' + `${baseurl}:8080/geoserver/wms?${current_wms_response.current.legendurl}bgColor:0xFFFFFF;dpi:150" + '' />`;

  
let draggable = new L.Draggable(div); //the legend can be dragged around the div
draggable.enable();

return div;
};

soil_legend.current.addTo(map.current);
}

}

addSoilLegend()


}


if(clicked_link === 'Soil Fertility' && separatedSoilTexture === 'Organic_Carbon' && current_geojson.current != null ) {

  const wmsresponse = await axios.get(`${baseurl}:8700/uneca-api-0.1/data/getwmslayer/?product=Crop Production&sub_product=Soil&data_name=Organiccarbon&country_name=${taifa}&district_name=${district.name}`, {
   
  })
  const soil_wms = wmsresponse.data 
  current_wms_response.current = wmsresponse.data 

  console.log(current_wms_response.current, 'current organic response')

  wmsLayer.current =  L.tileLayer.wms(`${baseurl}:8080/geoserver/wms?`, {
    pane: 'pane400',
    layers: soil_wms.layername,
    crs:L.CRS.EPSG4326,
    styles: soil_wms.sldname,
    // bounds: map.current.getBounds(custom_polygon.current).toBBoxString(),
    format: 'image/png',
    transparent: true,
    opacity:1.0
    
    
   
});

wmsLayer.current.addTo(map.current);

const addSoilLegend =  () => {
  if(accessibility_legend.current)map.current.removeControl(accessibility_legend.current)
  if(pop_legend.current)map.current.removeControl(pop_legend.current)
  if(lulc_legend.current)map.current.removeControl(lulc_legend.current)
  if(soil_legend.current)map.current.removeControl(soil_legend.current)
  if(climate_legend.current)map.current.removeControl(climate_legend.current)
  if(ntl_legend.current)map.current.removeControl(ntl_legend.current)
  if(crop_legend.current)map.current.removeControl(crop_legend.current)
  if(agb_legend.current)map.current.removeControl(agb_legend.current)
  if(district_lulc_legend.current)map.current.removeControl(district_lulc_legend.current)
console.log(separated_soil_product.current)
if(wmsLayer.current && separated_soil_product.current != 'Organic Carbon'){
var legend = L.control({position:'bottomright'});
soil_legend.current = legend

soil_legend.current.onAdd =  function(map) {
var div = L.DomUtil.create("div", "legend");

var taifa = country_name.current
var soil = separated_soil_product.current 
const separatedSoilTexture = soil.split('_').join(' ');



div.innerHTML += (`<p>${dashboardSlice.selected_district} ${separatedSoilTexture}</p>`) + '<img src="' + `${baseurl}:8080/geoserver/wms?${current_wms_response.current.legendurl}bgColor:0xFFFFFF;dpi:150" + '' />`;

  
let draggable = new L.Draggable(div); //the legend can be dragged around the div
draggable.enable();

return div;
};

soil_legend.current.addTo(map.current);
}

if(wmsLayer.current && separated_soil_product.current === 'Organic_Carbon'){
if(soil_legend.current)map.current.removeControl(soil_legend.current)
var legend = L.control({position:'bottomright'});
soil_legend.current = legend

soil_legend.current.onAdd = function(map) {
var div = L.DomUtil.create("div", "legend");

var taifa = country_name.current
var soil = separated_soil_product.current 
const separatedSoilTexture = soil.split('_').join(' ');
  
div.innerHTML += (`<p>${dashboardSlice.selected_district} ${separatedSoilTexture}</p>`) + '<img src="' + `${baseurl}:8080/geoserver/wms?${current_wms_response.current.legendurl}bgColor:0xFFFFFF;dpi:150" + '' />`;

  
let draggable = new L.Draggable(div); //the legend can be dragged around the div
draggable.enable();

return div;
};

soil_legend.current.addTo(map.current);
}

}
addSoilLegend()


}



}


const fetchCountrySoil = async (e) => {

  console.log('soil',e)
  
  const soil_product = e
  dispatch(changeSoilProduct(soil_product))


  if(wmsLayer.current)map.current.removeLayer(wmsLayer.current)
  if(wmsDemographicsLayer.current)map.current.removeLayer(wmsDemographicsLayer.current)
  if(wmsLULC.current)map.current.removeLayer(wmsLULC.current)
  if(wmsNTLLayer.current)map.current.removeLayer(wmsNTLLayer.current)
  if(lulc_legend.current)map.current.removeControl(lulc_legend.current)
  if(wmsDistrictLULC.current)map.current.removeLayer(wmsDistrictLULC.current)
map.current.createPane("pane400").style.zIndex = 200;

const soilTexture = soil_product;
console.log(soilTexture, 'soil product selected')
const separatedSoilTexture = soilTexture.split(' ').join('_');
console.log(separatedSoilTexture, 'soil texture underscore'); 
separated_soil_product.current = separatedSoilTexture

var taifa = country_name.current


  if(clicked_link === 'Soil Fertility' && separatedSoilTexture != 'Organic_Carbon' && wmsCountryLayer.current != null ) {

    const wmsresponse = await axios.get(`${baseurl}:8700/uneca-api-0.1/data/getwmslayer/?product=Crop Production&sub_product=Soil&data_name=${soilTexture}&country_name=${taifa}`, {
     
    })
    const soil_wms = wmsresponse.data 
    current_wms_response.current = wmsresponse.data 
  
    console.log(current_wms_response.current, 'current soil response')
  
  
    wmsLayer.current =  L.tileLayer.wms(`${baseurl}:8080/geoserver/wms?`, {
      pane: 'pane400',
       layers: soil_wms.layername,
      crs:L.CRS.EPSG4326,
      styles: soil_wms.sldname,
      // bounds: map.current.getBounds(custom_polygon.current).toBBoxString(),
      format: 'image/png',
      transparent: true,
      opacity:1.0
      
      
     
  });
  
  wmsLayer.current.addTo(map.current);


  const addCountrySoilLegend = () => {
    if(accessibility_legend.current)map.current.removeControl(accessibility_legend.current)
    if(pop_legend.current)map.current.removeControl(pop_legend.current)
    if(lulc_legend.current)map.current.removeControl(lulc_legend.current)
    if(soil_legend.current)map.current.removeControl(soil_legend.current)
    if(climate_legend.current)map.current.removeControl(climate_legend.current)
    if(ntl_legend.current)map.current.removeControl(ntl_legend.current)
    if(crop_legend.current)map.current.removeControl(crop_legend.current)
    if(agb_legend.current)map.current.removeControl(agb_legend.current)
    if(district_lulc_legend.current)map.current.removeControl(district_lulc_legend.current)
  console.log(separated_soil_product.current)
  if(wmsLayer.current && separated_soil_product.current != 'Organic Carbon'){
  var legend = L.control({position:'bottomright'});
  soil_legend.current = legend
  
  soil_legend.current.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  
  var taifa = country_name.current
  var soil = separated_soil_product.current 
  const separatedSoilTexture = soil.split('_').join(' ');
    
  div.innerHTML += (`<p>${taifa} ${separatedSoilTexture}</p>`) + '<img src="' + `${baseurl}:8080/geoserver/wms?${current_wms_response.current.legendurl}bgColor:0xFFFFFF;dpi:150" + '' />`;
  
    
  let draggable = new L.Draggable(div); //the legend can be dragged around the div
  draggable.enable();
  
  return div;
  };
  
  soil_legend.current.addTo(map.current);
  }
  
  if(wmsLayer.current && separated_soil_product.current === 'Organic_Carbon'){
  if(soil_legend.current)map.current.removeControl(soil_legend.current)
  var legend = L.control({position:'bottomright'});
  soil_legend.current = legend
  
  soil_legend.current.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  
  var taifa = country_name.current
  var soil = separated_soil_product.current 
  const separatedSoilTexture = soil.split('_').join(' ');
    
  div.innerHTML += (`<p>${dashboardSlice.selected_district} ${separatedSoilTexture}</p>`) + '<img src="' + `${baseurl}:8080/geoserver/wms?${current_wms_response.current.legendurl}bgColor:0xFFFFFF;dpi:150" + '' />`;
  
    
  let draggable = new L.Draggable(div); //the legend can be dragged around the div
  draggable.enable();
  
  return div;
  };
  
  soil_legend.current.addTo(map.current);
  }
  
  }
  addCountrySoilLegend()
  
  
  }
  
   
  
    if(clicked_link === 'Soil Fertility' && separatedSoilTexture === 'Organic_Carbon' && wmsCountryLayer.current != null ) {
  
  
      const wmsresponse = await axios.get(`${baseurl}:8700/uneca-api-0.1/data/getwmslayer/?product=Crop Production&sub_product=Soil&data_name=Organiccarbon&country_name=${taifa}`, {
     
      })
      const soil_wms = wmsresponse.data 
      current_wms_response.current = wmsresponse.data 
    
      console.log(current_wms_response.current, 'current soil response')
  
  
      wmsLayer.current =  L.tileLayer.wms(`${baseurl}:8080/geoserver/wms?`, {
        pane: 'pane400',
     layers: soil_wms.layername,
        crs:L.CRS.EPSG4326,
       styles: soil_wms.sldname,
        // bounds: map.current.getBounds(custom_polygon.current).toBBoxString(),
        format: 'image/png',
        transparent: true,
        opacity:1.0
        
        
       
   });
  
   wmsLayer.current.addTo(map.current);


   const addCountrySoilLegend = () => {
    if(accessibility_legend.current)map.current.removeControl(accessibility_legend.current)
    if(pop_legend.current)map.current.removeControl(pop_legend.current)
    if(lulc_legend.current)map.current.removeControl(lulc_legend.current)
    if(soil_legend.current)map.current.removeControl(soil_legend.current)
    if(climate_legend.current)map.current.removeControl(climate_legend.current)
    if(ntl_legend.current)map.current.removeControl(ntl_legend.current)
    if(crop_legend.current)map.current.removeControl(crop_legend.current)
    if(agb_legend.current)map.current.removeControl(agb_legend.current)
    if(district_lulc_legend.current)map.current.removeControl(district_lulc_legend.current)
  console.log(separated_soil_product.current)
  if(wmsLayer.current && separated_soil_product.current != 'Organic Carbon'){
  var legend = L.control({position:'bottomright'});
  soil_legend.current = legend
  
  soil_legend.current.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  
  var taifa = country_name.current
  var soil = separated_soil_product.current 
  const separatedSoilTexture = soil.split('_').join(' ');
    
  div.innerHTML += (`<p>${taifa} ${separatedSoilTexture}</p>`) + '<img src="' + `${baseurl}:8080/geoserver/wms?${current_wms_response.current.legendurl}bgColor:0xFFFFFF;dpi:150" + '' />`;
  
    
  let draggable = new L.Draggable(div); //the legend can be dragged around the div
  draggable.enable();
  
  return div;
  };
  
  soil_legend.current.addTo(map.current);
  }
  
  if(wmsLayer.current && separated_soil_product.current === 'Organic_Carbon'){
  if(soil_legend.current)map.current.removeControl(soil_legend.current)
  var legend = L.control({position:'bottomright'});
  soil_legend.current = legend
  
  soil_legend.current.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  
  var taifa = country_name.current
  var soil = separated_soil_product.current 
  const separatedSoilTexture = soil.split('_').join(' ');
    
  div.innerHTML += (`<p>${taifa} ${separatedSoilTexture}</p>`) + '<img src="' + `${baseurl}:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=Landinvestment_datasets:${taifa}_Organiccarbon_Crop_Production_Soil&LEGEND_OPTIONS=border:true;dx:10;fontSize:7;bgColor:0xFFFFFF;dpi:150" + '' />` ;
  
    
  let draggable = new L.Draggable(div); //the legend can be dragged around the div
  draggable.enable();
  
  return div;
  };
  
  soil_legend.current.addTo(map.current);
  }
  
  }
  addCountrySoilLegend()
  
  
     
   
  
    }
  
  
}



const addPopLegend = () => {
  // clearLegends()
  if(accessibility_legend.current)map.current.removeControl(accessibility_legend.current)
  if(pop_legend.current)map.current.removeControl(pop_legend.current)
      if(lulc_legend.current)map.current.removeControl(lulc_legend.current)
      if(soil_legend.current)map.current.removeControl(soil_legend.current)
      if(climate_legend.current)map.current.removeControl(climate_legend.current)
      if(ntl_legend.current)map.current.removeControl(ntl_legend.current)
      if(crop_legend.current)map.current.removeControl(crop_legend.current)
      if(agb_legend.current)map.current.removeControl(agb_legend.current)
      if(district_crop_legend.current)map.current.removeControl(district_crop_legend.current)
      if(district_lulc_legend.current)map.current.removeControl(district_lulc_legend.current)

 
  if(wmsLayer.current && wmsCountryLayer.current != null){
    var taifa = country_name.current
    var legend = L.control({position:'bottomright'});
    pop_legend.current = legend

    pop_legend.current.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
      
  div.innerHTML += (`<p>${taifa} Demographics</p>`) + '<img src="' + `${baseurl}:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=Landinvestment_datasets:${taifa}_Population_Density_Socioeconomics_Population&LEGEND_OPTIONS=border:true;dx:10;fontSize:7;bgColor:0xFFFFFF;dpi:150" + '' />` ;

      
  let draggable = new L.Draggable(div); //the legend can be dragged around the div
  draggable.enable();

  return div;
  };

  pop_legend.current.addTo(map.current);
  }

 }

 const addMarketAccessLegend = () => {
  // clearLegends()
  if(accessibility_legend.current)map.current.removeControl(accessibility_legend.current)
  if(pop_legend.current)map.current.removeControl(pop_legend.current)
      if(lulc_legend.current)map.current.removeControl(lulc_legend.current)
      if(soil_legend.current)map.current.removeControl(soil_legend.current)
      if(climate_legend.current)map.current.removeControl(climate_legend.current)
      if(ntl_legend.current)map.current.removeControl(ntl_legend.current)
      if(crop_legend.current)map.current.removeControl(crop_legend.current)
      if(agb_legend.current)map.current.removeControl(agb_legend.current)
      if(district_lulc_legend.current)map.current.removeControl(district_lulc_legend.current)

 
  if(wmsLayer.current && wmsCountryLayer.current != null){
    var taifa = country_name.current
    var legend = L.control({position:'bottomright'});
    accessibility_legend.current = legend

    accessibility_legend.current.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
      
  div.innerHTML += (`<p>${taifa} Market Accessibility</p>`) + '<img src="' + `${baseurl}:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=Landinvestment_datasets:${taifa}_Market_Accessibility_Socioeconomics_Accessibility&LEGEND_OPTIONS=border:true;dx:10;fontSize:7;bgColor:0xFFFFFF;dpi:150" + '' />` ;

      
  let draggable = new L.Draggable(div); //the legend can be dragged around the div
  draggable.enable();

  return div;
  };

  accessibility_legend.current.addTo(map.current);
  }

 }



const onAncilChange = e => {
  if(wmsLayer.current)map.current.removeLayer(wmsLayer.current)
  if(wmsNTLLayer.current)map.current.removeLayer(wmsNTLLayer.current)
  if(wmsLULC.current)map.current.removeLayer(wmsLULC.current)
  if(wmsDistrictLULC.current)map.current.removeLayer(wmsDistrictLULC.current)
  if(wmsDemographicsLayer.current)map.current.removeLayer(wmsDemographicsLayer.current)

      if(accessibility_legend.current)map.current.removeControl(accessibility_legend.current)
      if(pop_legend.current)map.current.removeControl(pop_legend.current)
      if(lulc_legend.current)map.current.removeControl(lulc_legend.current)
      if(soil_legend.current)map.current.removeControl(soil_legend.current)
      if(climate_legend.current)map.current.removeControl(climate_legend.current)
      if(ntl_legend.current)map.current.removeControl(ntl_legend.current)
      if(crop_legend.current)map.current.removeControl(crop_legend.current)
      if(agb_legend.current)map.current.removeControl(agb_legend.current)
      if(district_crop_legend.current)map.current.removeControl(district_crop_legend.current)
  setSelected_ancil(e)
  console.log(e) 
  ancil_check.current = e
  var ancillary_selection = e
  
map.current.createPane("pane400").style.zIndex = 200;
console.log(ancillary_selection,'selected ancil')



if( clicked_link === 'Ancillary Data' && ancillary_selection === 'Demographics' ) {

  if(wmsDemographicsLayer.current)map.current.removeLayer(wmsDemographicsLayer.current)
  if(wmsLayer.current)map.current.removeLayer(wmsLayer.current)
  if(wmsNTLLayer.current)map.current.removeLayer(wmsNTLLayer.current)
  if(wmsLULC.current)map.current.removeLayer(wmsLULC.current)
  if(wmsDistrictLULC.current)map.current.removeLayer(wmsDistrictLULC.current)

  var taifa = country_name.current
  
  wmsDemographicsLayer.current =  L.tileLayer.wms(`${baseurl}:8080/geoserver/wms?`, {
      pane: 'pane400',
      layers: `Landinvestment_datasets:${taifa}_Population_Density_Socioeconomics_Population`,
      crs:L.CRS.EPSG4326,
      styles: `Socioeconomics_Population_Population_Density_${taifa}`,
      format: 'image/png',
      transparent: true,
      opacity:1.0
      
      
     
 });

 wmsDemographicsLayer.current.addTo(map.current);
 addPopLegend()

  

  }

  if( clicked_link === 'Ancillary Data' && ancillary_selection !== 'Demographics' || 'Economic Activity' || 'Market Accessibility' ) {

    
    var taifa = country_name.current
    wmsLayer.current =  L.tileLayer.wms(`${baseurl}:8080/geoserver/wms?`, {
      pane: 'pane400',
      layers: `Landinvestment_datasets:${ancillary_selection}`,
      crs:L.CRS.EPSG4326,
      // styles: '',
      format: 'image/png',
      transparent: true,
      opacity:1.0
      
      
     
 });

 wmsLayer.current.addTo(map.current);
}

if( clicked_link === 'Ancillary Data' && ancillary_selection === 'Market Accessibility' ) {

  if(wmsDemographicsLayer.current)map.current.removeLayer(wmsDemographicsLayer.current) //aka demographics layer
  if(wmsLayer.current)map.current.removeLayer(wmsLayer.current)
  if(wmsNTLLayer.current)map.current.removeLayer(wmsNTLLayer.current)
  if(wmsLULC.current)map.current.removeLayer(wmsLULC.current)
  if(wmsDistrictLULC.current)map.current.removeLayer(wmsDistrictLULC.current)

  var taifa = country_name.current
  
  wmsLayer.current =  L.tileLayer.wms(`${baseurl}:8080/geoserver/wms?`, {
    pane: 'pane400',
    layers: `Landinvestment_datasets:${taifa}_Market_Accessibility_Socioeconomics_Accessibility`,
    crs:L.CRS.EPSG4326,
    styles: `Socioeconomics_Accessibility_Market_Accessibility_${taifa}`,
    format: 'image/png',
    transparent: true,
    opacity:1.0
    
    
   
});
// map.current.removeLayer(wmsLayer.current)

wmsLayer.current.addTo(map.current);
addMarketAccessLegend()
}


}



const zoomin = () => {
  map.current.setZoom(map.current.getZoom() + 0.5)
}

const zoomout = () => {
  map.current.setZoom(map.current.getZoom() - 1)
}

const changeDefaultOpacity = (e) => {

  //   $('#image-opacity').html(this.value); //i might revisit
    console.log(e.target.value, 'opacity value')
    opacity_value.current = e.target.value
    
 if(wmsLayer.current != null)wmsLayer.current.setOpacity(e.target.value)
 if(wmsNTLLayer.current != null)wmsNTLLayer.current.setOpacity(e.target.value)
 if(wmsDistrictLULC.current != null)wmsDistrictLULC.current.setOpacity(e.target.value)
 if(wmsLULC.current != null)wmsLULC.current.setOpacity(e.target.value)
 if(wmsDemographicsLayer.current != null)wmsDemographicsLayer.current.setOpacity(e.target.value)
                                    
                                  
                                   
                                  
                  
                                
}

const sliderfunc = async (e)  => {
  console.log('input event',e.target.value)
 
  const value = e.target.value
  setslider_value(value)
 
  // p.innerHTML = Math.round(value * 100);

  const clim_filter= await axios.get(`${baseurl}:8700/uneca-api-0.1/data/get_min_max/?district_name=Balaka`)
  console.log(clim_filter.data, 'climate data values')
 var selected_climate = climate_ref.current

  const clim_filter2= await axios.get(`${baseurl}:8700/uneca-api-0.1/data/get_filterd_wms/?data_name=Precipitation&district_name=${district.name}&value=${value}`)
  console.log(clim_filter2.data, 'clim filter 2')
  var layer_filter = clim_filter2.data.layer_name

    if(wmsLayer.current)map.current.removeLayer(wmsLayer.current)
    console.log(climate_ref.current, 'climate selected')
map.current.createPane("pane400").style.zIndex = 200;

if(clicked_link === 'Climate' && climate_ref.current === 'Precipitation'  && current_geojson.current ) {
  console.log(value, 'value inside')
  wmsLayer.current =  L.tileLayer.wms(`${baseurl}:8080/geoserver/wms?`, {
    pane: 'pane400',
    layers: `Landinvestment_datasets:malawi_precipitation_uUTiNcB_${district.name}clipped_filtere_less_${value}`,
    crs:L.CRS.EPSG4326,
    format: 'image/png',
    transparent: true,
    opacity:1.0
    
    
   
});

wmsLayer.current.addTo(map.current);
}
};

const sliderfunc2 = async (e)  => {
  if(climate_ref.current === 'Temperature') {
    console.log('temperature event',e.target.value)
 
  const value = e.target.value
  settemp_slider_value(value)
 
  // p.innerHTML = Math.round(value * 100);

  const clim_filter= await axios.get(`${baseurl}:8700/uneca-api-0.1/data/get_min_max/?district_name=Balaka`)
  console.log(clim_filter.data, 'climate data values')
 var selected_climate = climate_ref.current

  const clim_filter2= await axios.get(`${baseurl}:8700/uneca-api-0.1/data/get_filterd_wms/?data_name=Temperature&district_name=${district.name}&value=${value}`)
  console.log(clim_filter2.data, 'clim filter 2')
  var layer_filter = clim_filter2.data.layer_name

    if(wmsLayer.current)map.current.removeLayer(wmsLayer.current)
    console.log(climate_ref.current, 'climate selected')
map.current.createPane("pane400").style.zIndex = 200;

if(clicked_link === 'Climate' && climate_ref.current === 'Temperature'  && current_geojson.current ) {
  console.log(value, 'value inside')
  wmsLayer.current =  L.tileLayer.wms(`${baseurl}:8080/geoserver/wms?`, {
    pane: 'pane400',
    // layers:layer_filter,
    layers: `Landinvestment_datasets:malawi_temprature_fBiSpPq_${district.name}clipped_filtere_less_${value}`,
    crs:L.CRS.EPSG4326,
    format: 'image/png',
    transparent: true,
    opacity:1.0
    
    
   
});

wmsLayer.current.addTo(map.current);
}
  }
};

const sliderfunc3 = async (e)  => {
 if(climate_ref.current === 'Elevation') {
  console.log('ielevation event',e.target.value)
 
  const value = e.target.value
  set_elevation_slider_value(value)
 
  // p.innerHTML = Math.round(value * 100);

  const clim_filter= await axios.get(`${baseurl}:8700/uneca-api-0.1/data/get_min_max/?district_name=Balaka`)
  console.log(clim_filter.data, 'climate data values')
 var selected_climate = climate_ref.current

  const clim_filter2= await axios.get(`${baseurl}:8700/uneca-api-0.1/data/get_filterd_wms/?data_name=Elevation&district_name=${district.name}&value=${value}`)
  console.log(clim_filter2.data, 'clim filter 2')
  var layer_filter = clim_filter2.data.layer_name

    if(wmsLayer.current)map.current.removeLayer(wmsLayer.current)
    console.log(climate_ref.current, 'climate selected')
map.current.createPane("pane400").style.zIndex = 200;

if(clicked_link === 'Climate' && climate_ref.current === 'Elevation'  && current_geojson.current ) {
  console.log(value, 'value inside')
  wmsLayer.current =  L.tileLayer.wms(`${baseurl}:8080/geoserver/wms?`, {
    pane: 'pane400',
    layers: `Landinvestment_datasets:malawi_elevation_XXC2nrw_${district.name}clipped_filtere_less_${value}`,
    crs:L.CRS.EPSG4326,
    format: 'image/png',
    transparent: true,
    opacity:1.0
    
    
   
});

wmsLayer.current.addTo(map.current);
}
 }
};



    useEffect(() => {
        setLeafletMap()
        // setloading(false)

    }, [])
    useEffect(() => {
      // if(wmsNTLLayer.current)map.current.removeLayer(wmsNTLLayer.current)
  }, [district_option, district.name, color_array, climate])

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
        zIndex:100,
        fontFamily:'sans-serif',
    }}>
   

  <Select 
    defaultValue={'Select Country'}
    onChange={onCountryChanged}
    options={countryOptions}
    placeholder={'Select Country'}
    />

   


    <Select 
    defaultValue={'Select District'}
    onChange={onDistrictChanged}
    options={district_option}
    placeholder={'Select District'}
    />

    </div>

    <div className="">
      <ToastContainer />
    </div>
    

    <div className="left_side_panel"  >

        <div className="left_side_icons"
         style={{
          
            display:'flex',
            flexDirection: 'column',
            gap:'2.6rem',
            fontFamily:'sans-serif',
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
        gap:'3.3rem',
        fontFamily:'sans-serif',
        fontSize:'16px'
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

    <div className={ 'map_controls' } >
      <img src={add} alt="" onClick={zoomin}/> 
       <img src={minus} onClick={zoomout} alt="" />

       <div className="opacity" style={{ zIndex:102, backgroundColor:'#1e4b5f', 
       position:'absolute', left:'-32vw', width:'220px', height:'25px', color:'white',  paddingTop:'5px'}} >
          <span id="opacity" >Opacity</span>
         
          <input type="range" id="sldOpacity" min="0" max="1" step="0.1" 
       
          onChange={changeDefaultOpacity}
         
            />
         </div>
       

    </div>

 
    

    


{
    clicked_link === 'Crop Production' && open? 
    <div className="selection_panel" style={{
        position:'absolute',
        left:'6.4vw',
        top:'30.2vh',
        backgroundColor:'#fff',
        width:'350px',
        height:'270px',
        zIndex:100,
        borderRadius:'10px',
        color:'#1E4B5F',
        fontWeight:'700',
        fontFamily:'sans-serif',
        fontSize:'14px'
    }}>
      <img className='close_selection_panel' src={close} alt="" style={{ marginLeft:'17vw', marginTop:'3px'}}  onClick={ close_selection} />
        {
            clicked_link === 'Crop Production' ?
            
            
            <div className="radio_selections" 
            style={{
              
               
                // display:'flex',
                // flexDirection:'row',
                // gap:'4rem',
                marginTop: '1px'
            }}
            >
                <div className="labels"
                 style={{ display:'flex',
                flexDirection:'row',
                gap:'3rem',
                marginTop: '10px'}}
                >

                <input type="radio" name="" id="crop_suitability"
                value={dashboardSlice.products[1]}
                checked={selected_radio === dashboardSlice.products[1]}
                onChange={onRadioChange}
                 style={{height:'30px', outline: "none", marginLeft:'1vw'}} />

                <label style={{marginLeft:'-2.5vw', marginTop: '10px'}} htmlFor="">{dashboardSlice.products[1]}</label>

                <input type="radio" name="" id="agricultural_productivity"
                 value={dashboardSlice.products[0]}
                 checked={selected_radio === dashboardSlice.products[0]}
                 onChange={onRadioChange}  
                 style={{height:'30px', outline: "none"}}/> 

                <label style={{marginLeft:'-2.5vw', marginTop: '10px'}} htmlFor="">{dashboardSlice.products[0]}</label>
                


               

                </div>
                
                
                
                
            </div>


            :
            ''



        }

        {
            selected_radio === 'Crop Suitability' ? 
            <div 
           className='crop_selection'
            style={{
                // position:'absolute',
                // top:'12vh',
                // width: '170px',
                // height: '30px',
                color:'white',
                borderRadius:'10px',
                marginTop:'10px',
                marginLeft:'40px',
                outline:'none',zIndex:101
                
                
            
            }}>
                 <Index />

                
               
            </div> 
            
            : <p style={{
             marginTop:'25px',
             marginLeft:'100px'
            }}>Above Ground Biomass</p>
            
        }

        {
          district.name != null ?
          <button type='button' 
className='fetch_button'
                 style={{
                  width: '100px', 
                  height:'30px',
                  marginTop:'8vh',  
                  marginLeft:'120px', 
                  borderRadius:'10px', 
                  backgroundColor:'#1E4B5F',
                  color:'#fff',
                  outline:'none',
                  border:'none'}} onClick = { ()=> {  fetchCrop();handleDrawerToggle()
                  
                    }}>Fetch </button>

                    : wmsCountryLayer.current != null ? 
                    <button type='button' 
className='fetch_button'
                 style= {{
                  width: '100px', 
                  height:'30px',
                  marginTop:'8vh',  
                  marginLeft:'120px', 
                  borderRadius:'10px', 
                  backgroundColor:'#1E4B5F',
                  color:'#fff',
                  outline:'none',
                  border:'none'}} onClick = { ()=> {  fetchCountryCrop()
                  
                    }}>Fetch</button>
                    : ''

        }





                  


                  

                 



    </div>
    : 



    
    clicked_link === 'Climate'? 
    <>
    
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
              fontWeight:'500',
              fontFamily:'sans-serif',
              fontSize:'14px'
              
              
          
          }}>
            <CustomClimateSelect 
           fetchClimateData={ district.name != null ? fetchClimate : fetchCountryClimate }
            />
              
            </div>

            {/* {
              climate === 'Precipitation' ?
              <img style={{zIndex:200,position:'absolute', left:'90vw',top:'82vh'}} src="http://139.84.229.39:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=Landinvestment_datasets:Malawi_Precipitation_Climate_and_Geography_Climate&LEGEND_OPTIONS=border:true;dx:10;fontSize:7;bgColor:0xFFFFFF;dpi:150" alt="" />
              
              : ''
            } */}


            
    </>
    
    : 

    clicked_link === 'Soil Fertility'? 
    <>
   

<div className="landuse" 
    style={{ position:'absolute',
    left:'6.4vw',
    top:'52vh',
    color:'#fff',
    zIndex:100,
    fontWeight:'500',
    fontFamily:'sans-serif',
    fontSize:'14px'
              }}>
      <CustomSoil 
      fetchSoilData={ district.name != null ? fetchSoilDataa : fetchCountrySoil}
      />
         
    </div>


    </>
    
    : 
    clicked_link === 'Ancillary Data' && open ? 
    
    <div className="ancil_panel" style={{
      position:'absolute',
      left:'6.4vw',
      top:'77vh',
      backgroundColor:'transparent',
      width:'500px',
      height:'205px',
      zIndex:100,
      borderRadius:'10px',
      color:'#1E4B5F',
      fontWeight:'700',
      fontFamily:'sans-serif',
      fontSize:'14px'
    }}>
      


        <div className="anci" style={{color:'white'}}>
        <CustomAncilSelect
           fetchAncilData={ onAncilChange }
            />

        </div>




    </div>
    :

    clicked_link === 'Land Use' ? 
    ''
 
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


<SideNavDrawer isOpen={isDrawerOpen} onClose={handleDrawerToggle}  />

{
  clicked_link === 'Climate' && isDrawerOpen ?
  <div className="fil" style={{position:'absolute', top:'62vh', zIndex:105,
marginLeft:'76vw', width:'24vw', display:'flex', flexDirection:'column', gap:'0.5rem'}}>

<p  style={{ fontFamily:'sans-serif', fontWeight:'550', color:'#1E4B5F'}}>Filter for Precipitation (mm)</p>
<div className="slider-value" style={{ display:'flex' ,flexDirection:'row'}}>
<input type="range" id="slider"  onInput={sliderfunc} min={400} max={720} step={5}/>
<p className='label' style={{fontFamily:'sans-serif', fontWeight:'600', color:'#1E4B5F',  fontSize:'14px' }} >{
  slider_value ?
  `${slider_value} mm ` :''

}
  </p>

</div>

<p  style={{ fontFamily:'sans-serif', fontWeight:'550', color:'#1E4B5F'}}>Filter for Temperature (°C)</p>
<div className="slider-value" style={{ display:'flex' ,flexDirection:'row'}}>
<input type="range" id="slider"  onInput={sliderfunc2} min={26} max={34} step={1}/>
<p className='label' style={{fontFamily:'sans-serif', fontWeight:'600', color:'#1E4B5F',  fontSize:'14px'}} > {
  temp_slider_value ?
`${temp_slider_value}  °C` : ''
} </p>

</div>

  
  <p  style={{ fontFamily:'sans-serif', fontWeight:'550', color:'#1E4B5F'}}>Filter for Elevation (m)</p>
<div className="slider-value" style={{ display:'flex' ,flexDirection:'row'}}>
<input type="range" id="slider"  onInput={sliderfunc3} min={400} max={812} step={10}/>
<p className='label' style={{fontFamily:'sans-serif', fontWeight:'600', color:'#1E4B5F', fontSize:'14px' }} > {
  elevation_slider_value ?
`${elevation_slider_value} m` : ''
}</p>

</div>

</div> : ''
}

{/* {
  loading.current == true ?  (<div style={{ position:'absolute', left: '50vw', top:'40vh',  zIndex:120}}
  > <CircularProgress  /></div> )
: loader == false ? '' : ''
} */}


    
    </>
  )
} 

export default Dashboard