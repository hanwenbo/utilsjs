import {TouchableOpacity as TouchableOpacityNative, TouchableOpacityProps} from "react-native-web";
import React, {forwardRef, Ref} from "react"

const TouchableOpacity = ({style, ...props}: TouchableOpacityProps, ref: Ref<any>) => {
  // @ts-ignore
  return <TouchableOpacityNative {...props} ref={ref} />
}
export {TouchableOpacity};
export default forwardRef(TouchableOpacity)
