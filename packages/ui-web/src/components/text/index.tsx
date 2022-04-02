// @ts-ignore
import {Text as RNText} from "react-native-web";
import React, {forwardRef} from "react"
import {extractTypographyValue, extractColorValue} from "../../common/modifiers"
import {GenericStyleProp} from "react-native-web/types";
import {TextStyle} from "react-native-web/exports/Text/types";

type PropsType = {
  style?: GenericStyleProp<TextStyle>
}
const Text = ({style, ...props}: PropsType) => {
  const _style = {...style, ...extractTypographyValue(props), color: extractColorValue(props)}
  return <RNText {...props} style={_style} />
}
export {Text}; // For tests
export default forwardRef(Text)
