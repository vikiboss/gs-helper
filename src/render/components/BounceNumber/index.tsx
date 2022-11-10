import React, { useEffect, useState } from 'react'

export interface BounceNumberProp {
  number: number
  size?: number
  duration?: number
  style?: React.CSSProperties
  wrapperStyle?: React.CSSProperties
}

const nums: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

const BounceNumber: React.FC<BounceNumberProp> = (props) => {
  const { number, style = {}, duration = 1, size = 16, wrapperStyle = {} } = props

  const [transforms, setTransforms] = useState<string[]>([])
  const numbers = String(number).split('')

  useEffect(() => {
    const trans = numbers.map((e) => `translateY(-${Number(e) * size}px)`)
    setTimeout(() => setTransforms(trans), 20)
  }, [numbers, size])

  const numsStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: `${size}px`,
    transition: `all ${duration}s ease-in-out`
  }

  return (
    <div
      style={{
        ...wrapperStyle,
        display: 'flex',
        overflow: 'hidden',
        fontFamily: 'arial',
        fontWeight: 'bold'
      }}
    >
      {numbers.map((e, i) => {
        const divStyle = { ...numsStyle, transform: transforms[i] || 'none' }
        const spanStyle = { ...style, height: `${size}px`, fontSize: `${size}px` }
        return (
          <div key={`${e}${i}`} style={divStyle}>
            {nums.map((f) => (
              <span style={spanStyle} key={f}>
                {e}
              </span>
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default BounceNumber
