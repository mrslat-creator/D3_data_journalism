d3.csv("assets/data/data.csv").then((data) =>{
     console.log(data);
});
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
      .domain([d3.min(data, d => d[chosenYAxis]) * .8,
      d3.max(data, d => d[chosenYAxis]) * 1.2])
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
      var xlabel = "Poverty: ";
  } else if (chosenXAxis === "income") {
      var xlabel =  "Median Income: "
  } else {
      var xlabel = "Age: "
  }
// Conditonal for Y Axis
if (chosenYAxis === "healthcare") {
   var ylabel = "Lacks Healthcare: ";
  } else if (chosenYAxis === "smokes") {
    var ylabel = "Smokers: "
  } else {
    var ylabel = "Obesity: "
  }
  // Define ToolTip
  var toolTip = d3-tip.js()
      .offset([120, -60])
      .attr("class", "d3-tip")
      .html(fuction(d) {
        if (chosenXAxis === "age") {
          //All yAxis ToolTip labels presented and formated as %
          //Display Age without fromat for xAxis
          return ('${d.state}<hr>${xlabel}$d[chosenXAxis]}<br>${ylabel}${d[chosenYAxis]}%');
          } else if (chosenXAxis !== "poverty" && chosenXAxis !== "age") {
          // Display Income in dollars for xAxis
          return ('${d.state}<hr>${xlabel}$$d[chosenXAxis]}<br>${ylabel}${d[chosenYAxis]}%');
          } else {
          //Display Poverty as percentage for xAxis
          return ('${d.state}<hr>${xlabel}$d[chosenXAxis]}%<br>${ylabel}${d[chosenYAxis]}%');
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
   .select("scatter")
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
  var circle - elemEnter.append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", 15)
    .classed("stateCircle", true);
  // Create circle text
  var circleText = elemEnter.append("text")
    .attr("x", d => xLinearScale(d[chosenXAxis]))
    .attr("y", d => yLinearScale(d[chosenYAxis]))
    .attr("dy", ".35em")
    .text(d => d.abbr)
    .classed("stateText", true);
  //Update tool tip function above csv import
  var circleGroup = updateToolTip(chosenXAxis, chosenYAxis, circle circleText);
  // Add x label groups and labels
  var xlabelsGroup = chartGroup.append("g")
    .attr("transform", 'translate(${chartWidth/ 2}, ${chartHeight + 20})');
  var povertyLabel = xlabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "poverty")// value to grab for event listener
    .classed("active", true)
    .text("In Poverty (%)");
  var agelabel = xlabelsGroup.appen("text")
     .attr("x", 0)
     .attr("y", 40)
     .attr("value", "age") // value to grab for event listener
     .classed("inactive", true)
     .text("Age (Median)");
  var incomeLabel = xLablesGroup.append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "income")// value to grab for event listener
    .classed("inactive", true)
    .text("Household Income (Median)");
  // Add y labels group and lables
  var yLabelGroup = chartGroup.append("g")
    .attr("transform", "rotate(-90)");
  var healthcarelabel = yLabelsGroup.append("text")
    .attr("x", 0 - (chartHeight / 2))
    .attr("y", 40 -margin.left)
    .attr("dy", "1em")
    .attr("value","healthcare")
    .classed("active", true)
    .text("Lacks Healthcare (%)");
  var smokesLabel = yLabelsGroup.append("text")
    .attr("x", 0 - (chartHeight / 2))
    .attr("y", 20 - margin.left)
    .attr("dy", "1em")
    .attr("value", "smokes")
    .classed("inactive", true)
    .text("In Poverty (%)");
  var obeseLabel = yLabelGroup.append("text")
    .attr("x", 0 - (chartHeight / 2))
    .attr("y", 0 - margin.left)
    .attr("dy", "1em")
    .attr("value", "obesity")
    .classed("inactive", true)
    .text("Obese (%)");
  // X labels event listener
   xlabelsGroup.selectAll("text")
       .on("click", function() {
         // Grab selected label
         chosenYAxis = d3.select(this).attr("value");
         // Update xlinerScale
         xLinearScale = xScale(demoData, chosenXAxis, chartWidth);
         //Render xAxis
         xAxis = renderxAxis(xLinerScale, xAxis);
         // Switch active/inactive labels
         if (chosenXAxis === "poverty") {
            povertyLabel 
              .classed("active", true)
              .classed("inactive", false);
            agelabel
              .classed("active", true)
              .classed("inactive", false);
            incomeLabel
             .classed("active", true)
             .classed("inactive", false);
         } else if (chosenXAxis === "age") {
            povertyLabel 
              .classed("active", true)
              .classed("inactive", false);
            agelabel
              .classed("active", true)
              .classed("inactive", false);
            incomeLabel
              .classed("active", true)
              .classed("inactive", false);
         } else {
            povertyLabel 
              .classed("active", true)
              .classed("inactive", false);
            agelabel
              .classed("active", true)
              .classed("inactive", false);
            incomeLabel
              .classed("active", true)
              .classed("inactive", false);
         }
         //Update circles with new x values
         circle = renderCircles(circlesGroup, xLinerScale, yLinearScale, chosenXAxis, chosenYAxis);
         //Update tool tips with new info
         circleGroup = updateToolTip(chosenXAxis, chosenYAxis, circle, circleText);
         //Update circles text with new values
         circleText = renderText(circleText, xLinearScale, yLinearScale, chosenXAxis, chosenYAxis);
    });
   // Y Labels event listener
   yLabelsGroup.selectAll("text")
      .on("click", function() {
          // Grab selected label
          chosenYAxis = d3.select(this).attr("value");
          // Update yLinearScale
          yLinearScale = yScale(demoData, chosenYAxis, charHeight);
          // Update yAxis
          yAxis =renderYAxes(yLinearScale, yAxis);
          // Changes classes to change bold text
          if (chosenYAxis === "healthcare") {
             healthcareLabel
                  .classed("active", true)
                  .classed("inactive", false);
              smokesLabel
                  .classed("active", true)
                  .classed("inactive", false);
              obeseLabel
                  .classed("active", true)
                  .classed("inactive", false);
          } else if (chosenYAxis === "smokes") {
              healthcareLabel
                  .classed("active", true)
                  .classed("inactive", false);
             smokesLabel
                  .classed("active", true)
                  .classed("inactive", false);
             obeseLabel
                  .classed("active", true)
                  .classed("inactive", false);
          } else {
              healthcareLabel
                  .classed("active", true)
                  .classed("inactive", false);
              smokesLabel
                  .classed("active", true)
                  .classed("inactive", false);
              obeseLabel
                 .classed("active", true)
                 .classed("inactive", false);
          }
          // Update circles with new y values
          circle =renderCircles(circlesGroup, xLinearScale, yLinearScale, chosenXAxis, chosenYAxis);
          //Update circles text with new values
         circleText = renderText(circleText, xLinearScale, yLinearScale, chosenXAxis, chosenYAxis);
          //Update tool tips with new info
          circleGroup = updateToolTip(chosenXAxis, chosenYAxis, circle, circleText);
     });
  }).catch(function(err) {
       console.log(err);
  )};
}
makeResponsive();
// Event listener for window resize
// When the browser window is resized, makeResponsive() is called
d3.select(window).on("resize", makeReponsive);