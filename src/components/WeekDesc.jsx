import React from "react";
import { FormattedMessage } from "react-intl";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryStack,
  VictoryLabel
} from "victory";
import ReactResizeDetector from "react-resize-detector";

const WeekDesc = props => {
  if (!props.weeklyTasks) return null;
  const { weeklyTasks } = props;

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
  weeklyTasks
    .map(task => task.days)
    .map(task =>
      task.map(
        days =>
          (weekDays.find(weekDay => weekDay.day === days.day).duration +=
            days.duration)
      )
    );

  return (
    <ReactResizeDetector handleWidth handleHeight>
      {({ width = 0, height }) => {
        return (
          <div>
            <h2>Week Stats</h2>
            <FormattedMessage
              id="numberOfTasks"
              defaultMessage={`There {numberOfTasks, plural, one {is} other {are}} {numberOfTasks, number} {numberOfTasks, plural,
                 one {task} 
                 other {tasks}
                } for this week`}
              values={{ numberOfTasks: props.weeklyTasks.length }}
            />
            <svg
              viewBox={`0 0 ${width} ${250}`}
              preserveAspectRatio="none"
              width="100%"
            >
              <VictoryChart
                domainPadding={{ x: (width * 5) / 100 }}
                standalone={false}
                width={width + width*15 /100}
                height={250}
                singleQuadrantDomainPadding={{ x: false }}
                theme={VictoryTheme.material}
              >
                <VictoryAxis
                label="days"
                style={{ axisLabel: {padding: 30} }}
                  tickValues={[0, 1, 2, 3, 4, 5, 6]}
                  tickFormat={["mon", "tue", "wed", "thu", "fri", "sat", "sun"]}
                />
                <VictoryAxis
                  offsetX={50}
                  dependentAxis
                  tickFormat={x => `${x}h`}
                  label="hours"
                  style={{ axisLabel: {padding: 40} }}
                />
                <VictoryLabel
                  text="daily hours"
                  x={width / 2}
                  y={30}
                  textAnchor="middle"
                />
                <VictoryStack
                  colorScale={"qualitative"}
                  animate={{
                    duration: 1000,
                    onLoad: { duration: 500 }
                  }}
                >
                  {weeklyTasks.map(task => (
                    <VictoryBar key={task._id} data={task.days} y="duration" />
                  ))}
                </VictoryStack>
              </VictoryChart>
            </svg>
          </div>
        );
      }}
    </ReactResizeDetector>
  );
};

export default WeekDesc;
