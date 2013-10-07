d3.csv("testFighterData.csv", function(error, links) {

var nodes = {};

links.forEach(function(link) {
    link.source = nodes[link.source] || 
        (nodes[link.source] = {name: link.source});
    link.target = nodes[link.target] || 
        (nodes[link.target] = {name: link.target});
    link.win = +link.win;
    link.plusminus = link.plusminus+link.win || link.win;
    link.record = link.record + 1 || 1;
});


var width = 960,
    height = 500;

var force = d3.layout.force()
    .nodes(d3.values(nodes))
    .links(links)
    .size([width, height])
    .linkDistance(300)
    .charge(-300)
    .on("tick", tick)
    .start();

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.append("svg:defs").selectAll("marker")
    .data(["end"])      
  .enter().append("svg:marker")    
    .attr("id", String)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 28)
    .attr("refY", -2.4)
    .attr("markerWidth", 10)
    .attr("markerHeight", 10)
    .attr("orient", "auto")
  .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");

var path = svg.append("svg:g").selectAll("path")
    .data(force.links())
  .enter().append("svg:path")
    .attr("class", function(d) { 
      if(d.win === 1){
        d.type = 'win';
      }
      else(d.type = 'lose');
      return "link " + d.type; })
    .attr("marker-end", "url(#end)");

var node = svg.selectAll(".node")
    .data(force.nodes())
  .enter().append("g")
    .attr("class", "node")
    .call(force.drag);

node.append("circle")
    .attr("r", 30)

node.append("text")
    .attr("x", -25)
    .attr("dy", ".35em")
    .text(function(d) { return d.name; });

function tick() {
    path.attr("d", function(d) {
        var dx = d.target.x - d.source.x-5,
            dy = d.target.y - d.source.y-5,
            dr = Math.sqrt(dx * dx + dy * dy);
        return "M" + 
            d.source.x + "," + 
            d.source.y + "A" + 
            dr + "," + dr + " 0 0,1 " + 
            d.target.x + "," + 
            d.target.y;
    });

    node
        .attr("transform", function(d) { 
  	    return "translate(" + d.x + "," + d.y + ")"; });
}
});