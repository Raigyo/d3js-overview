// SELECT

// const div = document.querySelector('div');

// d3.select - select an element from the document
// const d3Div = d3.select('div');

// d3.selectAll - select multiple elements from the document.
// const d3DivAll = d3.selectAll('div');
const box = d3.select('.box');

// APPEND

// selection.append - create, append and select new elements
// box.append('svg');
// const svg = box.append('svg');
// svg.append('rect');

// ATTRIBUTE

// svg.attr('heigh', 500);
// svg.attr('width', 600);

// METHOD CHAINING

const svg  = box.append('svg')
                .attr('height', 500)
                .attr('width', 600);

// svg.append('rect')
//    .attr('width', 150)
//    .attr('height', 75)
//    .attr('fill', 'red')
//    .attr('x', 50)
//    .attr('y', 200);

// GROUP <g></g>

const group = svg.append('g')
                 .attr('transform', 'translate(0,100)'); // we can move all the group

group.append('rect')
   .attr('width', 150)
   .attr('height', 75)
   .attr('fill', 'red')
   .attr('x', 50)
   .attr('y', 200);

group.append('line')
   .attr('x1', 50)
   .attr('y1', 100)
   .attr('x2', 250)
   .attr('y2', 200)
   .attr('stroke', 'green');

group.append('circle')
   .attr('r', 100)
   .attr('cx', 350)
   .attr('cy', 150)
   .attr('fill', 'pink');
