import React from "react";

import styles from "./index.less";

interface Option {
  value: string | number;
  label: string;
}

interface SelectProp {
  name?: string;
  value?: React.SelectHTMLAttributes<HTMLSelectElement>["value"];
  options?: Option[];
  label?: string;
  defaultValue?: React.HTMLAttributes<HTMLSelectElement>["defaultValue"];
  wrapperStyle?: React.CSSProperties;
  selectStyle?: React.CSSProperties;
  optionStyle?: React.CSSProperties;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  key?: React.Attributes["key"];
}

const Select: React.FC<SelectProp> = (props) => {
  const {
    defaultValue,
    key,
    label,
    name,
    onChange,
    options,
    optionStyle,
    selectStyle,
    value,
    wrapperStyle
  } = props;
  return (
    <div className={styles.wrapper} key={key} style={wrapperStyle}>
      {label && <label htmlFor={name}>{label}</label>}
      <select
        defaultValue={defaultValue}
        name={name}
        value={value}
        onChange={onChange}
        style={selectStyle}
      >
        {Array.isArray(options) &&
          options.map((e) => (
            <option key={e.label} value={e.value} style={optionStyle}>
              {e.label}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;
