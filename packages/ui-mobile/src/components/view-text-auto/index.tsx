// @ts-ignore
import {Text, TextProps, ViewProps} from "react-native-web";
import React from "react"

const ViewTextAuto = ({children, ...props}: TextProps | ViewProps) => {
  // todo style 磨平
  if (typeof children === 'string') {
    // @ts-ignore
    return <Text {...props}>{children}</Text>
  } else {
    return typeof children !== "undefined" ? children : null
  }
}
export {ViewTextAuto};
export default ViewTextAuto
