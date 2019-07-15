import * as d3 from "d3";

export function drawLineChartForOneWeek(data) {
  const canvas = d3.select(".canvas-for-week-desc").node();
  const canvasBoundaries = canvas.getBoundingClientRect();
  const w = canvasBoundaries.width;
  const h = 250;

  const weekDays = [
    { day: "monday", duration: 0 },
    { day: "tuesday", duration: 0 },
    { day: "wednesday", duration: 0 },
    { day: "thursday", duration: 0 },
    { day: "friday", duration: 0 },
    { day: "saturday", duration: 0 },
    { day: "sunday", duration: 0 }
  ];

  // find the sum of hours for each day
  data
    .map(task => task.days)
    .map(task =>
      task.map(
        days =>
          (weekDays.find(weekDay => weekDay.day === days.day).duration +=
            days.duration)
      )
    );

  // remove the already existing svg if any
  if (
    d3
      .select(".canvas-for-week-desc")
      .select("svg")
      .node()
  ) {
    d3.select(".canvas-for-week-desc")
      .select("svg")
      .node()
      .remove();
  }

  // select the svg and set the width and the height
  const svg = d3
    .select(".canvas-for-week-desc")
    .append("svg")
    .attr("height", h)
    .attr("width", w);

  // create margins and dimensions
  const margin = { top: 20, right: 20, bottom: 50, left: 60 };
  const graphWidth = w - margin.left - margin.right;
  const graphHeight = h - margin.top - margin.bottom;

  // y scale
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(weekDays, d => d.duration)])
    .range([graphHeight, 0]);

  // x scale
  const x = d3
    .scaleBand()
    .domain(weekDays.map(weekDay => weekDay.day))
    .range([0, w - 100])
    .paddingInner(0.2)
    .paddingOuter(0.2);

  // create a group for the graph
  const graph = svg
    .append("g")
    .attr("width", graphWidth)
    .attr("height", graphHeight)
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // create the xAxis and yAxis groups
  const xAxisGroup = graph
    .append("g")
    .attr("transform", `translate(0, ${graphHeight})`);
  const yAxisGroup = graph.append("g");

  // create the rects for the bar chart and append them to the graph group
  graph
    .selectAll("rect")
    .data(weekDays)
    .enter()
    .append("rect")
    .attr("width", x.bandwidth)
    .attr("height", 0)
    .attr("fill", "teal")
    .attr("x", (d, i) => x(d.day))
    .attr("y", graphHeight)
    .transition()
    .duration(500)
    .attr("y", d => y(d.duration))
    .attr("height", d => graphHeight - y(d.duration));

  // create and call axis
  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y).tickFormat(d => d + " h");

  // call the axis on the axisGroups
  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);
}
