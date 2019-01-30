import  * as d3 from "d3";

// Line with Missing Data
// https://bl.ocks.org/mbostock/0533f44f2cfabecc5e3a

// Chart Area
var margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var data = d3.range(40).map(function(i) {
        return i % 5 ? {x: i / 39, y: (Math.sin(i / 3) + 2) / 4} : null;
      });

let x = d3.scaleLinear()
    .range([0, width])

let y = d3.scaleLinear()
    .range([height, 0])

// https://github.com/d3/d3/wiki#supported-environments
let svg = d3.select("body").append("svg")
    .datum(data)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .attr("class", "area")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

svg.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y));

svg.append("path")
    .attr("class", "line")
    .attr("d", line);

// Add the line
// if the f defined returns false/null the element is skipped
// https://github.com/d3/d3-shape/blob/master/README.md#line_defined
var line = d3.line()
    .defined(function(d) { return d; }) 
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });

svg.append("path")
    .attr("class", "line")
    .attr("d", line);

// Add dots at each point
svg.selectAll(".dot")
    .data(data.filter(function(d) { return d; }))
    .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", line.x())
      .attr("cy", line.y())
      .attr("r", 3.5);
