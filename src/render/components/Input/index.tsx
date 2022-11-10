import React from 'react'

import './index.less'

export type InputProp = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const Input: React.FC<InputProp> = (props) => <input {...props} />

export default Input
