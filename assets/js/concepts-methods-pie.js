// We create our frame

var svg = d3.select('body')
            .append('svg')
            .attr('width', 700)
            .attr('height', 600)
            .style('background', 'antiqueWhite');

var items = [200, 300, 100, 300];

// Pie method convert numbers to angles
//var data = d3.pie()(items);
var data = d3.pie().sort(null)(items); // sort null = same order than in the array

// console.log(data);

// Arc method defines the layout of our pie
var segments = d3.arc()
                 .innerRadius(40)
                 .outerRadius(125)
                 .padAngle(0.02); // padding between sections of the pie

// We create a group and add the path elements to it
var sections = svg.append("g")
                  .attr('transform', 'translate(300,300)')
                  .selectAll('path')
                  .data(data) // link to datas
                  .enter()
                  .append('path')
                  .attr('d', segments)
                  .attr('fill', 'crimson');