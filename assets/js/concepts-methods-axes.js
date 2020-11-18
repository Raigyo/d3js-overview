
// Les dimensions
var margin = {top: 20, right: 20, bottom: 30, left: 50};
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;
// Create our SVG frame
// add the group which contains the graph
// Move this group
var svg = d3.select("body").append('svg')
            .attr('width', 960)
            .attr('height', 550)
            .style('background','antiqueWhite')
            .append('g')
            //.attr('transform', "translate(" + margin.left + ", " + margin.top + ")")
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

// Creation of groups X and Y
const groupeX = svg.append('g')
                   //.attr('transform', "translate(0, " + height + ")")
                   .attr('transform', `translate(0, ${height})`);
const groupeY = svg.append('g');

d3.json('../js/data-method-axes.json').then(data => {

  var parseTime = d3.timeParse("%d-%b-%y");

  // Formatting strings in date object
  data.forEach(function(d) {
    // console.log(parseTime(d.date));
     d.date = parseTime(d.date);
   })

  // Set up the domain and range of our axes
  var x = d3.scaleTime()
            .domain(d3.extent(data, d => d.date)) // input data (date) from min to max
            .range([0, width]);
  // console.log(d3.extent(data, d => d.date));
  var y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.valeur)]) // fromro to max
            .range([height, 0]); // inverted to have the zero from bottom

  // X axis
  const axeX = d3.axisBottom(x);

  groupeX.call(axeX)
         .style('font-size', '14px');
  // We rotate datas (visual effect)
  groupeX.selectAll('text')
         .attr('transform', 'rotate(-30) translate(0,10)')
         .attr('text-anchor', 'end');

  // Y axis
  const axeY = d3.axisLeft(y)
  .ticks(5);
  groupeY.call(axeY)
  .style('font-size', '13px');

  // We create coordinates for each data
  var valueLine = d3.line()
                    .x(function(d) {return x(d.date)})
                    .y(function(d) {return y(d.valeur)});

  // Wa add these coordinates to the path (we use css to avoid the line to fill in)
  svg.append('path')
     .attr("class", "line") // we use class called from css in html
     .attr('d', valueLine(data));
})