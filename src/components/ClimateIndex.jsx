import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import CustomClimate from "./CustomClimate";
import { useDispatch, useSelector } from 'react-redux'
import { dashboardSelections } from './selectionSlice'

import "./styles.css";


const index = ({}, props) => {
  const dispatch = useDispatch()
    const dashboardselections = useSelector(dashboardSelections)
    //return the entire dashboard slice
    const dashboardSlice = useSelector((state) => state.dashboardselections)
  const [showList, setShowList] = useState(false)
  const [defaultSelectText, setDefaultSelectText] = useState("Select product")
  const [countryList, setCountryList] = useState(dashboardSlice.climate_products)

  
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     showList: false,
  //     defaultSelectText: "Please select an option",
  //     countryList: [
  //       'aatujytja','bjykykjbb', 'cckiukkc', 'ddlo;lod', 'eeffafe'
  //     ]
  //   };
  // }
  const { fetchClimateData } = props
   
  
    return (
      <div className="App">
        {/* <h3 className="title">Custom React Select</h3> */}
        <div className="test" >
          <CustomClimate
            defaultText={defaultSelectText}
            optionsList={countryList}
            fetchClimateData={fetchClimateData}
          />
        </div>
       
      </div>
    );
  
}

export default index