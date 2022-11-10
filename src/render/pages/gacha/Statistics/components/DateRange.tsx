import React from 'react'
import type { CalendarDatum, CalendarLegendProps, TimeRangeDayData } from '@nivo/calendar'
import { ResponsiveTimeRange } from '@nivo/calendar'

import { ChartTheme } from '../../../../../constants'

type DateRangeProp = {
  width: React.CSSProperties['width']
  height: React.CSSProperties['height']
  style?: React.CSSProperties
  className?: string
  onClick?: (datum: TimeRangeDayData, event: React.MouseEvent<SVGRectElement, MouseEvent>) => void
  data: CalendarDatum[]
  range: (Date | string)[]
}

const legends: CalendarLegendProps[] = [
  {
    anchor: 'bottom',
    direction: 'row',
    itemCount: 4,
    itemHeight: 20,
    itemsSpacing: 32,
    itemWidth: 24,
    translateX: 32,
    translateY: -36
  }
]

const DateRange: React.FC<DateRangeProp> = (props) => {
  const { data, range, style, width, height, onClick, className = '' } = props
  return (
    <div
      className={className}
      style={{
        ...style,
        height,
        minHeight: height,
        width,
        minWidth: width
      }}
    >
      <ResponsiveTimeRange
        legendFormat={(e) => `${e}次`}
        onClick={onClick}
        colors={['#FFEEE1', '#FFDFC8', '#FFCEAA', '#FFA564', '#FF9142']}
        data={data}
        dayBorderColor='#fff'
        dayBorderWidth={2}
        dayRadius={5}
        emptyColor='#efefef'
        from={range[0]}
        legends={legends}
        theme={ChartTheme}
        to={range[1]}
        weekdayTicks={[]}
      />
    </div>
  )
}

export default DateRange
