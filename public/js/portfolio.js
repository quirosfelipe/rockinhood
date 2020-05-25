import { handleErrors, backendUrl } from "./utils.js";
let targetStockSymbol;
// const dates = {
//   "2020-05-18": 314.9599914550781,
//   "2020-05-15": 307.7099914550781,
//   "2020-05-14": 309.5400085449219,
//   "2020-05-13": 307.6499938964844,
//   "2020-05-12": 311.4100036621094,
//   "2020-05-11": 278.5799865722656,
//   "2020-05-08": 310.1300048828125,
//   "2020-05-08": 315.010009765625,
//   "2020-05-07": 303.739990234375,
//   "2020-05-06": 300.6300048828125,
//   "2020-05-05": 297.55999755859375,
//   "2020-05-04": 293.1600036621094,
//   "2020-05-01": 289.07000732421875,
//   "2020-04-30": 293.79998779296875,
//   "2020-04-29": 287.7300109863281,
//   "2020-04-28": 315.010009765625,
//   "2020-04-27": 283.1700134277344,
//   "2020-04-24": 282.9700012207031,
//   "2020-04-23": 275.0299987792969,
//   "2020-04-22": 276.1000061035156,
//   "2020-04-21": 268.3699951171875,
//   "2020-04-20": 276.92999267578125,
// };

// document.addEventListener("DOMContentLoaded", () => {
//   var arr = [];
//   function parseData(data) {
//     for (var i in data) {
//       //   console.log(arr);
//       arr.unshift({
//         date: new Date(i), //date
//         value: +data[i], //convert string to number
//       });
//     }
//     // console.log(arr);
//     return arr;
//   }
// //var parsedData = parseData(dates);
// var initVal = (
//   Math.round(parsedData[parsedData.length - 1].value * 100) / 100
// ).toFixed(2);
// var defaultVal = parsedData[0].value; //*** */
// var initDiff = initVal - defaultVal; //*** */
// var initPercentage = (initVal * 100) / defaultVal - 100;
// document.querySelector(".portfolio__header").innerHTML = `\$${initVal}`;
// document.querySelector(
//   ".portfolio__header-change"
// ).innerHTML = `\$${initDiff.toFixed(2)}(${initPercentage.toFixed(2)}%)`; //**** */
// if (arr[0].value > arr[arr.length - 1].value) {
//   drawChartRed(parsedData);
// } else {
//   console.log(arr[0].value, arr[arr.length - 1].value);
//   drawChartGreen(parsedData);
// }
// var parsedData2 = parseData(dates2);
//   var initVal2 = (Math.round(parsedData2[parsedData2.length - 1].value * 100) / 100).toFixed(2);
//   document.querySelector(".portfolio__watchlist-chart")
//   if (arr[0].value > arr[arr.length - 1].value) {
//       drawChartRedWatch(parsedData);
//   } else {
//       console.log(arr[0].value, arr[arr.length - 1].value);
//       drawChartGreenWatch(parsedData);
//   }
// });

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
    .select(".portfolio__chart")
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
    var selectedData = data[i];
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

    d3.select(".portfolio__header").html(`<span>\$${newVal}</span>`);
    d3.select(".portfolio__header-change").html(
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
    d3.select(".portfolio__header").html(`<span> \$${moveVal}</span>`);
    d3.select(".portfolio__header-change").html(
      //**** */
      `<span>\$${diffVal.toFixed(2)}(${diffPercentage.toFixed(2)}%)</span>` //**** */
    ); //**** */
    // d3.select('.portfolio__header').html(`<span> \$${data[data.length - 1].value}</span>`)
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
    .select(".portfolio__chart")
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
    var selectedData = data[i];
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

    d3.select(".portfolio__header").html(`<span>\$${newVal}</span>`);
    d3.select(".portfolio__header-change").html(
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
    d3.select(".portfolio__header").html(`<span> \$${moveVal}</span>`);
    d3.select(".portfolio__header-change").html(
      //**** */
      `<span>\$${diffVal.toFixed(2)}(${diffPercentage.toFixed(2)}%)</span>` //**** */
    ); //**** */
    // d3.select('.portfolio__header').html(`<span> \$${data[data.length - 1].value}</span>`)
  }
}

function drawChartGreenWatch(data, i, target) {
  // set the dimensions and margins of the graph
  var margin = {
    top: 10,
    right: 20,
    bottom: 10,
    left: 20,
  },
    width = 100 - margin.left - margin.right,
    height = 40 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select(`.portfolio__${target}list-chart${i}`)
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
}

function drawChartRedWatch(data, i, target) {
  // set the dimensions and margins of the graph
  var margin = {
    top: 10,
    right: 20,
    bottom: 10,
    left: 20,
  },
    width = 100 - margin.left - margin.right,
    height = 40 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select(`.portfolio__${target}list-chart${i}`)
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
}

window.addEventListener("DOMContentLoaded", async (e) => {
  // const data = [
  //   { date: "2020-04-21T13:30:00.000Z", value: 2328.1201171875 },
  //   { date: "2020-04-22T13:30:00.000Z", value: 2363.489990234375 },
  //   { date: "2020-04-23T13:30:00.000Z", value: 2399.449951171875 },
  //   { date: "2020-04-24T13:30:00.000Z", value: 2410.219970703125 },
  //   { date: "2020-04-27T13:30:00.000Z", value: 2376 },
  //   { date: "2020-04-28T13:30:00.000Z", value: 2314.080078125 },
  //   { date: "2020-04-29T13:30:00.000Z", value: 2372.7099609375 },
  //   { date: "2020-04-30T13:30:00.000Z", value: 2474 },
  //   { date: "2020-05-01T13:30:00.000Z", value: 2286.0400390625 },
  //   { date: "2020-05-04T13:30:00.000Z", value: 2315.989990234375 },
  //   { date: "2020-05-05T13:30:00.000Z", value: 2317.800048828125 },
  //   { date: "2020-05-06T13:30:00.000Z", value: 2351.260009765625 },
  //   { date: "2020-05-07T13:30:00.000Z", value: 2367.610107421875 },
  //   { date: "2020-05-08T13:30:00.000Z", value: 2379.610107421875 },
  //   { date: "2020-05-11T13:30:00.000Z", value: 2409 },
  //   { date: "2020-05-12T13:30:00.000Z", value: 2356.949951171875 },
  //   { date: "2020-05-13T13:30:00.000Z", value: 2367.919921875 },
  //   { date: "2020-05-14T13:30:00.000Z", value: 2388.85009765625 },
  //   { date: "2020-05-15T13:30:00.000Z", value: 2409.780029296875 },
  //   { date: "2020-05-18T13:30:00.000Z", value: 2426.260009765625 },
  //   { date: "2020-05-19T13:30:00.000Z", value: 2449.330078125 },
  //   { date: "2020-05-20T13:30:00.000Z", value: 2497.93994140625 },
  // ];

  // const moddedData = data.map((element) => {
  //   element.date = new Date(element.date);
  //   return element;
  // });

  // var initVal = (
  //   Math.round(moddedData[moddedData.length - 1].value * 100) / 100
  // ).toFixed(2);

  // var defaultVal = moddedData[0].value;

  // var initDiff = initVal - defaultVal;
  // var initPercentage = (initVal * 100) / defaultVal - 100;
  // document.querySelector(".portfolio__header").innerHTML = `\$${initVal}`;
  // document.querySelector(
  //   ".portfolio__header-change"
  // ).innerHTML = `\$${initDiff.toFixed(2)}(${initPercentage.toFixed(2)}%)`;

  // drawChartGreen(moddedData);

  const userId = localStorage.getItem("ROCKINHOOD_CURRENT_USER_ID");

  var rawPortfolioPrices = [];

  const stockListRes = await fetch(`${backendUrl}/transactions/${userId}`);
  const stockListData = await stockListRes.json();
  // console.log(stockListData.transactions);
  stockListData.transactions.forEach(async (ownedCompany, i) => {
    const companySymbol = ownedCompany.Company.symbol;
    const ownedCompanyShare = ownedCompany.shares;
    const chartInfoRes = await fetch(
      `${backendUrl}/stocks/chartinfo/${companySymbol}`
    );
    const chartData = await chartInfoRes.json();
    const parsedData = chartData.data
      .map((element) => {
        element.date = new Date(element.date);
        return element;
      })
      .filter((element) => {
        if (element.value) return true;
      });
    // CODE TO CREATEPORTFOLIO CHART DATA BELOW
    const pricesTimesSharesData = parsedData.map((ele) => {
      ele.value = ele.value * ownedCompanyShare;
      return ele;
    });
    rawPortfolioPrices.push(...pricesTimesSharesData);
    // CODE TO CREATEPORTFOLIO CHART DATA ABOVE

    const companyPrice = parsedData[parsedData.length - 1].value;

    if (parsedData[0].value > parsedData[parsedData.length - 1].value) {
      const stockList = document.createElement("div");
      stockList.className = "portfolio__stocklist";
      stockList.innerHTML = `
                    <div class="portfolio__stocklist-name" id=${companySymbol}> ${companySymbol} </div>
                    <a class="portfolio__stocklist-chart${i}" id=${companySymbol} href="/stocks/${companySymbol}"></a>
                    <div class="portfolio__stocklist-price" id=${companySymbol}> \$${companyPrice.toFixed(
        2
      )} </div>
                `;
      document
        .querySelector(".portfolio__stocklist-container")
        .appendChild(stockList);
      drawChartRedWatch(parsedData, i, "stock");
    } else {
      const stockList = document.createElement("div");
      stockList.className = "portfolio__stocklist";
      stockList.innerHTML = `
                    <div class="portfolio__stocklist-name" id=${companySymbol}> ${companySymbol} </div>
                    <a class="portfolio__stocklist-chart${i}" id=${companySymbol} href="/stocks/${companySymbol}"></a>
                    <div class="portfolio__stocklist-price" id=${companySymbol}> \$${companyPrice.toFixed(
        2
      )} </div>
                `;
      document
        .querySelector(".portfolio__stocklist-container")
        .appendChild(stockList);
      drawChartGreenWatch(parsedData, i, "stock");
    }
  });

  // CODE TO CREATE PORTFOLIO CHART DATA BELOW

  var portfolioArr;
  var portfolioObj = {};
  setTimeout(() => {
    rawPortfolioPrices.forEach((el) => {
      // console.log("test1");
      if (el.value) {
        let prevVal = 0;
        if (portfolioObj[el.date]) {
          prevVal = portfolioObj[el.date].value;
        }
        portfolioObj[el.date] = {
          date: el.date,
          value: prevVal + el.value,
        };
      }
    });
    portfolioArr = Object.values(portfolioObj);

    var initVal = (
      Math.round(portfolioArr[portfolioArr.length - 1].value * 100) / 100
    ).toFixed(2);

    var defaultVal = portfolioArr[0].value;
    var initDiff = initVal - defaultVal;
    var initPercentage = (initVal * 100) / defaultVal - 100;
    document.querySelector(".portfolio__header").innerHTML = `\$${initVal}`;
    document.querySelector(
      ".portfolio__header-change"
    ).innerHTML = `\$${initDiff.toFixed(2)}(${initPercentage.toFixed(2)}%)`;

    if (initVal > defaultVal) {
      drawChartGreen(portfolioArr);
    } else {
      drawChartRed(portfolioArr);
    }
    // console.log("arr of objects", portfolioArr);
  }, 3000);

  // CODE TO CREATEPORTFOLIO CHART DATA ABOVE

  function triggerWatch() {
    setTimeout(async () => {
      const watchListRes = await fetch(`${backendUrl}/watchlists/${userId}`);
      const watchListData = await watchListRes.json();
      watchListData.watchlists.forEach(async (watchedCompany, i) => {
        const companySymbol = watchedCompany.Company.symbol;
        const chartInfoRes = await fetch(
          `${backendUrl}/stocks/chartinfo/${companySymbol}`
        );
        const chartData = await chartInfoRes.json();
        const parsedData = chartData.data
          .map((element) => {
            element.date = new Date(element.date);
            return element;
          })
          .filter((element) => {
            if (element.value) return true;
          });
        const companyPrice = parsedData[parsedData.length - 1].value;

        if (parsedData[0].value > parsedData[parsedData.length - 1].value) {
          const watchList = document.createElement("div");
          watchList.className = "portfolio__watchlist";
          watchList.innerHTML = `
                        <div class="portfolio__watchlist-name" id=${companySymbol}> ${companySymbol} </div>
                        <a class="portfolio__watchlist-chart${i}" id=${companySymbol} href="/stocks/${companySymbol}"></a>
                        <div class="portfolio__watchlist-price" id=${companySymbol}> \$${companyPrice.toFixed(
            2
          )} </div>
                    `;
          document
            .querySelector(".portfolio__watchlist-container")
            .appendChild(watchList);
          drawChartRedWatch(parsedData, i, "watch");
        } else {
          const watchList = document.createElement("div");
          watchList.className = "portfolio__watchlist";
          watchList.innerHTML = `
                        <div class="portfolio__watchlist-name" id=${companySymbol}> ${companySymbol} </div>
                        <a class="portfolio__watchlist-chart${i}" id=${companySymbol} href="/stocks/${companySymbol}"></a>
                        <div class="portfolio__watchlist-price" id=${companySymbol}> \$${companyPrice.toFixed(
            2
          )} </div>
                    `;
          document
            .querySelector(".portfolio__watchlist-container")
            .appendChild(watchList);
          drawChartGreenWatch(parsedData, i, "watch");
        }
      });
    }, 1000);
  }
  triggerWatch();

  var targetStock = document.querySelector(".portfolio__sidebar");
  targetStock.addEventListener("click", (event) => {
    targetStockSymbol = event.target.getAttribute("id");
    window.location.href = `/stocks/${targetStockSymbol}`;
  });
});
