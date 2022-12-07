import React, { useState, useCallback } from "react";
import {Bar} from "react-chartjs-2";
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);


// prompt to get the sheet url 
var sheet_url=prompt("Enter Sheet url for Visulation");










 const Barchart=()=>{

  //  using usestate to get updated label after fetch and 


  // usestate to check whether data is fetched or not 
const [fetched,isFetched] = useState(false);

// usestate to change label and grdata when data is fetched 
const [labels,setlabels] = useState([]);
const [grDatas,setGrDatas] = useState([]);
const[gTitle,setgTitle] = useState([]);

// decalaring empty array for lablel and graphdata 
var grdata=[];
var label=[];
var graphTitle='';
async function sheetFetch(){
// fetching data from the google sheet 
const url="https://script.google.com/macros/s/AKfycbyCeaZBR8OyXoGTRrX1jT1SkRToR_SBP7WgV_BqE-NTggwOkSH3W7qgdT2kwzjeiCLc/exec";
fetch(url)
.then(res=>res.json())
.then(data=>{

// getting graph title 
graphTitle=data.content[0][0];

  // from the data we got from sheet we are separating two column for label and graph data 

    for(var i=2;i<data.content.length;i++){
grdata.push(data.content[i][3]);
label.push(data.content[i][1]);

    }

  //  as data is fetched now so setting is fetched true 
    isFetched(true);

    // setting data and labels from use state to the data and label we got from sheet 
    setlabels(label);
    setGrDatas(grdata);
    setgTitle(graphTitle);

// console.log(grdata);
// console.log(label);
    


});

    
return {grdata,label};


}





// calling our sheet fetch function to use for graph plot 

sheetFetch();



// returning graph as bar graph component 


  return (

      
       <div className="App">
            <h1> {gTitle}</h1>
            <div style={{ maxWidth: "650px" }}>
              {fetched?<Bar
                data={{
                  // Name of the variables on x-axies for each bar

                  labels:labels,
                  datasets: [
                    {
                      // Label for bars
                      label: "Main Sampling Event",
                      // Data or value of your each variable
                      data:grDatas,
                      // Color of each bar
                      backgroundColor: ["aqua", "green", "red", "yellow","brown"],
                      // Border color of each bar
                      borderColor: ["aqua", "green", "red", "yellow","green"],
                      borderWidth: 0.5,
                    },
                  ],
                }}
                // Height of graph
                height={400}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          // The y-axis value will start from zero
                          beginAtZero: true,
                        },
                      },
                    ],
                  },
                  legend: {
                    labels: {
                      fontSize: 15,
                    },
                  },
                }}
              />:<img src="https://media.giphy.com/media/RrDij4cJG4ceCCcnb8/giphy.gif" className="Preloader" />}
            </div>
          </div>
      
      
      )
      



// console.log(grdata);
// console.log(label);


}


export default Barchart;


