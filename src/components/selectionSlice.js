import { createSlice } from '@reduxjs/toolkit'
import  axios from 'axios'

const initialState = {
    countries:[ 
    {value:'Malawi',label:'Malawi'},
     {value:'Guinea', label:'Guinea'},
     {value:'Madagascar', label:'Madagascar'}
    ],
    districts: [
        "Balaka",
        "Blantyre",
        "Chikwawa",
        "Chiradzulu",
        "Chitipa",
        "Dedza",
        "Dowa",
        "Karonga",
        "Kasungu",
        "Lilongwe",
        "Machinga",
        "Mangochi",
        "Mchinji",
        "Mulanje",
        "Mwanza",
        "Mzimba",
        "Nkhata Bay",
        "Nkhotakota",
        "Nsanje",
        "Ntcheu",
        "Ntchisi",
        "Phalombe",
        "Rumphi",
        "Salima",
        "Thyolo",
        "Zomba"
    ],
    districts_2:[],
    selected_country:'Malawi',
    selected_district:'',
    selected_indicator:'',
    selected_product:'Crop Suitability',
    selected_crop:'',
    selected_climate:'',
    selected_ancil:'',
    indicators:['Crop Production', 'Climate', 'Soil Fertility', 'Land Use', 'Night-time Light', 'Ancillary Data'],
    products:['Agricultural Productivity', 'Crop Suitability'],
    crops:['Maize', 'Groundnuts', 'Tobacco', 'Cranberry', 'Tea'],
    crops_array:[],
    climate_products:['Precipitation', 'Temperature', 'Elevation'],
    soil_products:['Soil Texture','Organic Carbon', 'Soil Drainage', 'Soil Cations', 'Soil Fertility'],
    selected_soil:'',
    ancil_data:['Roads', 'Towns', 'Markets', 'Market Accessibility', 'Economic Activity', "Demographics"],
    stats_figures:[],
    stats_labels:[],
    stats_color:[],
    acreage_label:[],
    total_acreage:[],
    ntl_list:['Country NTL', 'District NTL'],
    selected_level:''
}


const dashboardSelectionSlice = createSlice({
    name: 'dashboardselections',
    initialState,
    reducers:{
        changeSelectedCountry:(state, action) => {
            state.selected_country = action.payload
            // if(state.selected_country === 'Guinea'){
            //     state.crops = ['Rice']
            //     // state.selected_district = 'Beyla'
            // }
            // if(state.selected_country === 'Madagascar'){
            //     state.crops = ['Sweet Potatoes', 'Rice']
            //     // state.selected_district = 'Androy'
            // }
           
        },
        // showDistrictOptions:async (state, action) => {
        //     // state.districts_2 = action.payload
        //     try {
        //         const wms = await axios.get(`http://139.84.229.39:8700/uneca-api-0.1/geojson/getgeojsoninfo/?district_names=ALL`);
        //         console.log(wms.data)
        //         var wms_resp = wms.data
        //         const cql_fiter_column = wms_resp['wms']['cql_column']
        //         const wms_layer_name = wms_resp['wms']['layer_name']
        //         const id = wms_resp['district_id']
        //         console.log(id, 'wms resp ids')
        //         // const custom_districts = () => {
        //           var option = id.map( (item) => {
        //             return({ value: item.district_id, label:item.distinct_name
        
        //             })
                    
        //           })
        //           console.log(option, 'options')
        //           state.districts_2 = option
        //           return option
                
        //     } catch (error) {
        //         console.log(error)
                
        //     }

        // },
        changeSelectedDistrict: (state, action) => {
            state.selected_district = action.payload
            

           
        },
        changeSelectedIndicator:(state, action) => {
            state.selected_indicator = action.payload
           
        },
        changeSelectedProduct:(state, action) => {
            state.selected_product = action.payload
           
        },
        changeSelectedCrop:(state, action) => {
            state.selected_crop = action.payload
           
        },
        changeClimateProduct:(state, action) => {
            state.selected_climate = action.payload
        },
        changeSoilProduct:(state, action) => {
            state.selected_soil = action.payload
        },
        changeAncilProduct:(state, action) => {
            state.selected_ancil = action.payload
        },
        fetchDistricts:(state, action) => {
            state.districts_2 = action.payload
        //   return option
        // }
        // custom_districts()
        
        },
        changeStatsFigures:(state, action) => {
            state.stats_figures = action.payload
            
        },
        changeStatsLabels:(state, action) => {
            state.stats_labels = action.payload
        },
        changeStatsColor:(state, action) => {
            state.stats_color = action.payload
        },
        changeAcreageLabel:(state, action) => {
            state.acreage_label = action.payload
        },
        changeTotalAcreage:(state, action) => {
            state.total_acreage = action.payload
        },
        changeSelectedLevel:(state, action) => {
            state.selected_level = action.payload
        },
        changeCropArray:(state, action) => {
            state.crops_array = action.payload
           
        },
       


    }
})

export const dashboardSelections = (state) => state.dashboardselections;
export const { changeSelectedCountry, changeSelectedDistrict, 
    changeSelectedCrop, changeClimateProduct, changeSoilProduct,changeAncilProduct,
     changeStatsFigures, changeStatsLabels, changeStatsColor, changeAcreageLabel,
      changeTotalAcreage, changeSelectedProduct, changeSelectedIndicator,changeSelectedLevel, changeCropArray} = dashboardSelectionSlice.actions
export default dashboardSelectionSlice.reducer