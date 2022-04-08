import {Text as RNText} from "react-native-web";
import React from "react"
import {extractStyle} from "../../common/modifiers"
import {TextProps as RNTextProps} from "react-native-web/exports/Text/types";

export type TextProps = {
  children?: string | Text,
  [key: string]: any
} & RNTextProps

const Text = ({style, ...props}: TextProps) => {
  const _style = {...extractStyle('Text', props), ...style}
  return <RNText {...props} style={_style} />
}
export {Text}; // For tests
export default Text
