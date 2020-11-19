function showNumbers(){
  d3.select('#content')
    .transition()
    .duration(5000)
    .ease(d3.easeLinear)
    //.attr('value', 100);
    .attrTween('value', function(){
      var numbers = d3.interpolateRound(0,100); // from zero to 100
      return function(i){return numbers(i)}
    })
    .styleTween('font-size', function(){
      var size = d3.interpolateString('10px', '70px');
      return function(i){ return size(i)}
    })
}