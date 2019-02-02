import  * as d3 from "d3";


export default function fn(element){

    // Rayon of the ball (pixel)?
    let rayon = "20";

    // Chart Area
    var margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    var data = d3.range(9).map(function(i) {
        return { 
            x: 0.1 + i*0.1 , 
            y: 0 + rayon/height ,
            i: i 
        } ;
    });

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
    
    let balls = graph.selectAll(".dot")
        .data(data.filter(function(d) { return d; }))
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", function(d) { return x(d.x); })
        .attr("cy", function(d) { return y(d.y); })
        .attr("r", rayon)
    
        // Animation        
    balls.transition()
        .duration(1500)
        .on("start", function bounce() {
            d3.active(this)
                .attr("cy", function(d) { return y( d.i % 2 == 0 ? 1 : 0.6); })
                .transition()
                .duration(2000)
                .ease(d3.easeBounceOut)
                .attr("cy", function(d) { return y(d.y); })
                .transition()
                .duration(0)
                .on("start", bounce);
          });;


}