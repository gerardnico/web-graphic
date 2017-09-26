import * as d3 from "d3";

var margin = { top: 20, right: 0, bottom: 0, left: 0 },
    width = 960,
    height = 500 - margin.top - margin.bottom,
    formatNumber = d3.format(",d"),
    transitioning;

var x = d3
    .scaleLinear()
    .domain([0, width])
    .range([0, width]);

var y = d3.scaleLinear()
    .domain([0, height])
    .range([0, height]);

var treemap = d3.treemap();
// .children(function (d, depth) {
//     return depth ? null : d._children;
// })
// .sort(function (a, b) {
//     return a.value - b.value;
// })
// .ratio(height / width * 0.5 * (1 + Math.sqrt(5)))
// .round(false);

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.bottom + margin.top)
    .style("margin-left", -margin.left + "px")
    .style("margin-right", -margin.right + "px")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .style("shape-rendering", "crispEdges");

var grandparent = svg.append("g")
    .attr("class", "grandparent");

grandparent.append("rect")
    .attr("y", -margin.top)
    .attr("width", width)
    .attr("height", margin.top);

grandparent.append("text")
    .attr("x", 6)
    .attr("y", 6 - margin.top)
    .attr("dy", ".75em");

d3.json("data/flare.json", function (root) {

    console.log(root)

});

