import React from "react";
import { CommonPieProps, MouseEventHandler, ResponsivePie } from "@nivo/pie";

import { ChartTheme } from "../../../../constants";
import { Colors } from "../utils/transformGachaDataType";

type ItemPieProp = {
  width: React.CSSProperties["width"];
  height: React.CSSProperties["height"];
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
  { match: { id: "3星" }, id: "lines" },
  { match: { id: "4星" }, id: "lines" },
  { match: { id: "5星" }, id: "lines" }
];

const legends: CommonPieProps<ItemPieProp["data"]>["legends"] = [
  {
    anchor: "bottom",
    direction: "row",
    translateY: 56,
    translateX: 10,
    itemWidth: 60,
    itemHeight: 18,
    symbolSize: 18,
    symbolShape: "circle",
    effects: [
      {
        on: "hover",
        style: {
          itemTextColor: "#ffa564"
        }
      }
    ]
  }
];

const ItemPie: React.FC<ItemPieProp> = (props) => {
  const { data, style, width, height, onClick, className = "" } = props;
  return (
    <div
      className={className}
      style={{ ...style, height, minHeight: height, width, minWidth: width }}
    >
      <ResponsivePie
        onClick={onClick}
        activeOuterRadiusOffset={8}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        arcLinkLabelsColor={{ from: "color" }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor='#333333'
        arcLinkLabelsThickness={2}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        borderWidth={1}
        colors={Object.values(Colors)}
        cornerRadius={3}
        data={data}
        defs={defs}
        fill={fill}
        innerRadius={0.5}
        legends={legends}
        margin={{ top: 20, right: 40, bottom: 80, left: 40 }}
        padAngle={0.7}
        theme={ChartTheme}
      />
    </div>
  );
};

export default ItemPie;
