//function to resize chart
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
        .attr("transfomr", `translate(${margin.left}, ${margin.top})`);
    
    //Read in SVG file and Extract Data
    d3.csv("./assets/data/data.csv").then(function(censusData) {
      console.log(censusData);
    })