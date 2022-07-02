import React, { useEffect, useState } from "react";

export interface BounceNumberProp {
  number: number;
  size?: number;
  duration?: number;
  style?: React.CSSProperties;
  wrapperStyle?: React.CSSProperties;
}

const nums: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const BounceNumber: React.FC<BounceNumberProp> = (props) => {
  const [transforms, setTransforms] = useState<string[]>([]);
  const { number, style = {}, duration = 1, size = 16, wrapperStyle = {} } = props;
  const numbers = String(number).split("");

  useEffect(() => {
    const trans = numbers.map((e) => `translateY(-${Number(e) * size}px)`);
    setTimeout(() => setTransforms(trans), 20);
  }, [number]);

  const numsStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    height: size + "px",
    transition: `all ${duration}s ease-in-out`
  };

  return (
    <div
      style={{
        ...wrapperStyle,
        display: "flex",
        overflow: "hidden",
        fontFamily: "arial",
        fontWeight: "bold"
      }}
    >
      {numbers.map((e, i) => {
        return (
          <div key={`${e}${i}`} style={{ ...numsStyle, transform: transforms[i] || "none" }}>
            {nums.map((e) => (
              <span
                style={{
                  ...style,
                  height: size + "px",
                  fontSize: size + "px"
                }}
                key={e}
              >
                {e}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default BounceNumber;
