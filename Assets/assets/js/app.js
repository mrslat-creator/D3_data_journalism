//Create a responsive chart

//Function to resize chart
function responsiveChart() {

   //Clear svg area
   var svgArea =d3.select("#scatter").select("svg");
   
   if(!svgArea.empty()) {
      svgArea.remove();
   }

   //Create SVG Wrapper
   //Define canvas as width andheight of the browser window
   var svgWidth = window.innerWidth;
   var svgHeight = window.innerHeight;

   //Set Margins
   var margin = {
      top: 30,
      bottom:50, 
      left:50,
      right: 200
   };

   //Set chart height and width linked to window height and width from svgWidth/svgHeight linked to windo width/height.
   var chartHeight = svgHeight - margin.top - margin.bottom;
   var chartWidth = svgWidth - margin.left - margin.right;


   //Append svg element
   //into index.html at id="scatter" and height/width based on the window height/width
   var svg = d3
       .select("#scatter")
       .append("svg")
       .attr("height", svgHeight)
       .attr("width", svgWidth);

    //Append group element "g" to the svg element, wrap all parts of the svg chart together
    //Transform to place "g" element at the proper margins on the svg canvas
    var chartGroup = svg.append("g")
        .attr("transfomr", 'translate(${margin.left}, ${margin.top})');
    
    //Read in SVG file and Extract Data
    d3.csv("./Assets/assets/data.csv").then(function(censusData) {
      console.log(censusData);
   //Convert data from csv table to numbers for use in scatter plot
      censusData.forEach(function(data){
         data.poverty = +data.poverty;
         data.povertyMoe = +data.povertyMoe;
         data.age = +data.age;
         data.ageMoe = +data.ageMoe;
         data.income = +data.income;
         data.incomeMoe = +data.incomeMoe;
         data.healthcare = +data.healthcare;
         data.healthcareLow = +data.healthcareLow;
         data.healthcareHigh = +data.healthcareHigh;
         data.obesity = +data.obesity;
         data.obesityLow = +data.obesityLow;
         data.obesityHigh = +data.obesityHigh;
         data.smokes = +data.smokes;
         data.smokesLow = +data.smokesLow;
         data.smokesHigh = +data.smokesHigh;
      });

      //Create scale functions for Healthcare on xAxis and Poverty on yAxis
      //Healthcare scale on xAxis
      var xLinearScale = d3.scaleLinear()
          .domain([d3.min(censusData, d => d.healthcare) - 1, d3.max(censusData, d=> d.healthcare) + 1])
          .range([0, chartWidth]);
      
      //Poverty scale on yAxis
      var yLinearScale = d3.scaleLinear()
          .domain([d3.min(censusData, d => d.poverty) - 1, dr.max(censusData, d => d.poverty) + 1])
          .range([chartHeight, 0]);
              
      //Create axis functions
      var bottomAxis = d3.axisBottom(xLinearScale);
      var leftAxis = d3.axisLeft(yLinearScale);

      //Append axis to chart
      //Bottom is translated down to bottom of the chart and y axis by chart height
      chartGroup.append("g")
           .attr("transform", `translate(0, ${chartHeight})`)
           .call(bottomAxis);

      //leftAxis is place on left
      chartGroup.append("g")
         .call(leftAxis);
      
      //Establish a color scale 
      var colorScale =d3.scaleLinear()
      .domain([d3.min(censusData, d => d.obesity), d3.mean(censusData, d => d.obesity), d3max(censusData, d=> d.obesisty)])
      .range(["green", "yellow", "red"]);
      
      //Tool tip implementation
      var tool_tip = d3.tip()
          .attr("class", "d3-tip")
          .offset([0,50])
          .html(function(d) { return '${d.state}<hr>$${d.income}<hr>Obesity Index: ${d.obesity}, Smoking Index: $ {d.smokes}'}); 
    
      svg.call(tool_tip);
      
      
      //Create circles for plotting
      var circleGroup = chartGroup.selectAll("circle")
          .data(censusData)
          .enter()

          circleGroup
          .append("circle")
          .attr("class", "circle")
          .attr("cx", d => xLinearScale(d.healthcare))
          .attr("cy", d => yLinearScale(d.poverty))
          .attr("r", d => ((d.income*d.income)/110000000))
          .attr("fill", function(d) { return colorScale(d.obesity); })
          .attr("opacity", "0.7")
          .style("stoke", "black")

        //Create labels using abbrevations
           circleGroup
           .append("text")
           .text(function(d){
             return d.abbr;
           })
           .attr("x", d => xLinearScale(d.healthcare) - 11)
           .attr("y", d => yLinearScale(d.poverty) + 6)
           
           .on("click", tool_tip.show)
           .on("mouseout", tool_tip.hide)
        
         //Create axis labels
         //yAxis label
         chartGroup.append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 0 -margin.left +15)
              .attr("x", 0 - (chartHeight / 2))
              .attr("class", "axisText")
              .text("Poverty Index");
       
         //xAxis label
         chartGroup.append("text")
         .attr("y", chartHeight + margin.top + 5)
         .attr("x", chartWidth / 2)
         .attr("class", "axisText")
         .text("Healthcare Index");

    });

 };

 //call responsiveChart when page loads
 responsiveChart();

 //call make responsixe when page is resized
 d3.select(window).on("resize", responsiveChart);