import React from 'react';
import { CommonPieProps, MouseEventHandler, ResponsivePie } from '@nivo/pie';

import { ChartTheme } from '../../../../../../constants';
import { Colors } from '../../../utils/getPieData';

type TypePieProp = {
  width: React.CSSProperties['width'];
  height: React.CSSProperties['height'];
  style?: React.CSSProperties;
  onClick?: MouseEventHandler<
    {
      id: string | number;
      value: number;
    },
    SVGPathElement
  >;
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
  { match: { id: '角色池' }, id: 'lines' },
  { match: { id: '武器池' }, id: 'lines' },
  { match: { id: '常驻池' }, id: 'lines' },
  { match: { id: '新手池' }, id: 'lines' }
];

const legends: CommonPieProps<TypePieProp['data']>['legends'] = [
  {
    anchor: 'bottom',
    direction: 'row',
    translateY: 40,
    translateX: 0,
    itemWidth: 64,
    itemHeight: 20,
    symbolSize: 16,
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

const TypePie: React.FC<TypePieProp> = (props) => {
  const { data, style, width, height, onClick, className = '' } = props;
  return (
    <div
      className={className}
      style={{ ...style, height, minHeight: height, width, minWidth: width }}
    >
      <ResponsivePie
        onClick={onClick}
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
        margin={{ top: 24, right: 24, bottom: 60, left: 24 }}
        padAngle={0.7}
        theme={ChartTheme}
      />
    </div>
  );
};

export default TypePie;
