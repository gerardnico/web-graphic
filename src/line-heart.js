import  * as d3 from "d3";


// From
// https://twitter.com/ergosum75005/status/1092152719324807168?s=12

export default function fn(element){

    
    // from 0 to 2Pi
    // https://github.com/d3/d3-array/blob/master/README.md#range
    let range = 2 * Math.PI;

    var data = d3.range(0,range,0.1).map(function (t) {
        return {
            x: 16*Math.pow(Math.sin(t),3),
            y: 13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t)
        }
    });

    // Chart Area
    var margin = {top: 40, right: 40, bottom: 40, left: 40},
        width = 400 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    let x = d3.scaleLinear()
        .domain([-20,20])
        .range([0, width])

    let y = d3.scaleLinear()
        .domain([-20,15])
        .range([height, 0])


    // https://github.com/d3/d3/wiki#supported-environments
    let svg = d3.select(element).append("svg")
        .datum(data)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)

    svg.append("desc")
        .html("A description")

    svg.append("style")
        .text(`
            svg { background-color: #dff0d8}
            .line { fill: none; stroke: steelblue; stroke-width: 1.5px}
            `)
            

    let graph = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    graph.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + (height/2) + ")")
        .call(d3.axisBottom(x));

    graph.append("g")
        .attr("class", "axis axis--y")
        .attr("transform", "translate(" + (width/2) + ", 0 )")
        .call(d3.axisLeft(y));

    var line = d3.line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); });

    graph.append("path")
        .attr("class", "line")
        .attr("d", line);

    }
