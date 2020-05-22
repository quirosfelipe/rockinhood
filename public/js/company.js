import { handleErrors, backendUrl } from './utils.js';

window.addEventListener("DOMContentLoaded", async (e) => {
    const res = await fetch(`${backendUrl}/stocks/AAPL`);
    const data = await res.json();
    const { name, symbol, description, ceo, employees, headquarters, founded, marketCap, priceEarningRatio, dividendYield, averageVolume } = data.stock;

    const modMarketCap = `$${(marketCap / 1000000000)}B`;
    const modAverageVolume = `${(averageVolume / 1000000)}M`;

    document.querySelector(".company__about-text").innerHTML = description;
    document.querySelector(".company__about-ceo-data").innerHTML = ceo;
    document.querySelector(".company__about-employees-data").innerHTML = employees;
    document.querySelector(".company__about-headquarters-data").innerHTML = headquarters;
    document.querySelector(".company__about-founded-data").innerHTML = founded;
    document.querySelector(".company__about-marketcap-data").innerHTML = modMarketCap;
    document.querySelector(".company__about-pe-ratio-data").innerHTML = priceEarningRatio;
    document.querySelector(".company__about-dividend-yield-data").innerHTML = dividendYield;
    document.querySelector(".company__about-avgvolume-data").innerHTML = modAverageVolume;
    document.querySelector(".company__buy-title").innerHTML = `Buy ${symbol}`;

    const chartInfoRes = await fetch(`${backendUrl}/stocks/chartinfo/${symbol}`);
    const chartData = await chartInfoRes.json();
    const parsedData = chartData.data.map((element) => {
        element.date = new Date(element.date);
        return element;
    }).filter(element => {
        if (element.value) return true;
    });

    var initVal = (
        Math.round(parsedData[parsedData.length - 1].value * 100) / 100
    ).toFixed(2);
    var defaultVal = parsedData[0].value; //*** */
    var initDiff = initVal - defaultVal; //*** */
    var initPercentage = (initVal * 100) / defaultVal - 100;
    document.querySelector(".company__price").innerHTML = `\$${initVal}`;
    document.querySelector(
        ".company__price-change"
    ).innerHTML = `\$${initDiff.toFixed(2)}(${initPercentage.toFixed(2)}%)`; //**** */
    if (parsedData[0].value > parsedData[parsedData.length - 1].value) {
        drawChartRed(parsedData);
    } else {
        drawChartGreen(parsedData);
    }
});

function drawChartGreen(data) {
    // set the dimensions and margins of the graph
    var margin = {
        top: 50,
        right: 30,
        bottom: 30,
        left: 20,
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
    svg.append("g").attr("transform", "translate(0," + height + ")")
    //   .call(d3.axisBottom(x));

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
        .style("fill", "grey")
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
        console.log(selectedData);
        var newDate = selectedData.date.toDateString();
        var newVal = (Math.round(selectedData.value * 100) / 100).toFixed(2);
        focus.attr("cx", x(selectedData.date)).attr("cy", y(selectedData.value));
        focusText
            .html(newDate)
            .attr("x", x(selectedData.date) + -70)
            .attr("y", y(selectedData.value) + -40);
        // console.log(selectedData.date, selectedData.value);
        var diffVal = newVal - data[0].value; //***** */
        diffVal = (Math.round(diffVal * 100) / 100).toFixed(2); //**** */
        var diffPercentage = (newVal * 100) / data[0].value - 100;

        d3.select(".company__price").html(`<span>\$${newVal}</span>`);
        d3.select(".company__price-change").html(
            `<span>\$${diffVal}(${diffPercentage.toFixed(2)}%)</span>`
        ); //**** */
    }
    function mouseout() {
        focus.style("opacity", 0);
        focusText.style("opacity", 0);
        var moveVal = (Math.round(data[data.length - 1].value * 100) / 100).toFixed(
            2
        );
        var diffVal =
            (Math.round(data[data.length - 1].value * 100) / 100).toFixed(2) - //**** */
            (Math.round(data[0].value * 100) / 100).toFixed(2); //**** */
        var diffPercentage =
            ((Math.round(data[data.length - 1].value * 100) / 100).toFixed(2) * 100) / //**** */
            (Math.round(data[0].value * 100) / 100).toFixed(2) - //*** */
            100; //**** */
        d3.select(".company__price").html(`<span> \$${moveVal}</span>`);
        d3.select(".company__price-change").html(
            //**** */
            `<span>\$${diffVal.toFixed(2)}(${diffPercentage.toFixed(2)}%)</span>` //**** */
        ); //**** */

    }
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
        .style("fill", "grey")
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
        // var newDate = selectedData.date.toDateString();
        var newVal = (Math.round(selectedData.value * 100) / 100).toFixed(2);
        focus.attr("cx", x(selectedData.date)).attr("cy", y(selectedData.value));
        focusText
            .html(selectedData.date)
            .attr("x", x(selectedData.date) + -70)
            .attr("y", y(selectedData.value) + -40);
        // console.log(selectedData.date, selectedData.value);
        var diffVal = newVal - data[0].value; //***** */
        diffVal = (Math.round(diffVal * 100) / 100).toFixed(2); //**** */
        var diffPercentage = (newVal * 100) / data[0].value - 100;

        d3.select(".company__price").html(`<span>\$${newVal}</span>`);
        d3.select(".company__price-change").html(
            `<span>\$${diffVal}(${diffPercentage.toFixed(2)}%)</span>`
        ); //**** */
    }
    function mouseout() {
        focus.style("opacity", 0);
        focusText.style("opacity", 0);
        var moveVal = (Math.round(data[data.length - 1].value * 100) / 100).toFixed(
            2
        );
        var diffVal =
            (Math.round(data[data.length - 1].value * 100) / 100).toFixed(2) - //**** */
            (Math.round(data[0].value * 100) / 100).toFixed(2); //**** */
        var diffPercentage =
            ((Math.round(data[data.length - 1].value * 100) / 100).toFixed(2) * 100) / //**** */
            (Math.round(data[0].value * 100) / 100).toFixed(2) - //*** */
            100; //**** */
        d3.select(".company__price").html(`<span> \$${moveVal}</span>`);
        d3.select(".company__price-change").html(
            //**** */
            `<span>\$${diffVal.toFixed(2)}(${diffPercentage.toFixed(2)}%)</span>` //**** */
        ); //**** */
        // d3.select('.portfolio__header').html(`<span> \$${data[data.length - 1].value}</span>`)
    }
}
