import React from 'react'

import './index.module.less'

export type InputProp = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export default function Input(props: InputProp) {
  return <input {...props} />
}
