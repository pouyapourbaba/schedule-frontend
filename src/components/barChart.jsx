import React from "react";
import { connect } from "react-redux";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel
} from "victory";
import ReactResizeDetector from "react-resize-detector";
import { PropTypes } from "prop-types";

const BarChart = props => {
  return (
    <ReactResizeDetector handleWidth handleHeight>
      {({ width = 0, height }) => {
        return (
          <div>
            <svg
              viewBox={`0 0 ${width} ${380}`}
              preserveAspectRatio="none"
              width="100%"
            >
              <VictoryChart
                domainPadding={{
                  x: (width * props.extraDomainPadding) / 100
                }}
                standalone={false}
                width={width}
                height={380}
                singleQuadrantDomainPadding={{ x: false }}
                theme={VictoryTheme.material}
              >
                <VictoryAxis
                  tickValues={props.tickValues}
                  tickFormat={props.tickFormat}
                  fixLabelOverlap={true}
                  label={props.xAxisLabel}
                  style={{ axisLabel: { padding: 40 } }}

                />
                <VictoryAxis
                  offsetX={50}
                  dependentAxis
                  tickFormat={x => `${x}h`}
                  label="hours"
                  style={{ axisLabel: { padding: 40 } }}
                />
                <VictoryLabel
                  text={props.title}
                  x={width / 2}
                  y={30}
                  textAnchor="middle"
                />
                <VictoryBar data={props.data} y="total" />
              </VictoryChart>
            </svg>
          </div>
        );
      }}
    </ReactResizeDetector>
  );
};

BarChart.propTypes = {
  weekly: PropTypes.array.isRequired,
  tickValues: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  weekly: state.tasks.weekly
});

export default connect(mapStateToProps)(BarChart);
