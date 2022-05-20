import D from "dayjs";
import React from "react";
import { CalendarDatum, CalendarLegendProps, ResponsiveTimeRange } from "@nivo/calendar";

import { CHART_THEME } from "../../../../constants";

type DateRangeProp = {
  width?: React.CSSProperties["width"];
  height?: React.CSSProperties["height"];
  className?: string;
  data: CalendarDatum[];
  range: (Date | string)[];
};

const legends: CalendarLegendProps[] = [
  {
    anchor: "bottom",
    direction: "row",
    itemCount: 5,
    itemHeight: 20,
    itemsSpacing: 32,
    itemWidth: 24,
    translateY: -32
  }
];

const DateRange: React.FC<DateRangeProp> = (props) => {
  const { data, range, width, height, className = "" } = props;
  return (
    <div className={className} style={{ height, width }}>
      <ResponsiveTimeRange
        colors={["#FFEEE1", "#FFDFC8", "#FFCEAA", "#FFA564", "#FF9142"]}
        data={data}
        dayBorderColor='#fff'
        dayBorderWidth={2}
        dayRadius={5}
        emptyColor='#efefef'
        from={range[0]}
        legends={legends}
        margin={{ top: 30 }}
        theme={CHART_THEME}
        to={range[1]}
        weekdayTicks={[1, 3, 5]}
      />
    </div>
  );
};

export default DateRange;
