// @ts-ignore
import {TextInput as RNTextInput} from "react-native-web";
import React, {forwardRef, Ref} from "react"
import {extractStyle} from "../../common/modifiers"
// @ts-ignore
import {TextInputProps, TextInputStyle} from "react-native-web/exports/TextInput/types";

const TextInput = ({style, ...props}: TextInputProps, ref: Ref<any>) => {
  const _style = {...extractStyle('Input', props), ...style}
  return <RNTextInput {...props} style={_style} ref={ref} />
}
export {TextInput}; // For tests
export default forwardRef(TextInput)
