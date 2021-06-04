//Set default x/y axis varaiables.
var chosenXAxis ="poverty";
var chosenYAxis ="healthcare";
// Function used for updating x-scale var upon click on axis label.
function xScale(data, chosenXAxis, chartWidth) {
  // Creat scales.
  var xLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d[chosenXAxis]) *.8,
               d3.max(data, d => d[chosenXAxis]) *1.1])
      .range([0, chartWidth]);
  return xLinearScale;
}
// Function used for updating xAxis var upon click on axis label.
function renderXAxis
