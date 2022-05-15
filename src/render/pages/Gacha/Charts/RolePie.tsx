import React from "react";
import { CommonPieProps, Pie } from "@nivo/pie";

import { CHART_THEME, COLORS } from "../../../../constants";

type RolePieProp = { data: { id: string | number; value: number }[] };

const defs = [
  {
    id: "dots",
    type: "patternDots",
    background: "inherit",
    color: "rgba(255, 255, 255, 0.3)",
    size: 4,
    padding: 1,
    stagger: true
  },
  {
    id: "lines",
    type: "patternLines",
    background: "inherit",
    color: "rgba(255, 255, 255, 0.3)",
    rotation: -45,
    lineWidth: 6,
    spacing: 10
  }
];

const fill = [
  { match: { id: "三星" }, id: "lines" },
  { match: { id: "四星" }, id: "lines" },
  { match: { id: "五星" }, id: "lines" }
];

const legends: CommonPieProps<RolePieProp["data"]>["legends"] = [
  {
    anchor: "bottom",
    direction: "row",
    translateY: 56,
    translateX: 10,
    itemWidth: 60,
    itemHeight: 18,
    symbolSize: 18,
    symbolShape: "circle"
  }
];

const RolePie: React.FC<RolePieProp> = (props) => {
  const { data } = props;
  return (
    <Pie
      activeOuterRadiusOffset={8}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
      arcLinkLabelsColor={{ from: "color" }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor='#333333'
      arcLinkLabelsThickness={2}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      borderWidth={1}
      colors={Object.values(COLORS)}
      cornerRadius={3}
      data={data}
      defs={defs}
      fill={fill}
      height={180}
      innerRadius={0.5}
      legends={legends}
      margin={{ top: 20, right: 40, bottom: 80, left: 40 }}
      padAngle={0.7}
      theme={CHART_THEME}
      width={180}
    />
  );
};

export default RolePie;
