import React from "react"
import {Text as RNText, TextProps as RNTextProps} from "react-native-web";
import {extractStyleCompose} from "../../common/modifiers"

export type TextProps = {
  color?: string
  size?: number
  children?: string | Text,
  [key: string]: any
} & RNTextProps

const Text = ({style, color, size, ...props}: TextProps) => {
  const _style = extractStyleCompose('Text', props, style) || {}
  if (!!color && typeof color !== 'undefined') {
    _style['color'] = color
  }
  if (!!size && typeof size !== 'undefined') {
    _style['fontSize'] = size
  }
  return <RNText {...props} style={_style} />
}
export {Text};
export default Text
