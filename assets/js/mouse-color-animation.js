var i = 0;

var svg = d3.select('body')
            .append('svg')
            .attr('width', 1920)
            .attr('height', 1080);

svg.append('rect')
   .attr('width', 1920)
   .attr('height', 1080)
   .on('pointermove', anim);

function anim(){
    //var coord = d3.mouse(this); // d3.v5.min.js
    var coord = d3.pointer(event) // d3.v6.min.js
    console.log(coord);

    svg.insert('circle', 'rect') // layers: append from bottom to to / insert from top to bottom
       .attr('cx', coord[0]) // mouse position
       .attr('cy', coord[1]) // mouse position
       .attr('r', 0)
       .attr('fill', d3.hsl((i = i + 1), 1, 0.5)) // hsl = color incremented
       .transition()
       .duration(1500)
       .ease(d3.easeCircleOut)
       .attr('r', 150) // magnification from r0 to r150
       .style('opacity', 0) // opacity 0: disappear
       .remove(); // remove from dom
}