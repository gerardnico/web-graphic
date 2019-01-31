import  * as d3 from "d3";


export default function fn(element){

    var data = d3.range(40).map(function(i) {
        return i % 5 ? {x: i / 39, y: (Math.sin(i / 3) + 2) / 4} : null;
    });

    // Chart Area
    var margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


    let x = d3.scaleLinear()
        .range([0, width])

    let y = d3.scaleLinear()
        .range([height, 0])


    // https://github.com/d3/d3/wiki#supported-environments
    let svg = d3.select(element).append("svg")
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)

    svg.append("desc")
        .html("A description")

    svg.append("style")
        .text(`
            svg { background-color: #dff0d8}
            .line { fill: none; stroke: steelblue; stroke-width: 1.5px}
            .dot { fill: white; stroke: steelblue; stroke-width: 1.5px}
            `)
            

    let graph = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    graph.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    graph.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y));

        graph.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y));

    graph.selectAll(".dot")
        .data(data.filter(function(d) { return d; }))
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", function(d) { return x(d.x); })
        .attr("cy", function(d) { return y(d.y); })
        .attr("r", 3.5);


}