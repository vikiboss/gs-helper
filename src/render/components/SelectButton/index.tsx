import React from 'react'
import cn from 'classnames'

import styles from './index.less'

export type SelectItem = {
  label: string
  value: string | number
}

export interface SelectButtonProp {
  changeItem?: (...args: any[]) => any
  className?: string
  direction?: 'vertical' | 'horizontal'
  height?: number
  items: SelectItem[]
  style?: React.CSSProperties
  selectedStyle?: React.CSSProperties
  value?: string | number
  width?: number
}

export default function SelectButton(props: SelectButtonProp) {
  const {
    changeItem,
    className,
    direction = 'horizontal',
    height,
    items,
    style,
    selectedStyle,
    value,
    width
  } = props

  const isHori = direction === 'horizontal'
  const divClass = cn(styles.wrapper, className, isHori ? '' : styles.vertical)
  const divStyle = { width, height, ...style }

  return (
    <div className={divClass} style={divStyle}>
      {items.map((e) => (
        <div
          key={e.value}
          style={e.value === value ? selectedStyle : undefined}
          onClick={changeItem && changeItem.bind(null, e.value)}
          className={e.value === value ? styles.selected : ''}
        >
          {e.label}
        </div>
      ))}
    </div>
  )
}
