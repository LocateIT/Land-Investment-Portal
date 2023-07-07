import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import CustomSelect from "./CustomSelect";
import { useDispatch, useSelector } from 'react-redux'
import { dashboardSelections } from './selectionSlice'

import "./styles.css";


const index = ({}) => {
  const dispatch = useDispatch()
    const dashboardselections = useSelector(dashboardSelections)
    //return the entire dashboard slice
    const dashboardSlice = useSelector((state) => state.dashboardselections)
  const [showList, setShowList] = useState(false)
  const [defaultSelectText, setDefaultSelectText] = useState("Select crop")
  const [countryList, setCountryList] = useState(dashboardSlice.crops)

  
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
  
    return (
      <div className="App">
        {/* <h3 className="title">Custom React Select</h3> */}
        <div className="test" >
          <CustomSelect
            defaultText={defaultSelectText}
            optionsList={countryList}
          />
        </div>
       
      </div>
    );
  
}

export default index