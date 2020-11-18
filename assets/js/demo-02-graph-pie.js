//SETUP

const dims = {height: 300, width: 300, radius: 150};

const svg = d3.select('.box')
              .append('svg')
              .attr('width', dims.width + 150) // for labels
              .attr('height', dims.height + 150);

// graph group centered
const graph = svg.append('g')
                 .attr('transform', `translate(${dims.width / 2 + 5}, ${dims.height / 2 + 5})`);

const pie = d3.pie()
              .sort(null)
              .value(d => d.price);

const arcPath = d3.arc()
                  .outerRadius(dims.radius)
                  .innerRadius(dims.radius / 2);

const color = d3.scaleOrdinal((d3['schemeAccent']));

// UPDATE

const maj = (myData) => {
  // console.log(myData)
  // we add 'path' to the group 'graph' with data
  const paths = graph.selectAll('path')
                     .data(pie(myData));
  console.log(paths.enter());

  // fct exit (delete from DOM)
  paths.exit().remove();

   // DOM update
   paths.attr('d', arcPath);

  // fct enter
  paths.enter()
       .append('path')
       .attr('d', arcPath)
       .attr('stroke', '#fff')
       .attr('stroke-width', 3)
       .attr('fill', d => color(d.data.nom))
       .transition()
       .duration(700)
       //.attrTween('d', animEnter);
}

// FIREBASE CONNEXION

var myData = [];
db.collection('spending').onSnapshot(res => {
  res.docChanges().forEach(change => {
    const doc = {...change.doc.data(), id: change.doc.id};
    switch(change.type){
      case 'added':
            myData.push(doc);
            break;
      case 'modified':
            const index = myData.findIndex(item => item.id == doc.id);
            myData[index] = doc;
            break;
      case 'removed':
            myData = myData.filter(item => item.id !== doc.id);
            break;
      default:
            break;
    }
  })
  maj(myData);
})