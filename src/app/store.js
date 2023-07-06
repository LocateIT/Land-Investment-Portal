import { configureStore } from '@reduxjs/toolkit'
import dashboardReducer from '../components/selectionSlice.js'

export const store = configureStore({
    reducer:{
        dashboardselections:dashboardReducer
    }
})