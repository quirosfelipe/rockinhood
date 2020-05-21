const dates = {
    "2020-05-18": 314.9599914550781,
    "2020-05-15": 307.7099914550781,
    "2020-05-14": 309.5400085449219,
    "2020-05-13": 307.6499938964844,
    "2020-05-12": 311.4100036621094,
    "2020-05-11": 315.010009765625,
    "2020-05-08": 310.1300048828125,
    "2020-05-08": 315.010009765625,
    "2020-05-07": 303.739990234375,
    "2020-05-06": 300.6300048828125,
    "2020-05-05": 297.55999755859375,
    "2020-05-04": 293.1600036621094,
    "2020-05-01": 289.07000732421875,
    "2020-04-30": 293.79998779296875,
    "2020-04-29": 287.7300109863281,
    "2020-04-28": 278.5799865722656,
    "2020-04-27": 283.1700134277344,
    "2020-04-24": 282.9700012207031,
    "2020-04-23": 275.0299987792969,
    "2020-04-22": 276.1000061035156,
    "2020-04-21": 268.3699951171875,
    "2020-04-20": 276.92999267578125,
};
document.addEventListener("DOMContentLoaded", () => {
    var arr = [];
    function parseData(data) {
        for (var i in data) {
            console.log(arr);
            arr.unshift({
                date: new Date(i), //date
                value: +data[i], //convert string to number
            });
        }
        console.log(arr);
        return arr;
    }
    var parsedData = parseData(dates);
    var initVal = (Math.round(parsedData[parsedData.length - 1].value * 100) / 100).toFixed(2);
    document.querySelector(".company__price").innerHTML = `\$${initVal}`;
    if (arr[0].value > arr[arr.length - 1].value) {
        drawChartRed(parsedData);
    } else {
        console.log(arr[0].value, arr[arr.length - 1].value);
        drawChartGreen(parsedData);
        // console.log(parsedData[0].value);
    }
});

function drawChartGreen(data) {
    // set the dimensions and margins of the graph
    var margin = {
        top: 50,
        right: 30,
        bottom: 30,
        left: 60,
    },
        width = 700 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
        .select(".company__chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis --> it is a date format
    var x = d3
        .scaleTime()
        .domain(
            d3.extent(data, function (d) {
                return d.date;
            })
        )
        .rangeRound([0, width]);
    svg.append("g").attr("transform", "translate(0," + height + ")");
    // .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3
        .scaleLinear()
        .domain(
            d3.extent(data, function (d) {
                return d.value;
            })
        )
        .rangeRound([height, 0]);

    //   This allows to find the closest X index of the mouse:
    var bisect = d3.bisector(function (d) {
        return d.date;
    }).left;

    // Create the circle that travels along the curve of chart
    var focus = svg
        .append("g")
        .append("circle")
        .style("fill", "rgba(0,200,5,1)")
        .attr("stroke", "rgba(0,200,5,1)")
        .attr("r", 4)
        .style("opacity", 0);

    // Create the text that travels along the curve of chart
    var focusText = svg
        .append("g")
        .append("text")
        .style("opacity", 0)
        .attr("font-weight", "bolder")
        .attr("color", "orange")
        .attr("text-anchor", "left")
        .attr("alignment-baseline", "middle");

    // Add the line
    svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "rgba(0,200,5,1)")
        .attr("stroke-width", 1.5)
        .attr(
            "d",
            d3
                .line()
                .x(function (d) {
                    return x(d.date);
                })
                .y(function (d) {
                    return y(d.value);
                })
        );

    //   // Create a rect on top of the svg area: this rectangle recovers mouse position
    svg
        .append("rect")
        .style("fill", "none")
        .style("pointer-events", "all")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseout", mouseout);

    //   // What happens when the mouse move -> show the annotations at the right positions.
    function mouseover() {
        focus.style("opacity", 1);
        focusText.style("opacity", 1);
    }

    function mousemove() {
        // recover coordinate we need
        var x0 = x.invert(d3.mouse(this)[0]);
        var i = bisect(data, x0, 1);
        selectedData = data[i];
        var newDate = selectedData.date.toDateString();
        var newVal = (Math.round(selectedData.value * 100) / 100).toFixed(2);
        focus.attr("cx", x(selectedData.date)).attr("cy", y(selectedData.value));
        focusText
            .html(newDate)
            .attr("x", x(selectedData.date) + -70)
            .attr("y", y(selectedData.value) + -40);
        console.log(selectedData.date, selectedData.value);
        d3.select('.company__price').html(`<span>\$${newVal}</span>`);
    }
    function mouseout() {
        focus.style("opacity", 0);
        focusText.style("opacity", 0);
        var moveVal = (Math.round(data[data.length - 1].value * 100) / 100).toFixed(2);
        d3.select('.company__price').html(`<span> \$${moveVal}</span>`)
        // d3.select('.portfolio__header').html(`<span> \$${data[data.length - 1].value}</span>`)
    }

    // d3.select('.portfolio__header').html(`<span> $ ${data[data.length - 1].value}</span>`)
}

function drawChartRed(data) {
    // set the dimensions and margins of the graph
    var margin = {
        top: 50,
        right: 30,
        bottom: 30,
        left: 60,
    },
        width = 700 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
        .select(".company__chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis --> it is a date format
    var x = d3
        .scaleTime()
        .domain(
            d3.extent(data, function (d) {
                return d.date;
            })
        )
        .rangeRound([0, width]);
    svg.append("g").attr("transform", "translate(0," + height + ")");
    // .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3
        .scaleLinear()
        .domain(
            d3.extent(data, function (d) {
                return d.value;
            })
        )
        .rangeRound([height, 0]);

    //   This allows to find the closest X index of the mouse:
    var bisect = d3.bisector(function (d) {
        return d.date;
    }).left;

    // Create the circle that travels along the curve of chart
    var focus = svg
        .append("g")
        .append("circle")
        .style("fill", "rgba(255,80,0,1)")
        .attr("stroke", "rgba(255,80,0,1)")
        .attr("r", 4)
        .style("opacity", 0);

    // Create the text that travels along the curve of chart
    var focusText = svg
        .append("g")
        .append("text")
        .style("opacity", 0)
        .attr("font-weight", "bolder")
        .attr("text-anchor", "left")
        .attr("alignment-baseline", "middle");

    // Add the line
    svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "rgba(255,80,0,1)")
        .attr("stroke-width", 1.5)
        .attr(
            "d",
            d3
                .line()
                .x(function (d) {
                    return x(d.date);
                })
                .y(function (d) {
                    return y(d.value);
                })
        );

    //   // Create a rect on top of the svg area: this rectangle recovers mouse position
    svg
        .append("rect")
        .style("fill", "none")
        .style("pointer-events", "all")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseout", mouseout);

    //   // What happens when the mouse move -> show the annotations at the right positions.
    function mouseover() {
        focus.style("opacity", 1);
        focusText.style("opacity", 1);
    }

    function mousemove() {
        // recover coordinate we need
        var x0 = x.invert(d3.mouse(this)[0]);
        var i = bisect(data, x0, 1);
        selectedData = data[i];
        var newDate = selectedData.date.toDateString();
        var newVal = (Math.round(selectedData.value * 100) / 100).toFixed(2);
        focus.attr("cx", x(selectedData.date)).attr("cy", y(selectedData.value));
        focusText
            .html(newDate)
            .attr("x", x(selectedData.date) + -70)
            .attr("y", y(selectedData.value) + -40);
        console.log(selectedData.date, selectedData.value);
        d3.select('.company__price').html(`<span>\$${newVal}</span>`);
    }
    function mouseout() {
        focus.style("opacity", 0);
        focusText.style("opacity", 0);
        var moveVal = (Math.round(data[data.length - 1].value * 100) / 100).toFixed(2);
        d3.select('.company__price').html(`<span> \$${moveVal}</span>`)
        // d3.select('.portfolio__header').html(`<span> \$${data[data.length - 1].value}</span>`)
    }

    // d3.select('.portfolio__header').html(`<span> $ ${data[data.length - 1].value}</span>`)
}
