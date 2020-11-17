var svg = d3.select('.box')
            .append('svg')
            .attr('width', 900)
            .attr('height', 400)
            .style('background', 'AntiqueWhite');
svg.append('circle')
   .attr('cx', 150)
   .attr('cy', 50)
   .attr('r', 35);

function anim(){
  d3.select('circle')
    .transition()
    .delay(500) // ms
    .duration(1500)
    .attr('cx', 750)
    .transition()
    .attr('cy', 350)
    .transition()
    .delay(500) // ms
    .duration(1500)
    .attr('cx', 150)
    .transition()
    .attr('cy', 50)
}
















