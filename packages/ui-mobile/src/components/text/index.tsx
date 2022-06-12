import {Text as RNText} from "react-native-web";
import React from "react"
import {extractStyleCompose} from "../../common/modifiers"
import {TextProps as RNTextProps} from "react-native-web/exports/Text/types";

export type TextProps = {
  color?: string
  children?: string | Text,
  [key: string]: any
} & RNTextProps

const Text = ({style, color, ...props}: TextProps) => {
  const _style = extractStyleCompose('Text', props, style) || {}
  if (!!color && typeof color !== 'undefined') {
    // @ts-ignore
    _style['color'] = color
  }
  return <RNText {...props} style={_style} />
}
export {Text};
export default Text
