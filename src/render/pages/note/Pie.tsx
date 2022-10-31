import React from 'react';
import { CommonPieProps, ResponsivePie } from '@nivo/pie';

import { ChartTheme } from '../../../constants';
import { Colors } from '../gacha/utils/getPieData';

type NotePieProp = {
  width: React.CSSProperties['width'];
  height: React.CSSProperties['height'];
  style?: React.CSSProperties;
  className?: string;
  data: { id: string | number; value: number }[];
};

const defs = [
  {
    id: 'lines',
    type: 'patternLines',
    background: 'inherit',
    color: 'rgba(255, 255, 255, 0.3)',
    rotation: -45,
    lineWidth: 6,
    spacing: 10
  }
];

const fill = [
  { match: { id: '冒险奖励' }, id: 'lines' },
  { match: { id: '任务奖励' }, id: 'lines' },
  { match: { id: '每日活跃' }, id: 'lines' },
  { match: { id: '深境螺旋' }, id: 'lines' },
  { match: { id: '邮件奖励' }, id: 'lines' },
  { match: { id: '活动奖励' }, id: 'lines' },
  { match: { id: '其他' }, id: 'lines' }
];

const legends: CommonPieProps<NotePieProp['data']>['legends'] = [
  {
    anchor: 'right',
    direction: 'column',
    translateY: 0,
    translateX: 54,
    itemWidth: 60,
    itemHeight: 24,
    symbolSize: 18,
    symbolShape: 'circle',
    effects: [
      {
        on: 'hover',
        style: {
          itemTextColor: '#ffa564'
        }
      }
    ]
  }
];

const GachaPie: React.FC<NotePieProp> = (props) => {
  const { data, style, width, height, className = '' } = props;
  return (
    <div
      className={className}
      style={{ ...style, height, minHeight: height, width, minWidth: width }}
    >
      <ResponsivePie
        activeOuterRadiusOffset={8}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor='#333333'
        arcLinkLabelsThickness={2}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        borderWidth={1}
        colors={Object.values(Colors)}
        cornerRadius={3}
        data={data}
        defs={defs}
        fill={fill}
        innerRadius={0.5}
        legends={legends}
        margin={{ top: 40, right: 80, bottom: 40, left: 40 }}
        padAngle={0.7}
        theme={ChartTheme}
      />
    </div>
  );
};

export default GachaPie;
