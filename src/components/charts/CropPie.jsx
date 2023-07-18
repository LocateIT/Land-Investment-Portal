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
        display: true,
        position: 'right',
        align: 'center',
        marginLeft: 150,
        labels: {
          fontSize: 12,
          fontColor: '#fff',
          borderColor:'none',
          boxWidth: 20, // This sets the width of each legend item box
      padding: 15,  // This sets the margin between the legend items
        },
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