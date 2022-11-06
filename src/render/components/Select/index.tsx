import React from 'react';

import styles from './index.less';

export interface Option {
  value: string | number;
  label: string;
}

interface SelectProp {
  defaultValue?: React.HTMLAttributes<HTMLSelectElement>['defaultValue'];
  key?: React.Attributes['key'];
  label?: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  options?: Option[];
  optionStyle?: React.CSSProperties;
  selectStyle?: React.CSSProperties;
  title?: string;
  value?: React.SelectHTMLAttributes<HTMLSelectElement>['value'];
  wrapperStyle?: React.CSSProperties;
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
    title,
    value,
    wrapperStyle,
  } = props;
  return (
    <div title={title} className={styles.wrapper} key={key} style={wrapperStyle}>
      {label && <label htmlFor={name}>{label}</label>}
      <select
        defaultValue={defaultValue}
        name={name}
        value={value}
        onChange={onChange}
        style={selectStyle}
      >
        {Array.isArray(options)
          && options.map((e) => (
            <option key={e.label} value={e.value} style={optionStyle}>
              {e.label}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;
