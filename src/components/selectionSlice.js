import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    countries: ['Malawi', 'Guinea', 'Madagascar'],
    districts: [],
    selected_country:'Malawi',
    selected_district:'',
    selected_indicator:'',
    selected_product:'',
    selected_crop:'',
    selected_climate:'',
    indicators:['Crop Production', 'Climate', 'Soil Fertility', 'Land Use', 'Night-time Light', 'Ancillary Data'],
    products:['Agricultural Productivity', 'Crop Suitability'],
    crops:['Maize', 'Groundnuts', 'Tobacco', 'Cranberry', 'Tea'],
    climate_products:['Precipitation', 'Temperature', 'Elevation'],
    soil_products:['Soil Texture','Organic Carbon', 'Drainage', 'Cations', 'Nutrients'],
    selected_soil:''
}


const dashboardSelectionSlice = createSlice({
    name: 'dashboardselections',
    initialState,
    reducers:{
        changeSelectedCountry:(state, action) => {
            state.selected_country = action.payload
           
        },
        changeSelectedDistrict:(state, action) => {
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
        }


    }
})

export const dashboardSelections = (state) => state.dashboardselections;
export const { changeSelectedCountry, changeSelectedCrop, changeClimateProduct, changeSoilProduct} = dashboardSelectionSlice.actions
export default dashboardSelectionSlice.reducer