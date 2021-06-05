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
function renderXAxis(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);
  xAxis.transition()
       .duration(1000)
       .call(bottomAxis);
    return xAxis;
}
// Function used for updating y-scale var upon click on axis label.
function yScale(data, chosenYAxis, chartHeight) {
  //Create Scales
  var yLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d[chosenYAxis]) *8,
      d3.max(data, d => d[chosenYAxis]) *1.2])
    .range([chartHeight, 0]);
    return yLinearScale;
}