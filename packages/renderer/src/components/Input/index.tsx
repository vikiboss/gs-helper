import React from 'react'

import './index.less'

export type InputProp = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export default function Input(props: InputProp) {
  return <input {...props} />
}
