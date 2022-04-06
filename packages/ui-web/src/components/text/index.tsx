// @ts-ignore
import {Text as RNText} from "react-native-web";
import React, {forwardRef, Ref} from "react"
import {extractStyle} from "../../common/modifiers"
import {GenericStyleProp} from "react-native-web/types";
import {TextStyle} from "react-native-web/exports/Text/types";

type PropsType = {
  style?: GenericStyleProp<TextStyle>,
  children?: string,
}

const Text = ({style, ...props}: PropsType, ref: Ref<any>) => {
  const _style = {...extractStyle('Text', props), ...style}
  return <RNText {...props} style={_style} ref={ref} />
}
export {Text}; // For tests
export default forwardRef(Text)
