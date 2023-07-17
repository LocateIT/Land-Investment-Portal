import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    ArcElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Pie } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );


export const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
        // position: 'top',
      },
      title: {
        display: false,
        // text: 'Land Cover Chart',
      },
    },
  };






const CropPie = ({data}) => {
  return (
     <Pie options={options} data={data}  width={300}
     height={250}  />
  )
}

export default CropPie