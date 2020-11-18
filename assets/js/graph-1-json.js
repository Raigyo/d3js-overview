// SETUP

// const svg = d3.select('svg');

// we create the svg using javascript
const svg = d3.select('.box')
              .append('svg')
              .attr('width', 600) // .attr is for svg
              .attr('height', 600)
              .style('background', 'AntiqueWhite'); // .style is classical css

// dimensions used in the group
const margin = {top: 20, right: 20, bottom: 100, left: 100};
const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

// we create a group with all the rectangles
/*The selection.append() function is used to append a new element to the HTML tag name as given
in the parameters to the end of the element.
If the type that is given is a function then it must be evaluated for each element
that is in the selection.*/
const graph = svg.append('g')
                 .attr('width', graphWidth)
                 .attr('height', graphHeight)
                 .attr('transform', `translate(${margin.left}, ${margin.top})`);
                 /*backticks because we use values, same than:
                 .attr('transform', "translate(" + margin.left + ", " + margin.top + ")")
                 */

//Create Title
const titleGraph = graph.append("text")
                        .text("Prices in euros for round trip flights by countries")
                        .attr('x', graphWidth / 2)
                        .attr("y", 550)
                        .style("text-anchor", "middle");

// we create 2 groups for the axis
const groupeX = graph.append('g')
                     .attr('transform', `translate(0, ${graphHeight})`); // put the x axis below
const groupeY = graph.append('g');

// DATA

d3.json('assets/js/data-graph-1.json').then(myData => {

  // data max

  // const min = d3.min(myData, d => d.price); // min price
  const max = d3.max(myData, d => d.price); // max price
  // const extent = d3.extent(myData, d => d.price);

    /* The d3.extent() function in D3.js is used to returns the minimum and maximum value
  in an array from the given array using natural order.
  If an array is empty then it returns undefined, undefined as output.*/

  // The d3.scaleLinear() method is used to create a visual scale point.
  // This method is used to transform data values into visual variables.
  const y = d3.scaleLinear()
              .domain([0, max]) // input data from min to max
              /* range is the output range that you would like your input values to map to.*/
              .range([graphHeight, 0]); // was .range([0, 480]), but we need to invert it

  /* The d3.scaleBand() function in D3.js is used to construct a new band scale with the domain
  specified as an array of values and the range as the minimum and maximum extents of the bands.
  This function splits the range into n bands where n is the number of values in the domain array.*/
  const x = d3.scaleBand()
              // map: put selected datas from json into an array
              .domain(myData.map(item => item.name))
              .range([0, 480])
              .paddingInner(0.3)
              .paddingOuter(0.2)

  // we add rect to the group 'graph' with data
  const rects = graph.selectAll('rect')
                     .data(myData);

  // update of rect
  rects.attr('width', x.bandwidth())
  .attr('height', function(d){return graphHeight - y(d.price)}) /* total height - rect height*/
  .attr('fill', 'teal')
  .attr('x', function(d){return x(d.name)})
  .attr('y', function(d){return y(d.price)}); /* place the rectangles at the good position
                                              from their price value to zero*/

  // add rect according to datas

  /*.enter identifies any DOM elements that need to be added when
  the joined array is longer than the selection.*/
  rects.enter()
        .append('rect')
        .attr('width', x.bandwidth())
        .attr('height', function(d){return graphHeight - y(d.price)}) // total height - rect height
        .attr('fill', 'teal')
        //.attr('x', function(d,i){return i * 75}); // shift on x
        .attr('x', function(d){return x(d.name)})
        .attr('y', function(d){return y(d.price)});

  // creation of axis and placement
  const axeX = d3.axisBottom(x); // X axis side
  const axeY = d3.axisLeft(y) // Y axis side
                 .ticks(6) // number of ticks on the axis (approximatively)
                 .tickFormat(d => d + ' Euros');

  groupeX.call(axeX) // we put axis in groups
         .style('font-size', "14px");
  groupeY.call(axeY)
         .style('font-size', "14px");
})