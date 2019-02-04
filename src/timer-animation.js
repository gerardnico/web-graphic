import * as d3 from "d3";


export default function fn(element) {

    // Rayon of the ball (pixel)?
    let rayon = "20";

    // Chart Area
    var margin = { top: 40, right: 40, bottom: 40, left: 40 },
        width = 700 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    

    let x = d3.scaleLinear()
        .range([0, width])

    let y = d3.scaleLinear()
        .range([height, 0])

    let balls = 12;
    var data = d3.range(balls).map(function (i) {
        return {
            x: 0,
            y: 1,
            i: i
        };
    });

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
        .call(d3.axisLeft(y))
        .append("text")
        .attr("class", "axis-title")
        .attr("x", 0)
        .attr("dy", ".32em")
        .attr("text-anchor", "end")
        .attr("font-weight", "bold")
        .text("ease(t) = ");


    graph.selectAll(".dot")
        .data(data.filter(function (d) { return d; }))
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", function (d) { return x(d.x); })
        .attr("cy", function (d) { return y(d.y); })
        .attr("r", rayon);


    // Animation with timer inspired by
    // https://bl.ocks.org/mbostock/248bac3b8e354a9103c4#quadIn
    var ease;
    var timers = [];
    function start(balls) {
        balls.each(function (d) {
            let ball = d3.select(this);
            timers[d.i] = d3.timer(
                function (elapsed) {
                    const steps = 3000;
                    // Max 3000 because of the modulo
                    var l = (elapsed % steps) / steps
                    var t = 1 - l;

                    ball.attr("cx", x(l))
                        .attr("cy", y(ease(t)));
                },
                d.i * 400);

        })
    };



    // Ease changement
    var select = d3.select("#ease-type")
        .on("change", changed)
        .property("value", top.location.hash ? top.location.hash.slice(1) : "bounceIn")
        .each(changed);

    // Start the animation
    function changed() {
        // Change the ease    
        ease = d3["ease" + this.value[0].toUpperCase() + this.value.slice(1)] || d3.easeLinearIn;
        // Stop the timers
        timers.map(
            (timer) => timer.stop()
        );
        // All balls at the origin
        let balls = graph.selectAll(".dot")
            .attr("cx", function (d) { return x(d.x); })
            .attr("cy", function (d) { return y(d.y); })
        // Start the timers
        start(balls);
    }


}