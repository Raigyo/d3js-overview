var data = [{point:200}, {point:150}, {point:80}, {point:220}, {point:130}];

var svg = d3.select('body')
            .append('svg')
            .attr('width', 600)
            .attr('height', 500)
            .style('background', 'antiqueWhite');

var line = d3.line()
             .x(function(d){return d.point})
             .y(function(d,i){return (i+1)*50;}) /* we use index to build y coordinates
                                                    ex: M200,50L150,100L80,150L220,200L130,250*/
             .curve(d3.curveBasisClosed) // to maque curves

svg.append('path').attr('d', line(data)) // we add it after determining its coordinates