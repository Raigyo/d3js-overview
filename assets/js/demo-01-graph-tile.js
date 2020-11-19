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

// data range and scale
const y = d3.scaleLinear()
            .range([graphHeight, 0]);

const x = d3.scaleBand()
            .range([0, 480])
            .paddingInner(0.3)
            .paddingOuter(0.2)

// creation of axis and placement
const axeX = d3.axisBottom(x);
const axeY = d3.axisLeft(y)
                .ticks(6)
                .tickFormat(d => d + ' Euros');

// DATA UPDATE

// Update DOM when we make changes in Firebase
const maj = (myData) => {
  // domain: data max items maping
  y.domain([0, d3.max(myData, d => d.price)]);
  x.domain(myData.map(item => item.name));

  // we add 'rect' to the group 'graph' with data
  const rects = graph.selectAll('rect')
                     .data(myData);

  // update of rect already in DOM
  rects.attr('width', x.bandwidth())
       .attr('fill', 'teal')
       .attr('x', function(d){return x(d.name)})
       .transition()
       .duration(600)
       .attr('y', function(d){return y(d.price)})
       .attr('height', function(d){return graphHeight - y(d.price)})

  // fct exit (delete from DOM)
  rects.exit().remove();

  // fct enter
  rects.enter()
        .append('rect')
        .attr('width', x.bandwidth())
        .attr('height', 0) // min height
        .attr('fill', 'teal')
        .attr('x', function(d){return x(d.name)})
        .attr('y', graphHeight) // max height
        .transition()
        .duration(600)
        .attr('y', function(d){return y(d.price)})
        .attr('height', function(d){return graphHeight - y(d.price)})

  // we call axis in groups
  groupeX.call(axeX)
         .style('font-size', "14px");
  groupeY.call(axeY)
         .style('font-size', "14px");
}

// FIREBASE CONNEXION

// db.collection('country').get().then(res => {
//   var myData = [];
//   res.docs.forEach(doc => {
//     myData.push(doc.data())
//   })
//   maj(myData);
// })

// onSnapshot: Firebase method to update in realtime

var myData = [];
db.collection('country').onSnapshot(res => {
  // console.log(res.docChanges());
  res.docChanges().forEach(change => {
    const doc = {...change.doc.data(), id: change.doc.id};
    switch(change.type){
      case 'added':
            myData.push(doc);
            break;
      case 'modified':
            const index = myData.findIndex(item => item.id == doc.id);
            myData[index] = doc; // we replace old index by the new one
            break;
      case 'removed':
            myData = myData.filter(item => item.id !== doc.id);
            // leave all items that are different from doc.id
            // it's removed from myData but not from DOM: use method 'exit'
            break;
      default:
            break;
    }
  })

  maj(myData);

})