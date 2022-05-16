import React from "react";
import { CalendarDatum, Calendar } from "@nivo/calendar";

import { CHART_THEME } from "../../../../constants";

type TimesCalendarProp = { data: CalendarDatum[]; range: (Date | string)[] };

const TimesCalendar: React.FC<TimesCalendarProp> = (props) => {
  const { data, range } = props;
  return (
    <Calendar
      colors={["#FFEEE2", "#FFD5B6", "#FFA564", "#FF9142"]}
      data={data}
      dayBorderColor='#fff'
      dayBorderWidth={2}
      emptyColor='#efefef'
      from={range[0]}
      height={120}
      margin={{ top: 20, right: 20, bottom: 0, left: 20 }}
      monthBorderColor='#fafafa'
      theme={CHART_THEME}
      to={range[1]}
      width={900}
    />
  );
};

export default TimesCalendar;
