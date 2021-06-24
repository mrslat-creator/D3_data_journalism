var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60, 
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//Create a SVG Wrapper, append a  SVG group that can hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#chart")
   .append("svg")
   .attr("width", svgWidth)
   .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Import Data
d3.csv("Assets/data/data.csv").then(function(demoData) {
  console.log(demoData);
  demoData.forEach(function(data){
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    console.log(data.poverty);

  });
  //Create x/y Linear scales
  var xLinearScale = d3.scaleLinear()
    .domain([20, d3.max(demoData, d => d.poverty)])
    .range([0, width]);
  
  var yLinearScale = d3.scaleLinear()
}).catch(function(error) {
  console.log(error);
});