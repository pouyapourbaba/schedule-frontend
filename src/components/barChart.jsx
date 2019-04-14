import React, { Component } from "react";
import * as d3 from "d3";
import taskService from "../services/taskService";

class BarChart extends Component {
  state = {
    width: 700,
    height: 300,
    weeklyDurations: new Array(52).fill(0),
    monthlyDurations: new Array(12).fill(0)
  };

  async componentDidMount() {
    if (this.props.user_id) {
      const monthlyDurations = this.state.monthlyDurations;

      const monthlyData = await taskService.getMonthlyTotalDurations(
        this.props.user_id
      );

      for (let month of monthlyData.data)
        monthlyDurations[month._id - 1] = month.total;

      this.drawChart(monthlyDurations);
    }
  }

  drawChart(data) {
    // var margin = { top: 20, right: 20, bottom: 70, left: 40 },
    //   width = 1000 - margin.left - margin.right,
    //   height = 300 - margin.top - margin.bottom;

    d3.select("BarChart").style("background-color", "red");

    var svg = d3.select("svg"),
      margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
      },
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom,
      g = svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3
      .scaleBand()
      .rangeRound([0, width])
      .padding(0.1);

    var y = d3.scaleLinear().rangeRound([height, 0]);

    x.domain(
      data.map(function(d, i) {
        return i;
      })
    );
    y.domain([
      0,
      d3.max(data, function(d) {
        return Number(d);
      })
    ]);

    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .append("text")
      .attr("fill", "#000")
      .attr("text-anchor", "end")
      .attr("x", 630)
      .attr("y", 25)
      .text("months");

    g.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("hours");

    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .style("fill", "steelblue")
      .attr("class", "bar")
      .attr("x", function(d, i) {
        return x(i);
      })
      .attr("y", function(d) {
        return y(Number(d));
      })
      .attr("width", x.bandwidth())
      .attr("height", function(d) {
        if (d === 0) return 0;
        else return height - y(Number(d))
      });

      g.selectAll(".text")
      .data(data)
      .enter()
      .append("text")
      .text(d => d)
      .attr("y", function(d) {
        return y(Number(d))+20;
      })
      .attr("x", function(d, i) {
        return x(i)+7;
      })
      .attr("fill", "#fff");
  }

  render() {
    return (
      <svg width="700" height="500" style={{ border: "1px solid #ccc" }} />
    );
  }
}

export default BarChart;
