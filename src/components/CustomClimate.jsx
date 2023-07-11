import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'

import { dashboardSelections } from './selectionSlice';
import {  changeClimateProduct} from './selectionSlice';

const CustomClimateSelect = ({ fetchClimateData }) => {
  const dispatch = useDispatch()
    const dashboardselections = useSelector(dashboardSelections)
    //return the entire dashboard slice
    const dashboardSlice = useSelector((state) => state.dashboardselections)
    const [defaultSelectText, setDefaultSelectText] = useState("Select product")
  const [showOptionList, setShowOptionList] = useState(false);
  const [optionsList, setOptionsList] = useState(dashboardSlice.climate_products)




  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    setDefaultSelectText(defaultSelectText);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (
      !e.target.classList.contains("custom-select-option") &&
      !e.target.classList.contains("selected-text")
    ) {
      setShowOptionList(false);
    }
  };

  const handleListDisplay = () => {
    setShowOptionList((prevState) => !prevState);
  };

  const handleOptionClick = (e) => {
    setDefaultSelectText(e.target.getAttribute("data-name"));
    setShowOptionList(false);
    console.log(e.target.getAttribute("data-name"));
    
    fetchClimateData(dispatch(changeClimateProduct(e.target.getAttribute("data-name"))))
    // const { fetchClimateData } = props
    
  };
  
  return (
    <div className="custom-select-container" style={{ borderRadius:'10px'}}>
      <div
        className={showOptionList ? "selected-text active" : "selected-text"}
        onClick={handleListDisplay}
      >
        {defaultSelectText}
      </div>
      {showOptionList && (
        <ul className="select-options">
          {optionsList.map((option) => (
            <li
              className="custom-select-option"
              data-name={option}
              key={option}
              onClick={handleOptionClick}
              onChange={fetchClimateData}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomClimateSelect;
