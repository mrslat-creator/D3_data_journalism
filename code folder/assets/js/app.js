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
//Function used for updating yAxis var upon click on axis label.
function renderYAxis(newYScale, yAxis) {
  var leftAxis = d3.axisLeft(newYScale);
  yAxis.transition()
      .duration(1000)
      .call(leftAxis);
    return yAxis;
}
//Function used for updating circles group with a transition to new circles
function renderCircles(circlesGroup, newXScale, newYScale, chosenXAxis, chosenYAxis) {
  circlesGroup.transition()
       .duration(1000)
       .attr("cx", d => newXScale(d[chosenXAxis]))
       .attr("cy", d => newYScale(d[chosenYAxis]))
    return circlesGroup;
}
//Function used for updating text in circles group with a transition to new text.
function renderText(circletextGroup, newXScale, newYScale, chosenXAxis, chosenYAxis) {
  circletextGroup.transition()
       .duration(1000)
       .attr("x", d => newXScale(d[chosenXAxis]))
       .attr("y", d => newYScale(d[chosenYAxis]));
    return circletextGroup;
}
// Function used for updating circles group with new ToolTip.
function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, textGroup) {
    // Conditional for X Axis
    if(chosenXAxis === "poverty") {
      var xlabel = "Fundless: ";
  } else if (chosenXAxis === "income") {
      var xlabel =  "Average Income: "
  } else {
      var xlabel = "Age: "
  }
// Conditonal for Y Axis
if (chosenYAxis === "healthcare") {
   var ylabel = "Healthcare Less: ";
  } else if (chosenYAxis === "smokes") {
    var ylabel = "Smokers: "
  } else {
    var ylabel = "Obesity: "
  }
  // Define ToolTip
  var toolTip = d3.tip()
      .offset([120, -60])
      .attr("class", "d3-tip")
      .html(fuction(d) {
        if (chosenXAxis === "age") {
          //All yAxis ToolTip labels presented and formated as %
          //Display Age without fromat for xAxis
          return ('${d.state}<hr>${xlabel} $d[chosenXAxis]}<br>${ylabel}${d[chosenYAxis]}%');
        } else if (chosenXAxis !== "poverty" && chosenXAxis !== "age") {
        // Display Income in dollars for xAxis
          return ('${d.state}<hr>${xlabel} $d[chosenXAxis]}<br>${ylabel}${d[chosenYAxis]}%');
        } else {
        //Display Poverty as percentage for xAxis
          return ('${d.state}<hr>${xlabel} $d[chosenXAxis]}<br>${ylabel}${d[chosenYAxis]}%');
        }
      });
  circlesGroup.call(toolTip);
  // Create "mouseover" event listener to display tool tip.
  circlesGroup
    .on("mouseover", function(data) {
       toolTip.show(data, this);
    }) 
    .on("mouseout", function(data) {
      toolTip.hide(data);
    });
  textGroup
    .on("mouseover", function(data) {
      toolTip.show(data, this);
    })
    .on("mouseout", function(data) {
      toolTip.hide(data);
    });
  return circlesGroup;
}
function makeResponsive() {
  // Select div by id.
  var svgArea = d3.select("#scatter").select("svg");
  //Clear SVG
  if (!svgArea.empty()) {
     svgArea.remove();
  }
  //SVG params
  var svgHeight = window.innerHeight/1.2;
  var svgWidth = window.innerWidth/1.7;
  //Margins
  var margin = {
     top:50,
     right: 50
     bottom: 100, 
     left: 80
  };
  //Chart area minus margins
  var chartHeight = svgHeight - margin.top -margin.bottom;
  var chartWidth = svgWidth - margin.left - margin.right;
  // Create an SVG wrapper, append an SVG group that will hold our chart, 
  //and shift the latter by left and top margins
  var svg = d3
   .select("#scatter")
   .append("svg")
   .attr("width", svgWidth)
   .attr("height", svgHeight);
  // Append an SVG group
  var chartGroup = svg.append("g")
      .attr("transform", 'translate(${margin.left}, ${margin.top})');
  d3.csv("assets/data/data.csv").then(function(demoData, err) {
     if (err) throw err;
     //Parse data
     demoData. forEach(function(data)  {
       data.poverty = +data.poverty;
       data.healthcare = +data.healthcare;
       data.age = +data.age;
       data.smokes = +data.smokes;
       data.income = +data.income;
       data.obesity = +data.obesity;
  });
  // Create x/y linear scales
  var xLinearScale = xScale(demoData, chosenXAxis, chartWidth);
  var yLinearScale = yScale(demoData, chosenYAxis, chartHeight);
 // Create initial axis functions
 var bottomAxis = d3.axisBottom(xLinearScale);
 var leftAxis = d3.axisLeft(yLinearScale);
 // Append x axis
 var xAxis = chartGroup.append("g")
     .attr("transform", 'translate(0, ${chartHeight})')
     .call(bottomAxis);
 // Append y Axis
 var yAxis = chartGroup.append("g")
    .call(LeftAxis);
  // Set data used for circles
  var circleGroup = chartGroup.selectAll("circle")
      .data(demoData);
  //Bind data
  var elemEnter = circlesGroup.enter();
  //Create Circles
  var
}