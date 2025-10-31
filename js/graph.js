// Code for generating a Chart.js line chart
async function getData(){
    const response = await fetch('../data/researchdata.csv'); // .. moves up one folder
    const data = await response.text()                
    // console.log(data);          // CSV to TEXT

    const xModels = [];         // x-axis label = model types  
    const yScores = [];         // y-axis label = model scores
    const yHScores = [];        // y-axis label = model scores with hyperparameters

    // \n - new line character
    // split('\n') - will seperate the table into an array of individual rows
    // slice(start, end) - return a new array starting at index "stard" up to and include index "end"

    const table = data.split('\n').slice(1) // Split by line and remove first row 
    //console.log(table);

    table.forEach(row => {
        const columns = row.split(',');
        const model = (columns[0]);    // Assign model
        xModels.push(model);                     // Push each model into array for models
        
        const score1 = parseFloat(columns[1]);   // Convert non hyperparameter score to float
        yScores.push(score1);                    // Push score to array and reference
               
        const score2 = parseFloat(columns[2]);   // Convert  hyperparameter score to float
        yHScores.push(score2);                // Push score to array and reference

        console.log(model, score1, score2);
    });

    return {xModels, yScores, yHScores};  // Use {} to return multiple values in one object
}


async function createChart(){
    const data = await getData(); // creatChart will wait for getData to process CSV info
    const barChart = document.getElementById("barchart");

    const myChart = new Chart(barChart, {  // Construct the chart    
        type: 'bar',
        data: {                         // Define data
            labels: data.xModels,       // x-axis labels
            datasets: [                 // Each object describes one dataset of y-values
                                        //  including display properties.  To add more datasets, 
                                        //  place a comma after the closing curly brace of the last
                                        //  data set object and add another dataset object. 
                {
                    label:    `Accuracy Score of Model Without Hyperparameter Tuning`,   
                    data:     data.yScores,    // Reference to array of y-values
                    backgroundColor:  'rgba(255, 0, 132, 0.2)',    // Color for data marker
                    borderColor:      'rgba(255, 0, 132, 1)',      // Color for data marker border
                    borderWidth:      1   // Data marker border width
                },
                {
                    label:    `Accuracy Score of Model With Hyperparameter Tuning`,   
                    data:     data.yHScores,    // Reference to array of y-values
                    backgroundColor:  'rgba(0, 102, 255, 0.2)',    // Color for data marker
                    borderColor:      'rgba(0, 102, 255, 1)',      // Color for data marker border
                    borderWidth:      1   // Data marker border width
                },
            ]
        },
        options: {
            scales: {
                x: {
                title: {
                    display: true,
                    text: 'Model Type',
                    font: {
                    size: 25,
                    weight: 'bold'
                    }
                },
                ticks: {
                    font: {
                    size: 14
                    }
                }
                },
                y: {
                title: {
                    display: true,
                    text: 'Accuracy Score in (%)',
                    font: {
                    size: 25,
                    weight: 'bold'
                    }
                },
                ticks: {
                    font: {
                    size: 14
                    }
                }
                }
            },
            plugins: {                  // Display options for title and legend
                title: {
                    display: true,
                    text: 'Model Accuracy Scores With and Without Hyperparameter Tuning',
                    font: {
                        size: 30,
                    },
                    color: '#black',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    display: true,
                    position: 'top', // can be 'top', 'bottom', 'left', 'right'
                    labels: {
                        font: {
                            size: 16,
                            family: 'Arial, sans-serif'
                        },
                        color: '#333' // optional text color
                    }
                }
            }
        }

        /*
        options: {                        // Define display chart display options 
            responsive: true,             // Re-size based on screen size
            maintainAspectRatio: false,
            scales: {                     // Display options for x & y axes
                x: {                      // x-axis properties
                    title: {
                        display: true,
                        text: 'Year',     // x-axis title
                        font: {           // font properties
                            size: 14
                        },
                    },
                    ticks: {                      // x-axis tick mark properties
                        callback: function (val, index){
                            // Set the tick marks every 5 years
                            return index % 5 === 0 ? this.getLabelForValue(val) : '';
                        },
                               // starting value      
                    font: {
                        size: 14  
                    },
                    },
                    grid: {                       // x-axis grid properties
                        color: '#6c767e'
                    }
                },
                y: {                              // y-axis properties
                    title: {
                        display: true,                          
                        text: `Accuracy Score in %`,     // y-axis title
                        font: {
                            size: 14
                        },
                    },
                    ticks: {
                        min: 0,                   
                        maxTicksLimit: data.yTemps.length/10,        // Actual value can be set dynamically
                        font: {
                            size: 12
                        }
                    },
                    grid: {                       // y-axis gridlines
                        color: '#6c767e'
                    }
                }
            },
            plugins: {                  // Display options for title and legend
                title: {
                    display: true,
                    text: 'Global Mean Temperature vs. Year (since 1880)',
                    font: {
                        size: 24,
                    },
                    color: '#black',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    align: 'start',
                    position: 'bottom',
                }
            }
        }
        */       
    });
}

//labooboo labooooboooooooo LA BOOO BOOOOOo


 createChart();